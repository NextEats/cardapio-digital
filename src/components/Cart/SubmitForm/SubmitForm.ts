import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import { iOrder } from '@/src/types/types';

import { supabase, whatsappRestApi } from '@/src/server/api';
import { toast } from 'react-toastify';
import { iSubmitForm } from './types';
import { checkCashBox } from './util/checkCashBox';
import createAddressIfNeeded from './util/createAddressIfNeeded';
import createClient from './util/createClient';
import createContact from './util/createContact';
import findDeliveryFeeForTheDistance from './util/findDeliveryFeeForTheDistance';
import getOrderPosition from './util/getOrderPosition';
import insertOrder from './util/insertOrder';
import insertOrderProducts from './util/insertOrderProducts';
import { removeNonAlphaNumeric } from './util/removeNonAlphaNumeric';
import storeAddressInfo from './util/storeAddressInfo';

import cepPromise from 'cep-promise';

async function returnStreetFromCep(cep: string) {
  const cepInfo = await cepPromise(removeNonAlphaNumeric(cep));
  console.log('cepInfo', cepInfo);

  return cepInfo.street;
}

async function returnProductNameFromId(product_id: number) {
  const { data } = await supabase
    .from('products')
    .select('name')
    .eq('id', product_id);

  if (data) {
    console.log('data[0].name', data[0].name);
    return data[0].name;
  } else {
    return '';
  }
}

async function returnPaymentMethodFromId(payment_method_id: number) {
  const { data } = await supabase
    .from('payment_methods')
    .select('name')
    .eq('id', payment_method_id);

  if (data) {
    return data[0].name;
  } else {
    return '';
  }
}

export async function SubmitForm({
  setOrderNumber,
  setDeliveryFee,
  name,
  number,
  cep,
  whatsapp,
  products,
  restaurant,
  payment_method,
  change_value,
  deliveryForm,
  complement,
  neighborhood,
  street,
}: iSubmitForm) {
  const isDelivery = deliveryForm == 1;
  const isPayingUsingPix = payment_method == 1;

  const foundDeliveryFee = await findDeliveryFeeForTheDistance({
    restaurant_address_string: restaurant.address_string,
    restaurant_slug: restaurant.slug,
    restaurant_id: restaurant.id,
    cep,
    number,
  });

  const currentCashBox = await checkCashBox(restaurant);

  if (!currentCashBox) {
    toast.error('Este restaurante não está aberto.');
    return;
  }

  const address = await createAddressIfNeeded(
    deliveryForm,
    cep,
    number,
    complement
  );

  if (!address && isDelivery) {
    toast.error('Erro ao cadastrar endereço.');
    return;
  }

  const contact = await createContact({ phone: whatsapp });

  if (!contact) {
    toast.error('Erro ao cadastrar contato.');
    return;
  }

  const client = await createClient({
    name,
    address_id: address?.id,
    contact_id: contact.id,
  });

  if (!client) {
    toast.error('Erro ao cadastrar cliente.');
    return;
  }

  const orderPosition = await getOrderPosition(restaurant);

  const { orderData, orderError } = await insertOrder({
    restaurant,
    client,
    deliveryForm,
    currentCashBox,
    foundDeliveryFee,
    payment_method,
    change_value,
    orderPosition,
  });

  if (orderError) {
    toast.error('Erro ao criar pedido.');
    return;
  }

  storeAddressInfo(deliveryForm, cep, neighborhood, street, number, complement);

  const order = orderData![0] as unknown as iOrder['data'];

  setOrderNumber(order.number);

  await insertOrderProducts(order, products);

  const totalOrderPrice = await calculateTotalOrderPrice({
    products,
    restaurantId: restaurant.id,
  });

  if (foundDeliveryFee) {
    setDeliveryFee(foundDeliveryFee.fee);
  }

  async function returnListOfProducts() {
    if (!products.state) {
      toast.error('Nenhum produto selecionado.');
      return;
    }

    const listOfProducts = await Promise.all(
      products.state.map(async (product, index) => {
        const productName = await returnProductNameFromId(product.id);

        return `${product.quantity}x - ${productName}\n`;
      })
    );

    var listOfProductsString = '';

    for (let i = 0; i < listOfProducts.length; i++) {
      listOfProductsString += listOfProducts[i];
    }

    return listOfProductsString;
  }

  async function sendWhatsAppMessage({ message }: { message: string }) {
    try {
      await whatsappRestApi.post('/send-message', {
        id: restaurant.slug,
        number: '55' + removeNonAlphaNumeric(whatsapp.toString()),
        message: message,
      });
    } catch (err) {
      console.error(err);
    }
  }

  const listOfProducts = await returnListOfProducts();

  const messageOrderInfo = `📝 *Pedido #${orderPosition}:*\n\n${listOfProducts}\n 💳 _Método de Pagamento:_ ${await returnPaymentMethodFromId(
    payment_method
  )}\n${
    foundDeliveryFee?.fee
      ? '🏍 _Taxa de Entrega: R$ ' + foundDeliveryFee.fee + '_'
      : ''
  }\n${
    isDelivery
      ? `🏠 _Endereço: ${await returnStreetFromCep(cep.toString())}, ${number}_`
      : ''
  }\n\n*_Total: R$ ${totalOrderPrice}_*`;

  sendWhatsAppMessage({
    message: messageOrderInfo,
  });

  if (isPayingUsingPix) {
    sendWhatsAppMessage({
      message: `_Valor total: *R$ ${totalOrderPrice}*, pague com o PIX utilizando a chave abaixo._`,
    });

    sendWhatsAppMessage({
      message: `${restaurant.pix}`,
    });
  }
}
