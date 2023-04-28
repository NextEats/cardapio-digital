import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import { iOrder } from '@/src/types/types';

import { whatsappRestApi } from '@/src/server/api';
import { toast } from 'react-toastify';
import { iSubmitForm } from './types';
import { checkCashBox } from './util/checkCashBox';
import createAddressIfNeeded from './util/createAddressIfNeeded';
import createClient from './util/createClient';
import createContact from './util/createContact';
import findDeliveryFeeForTheDistance from './util/findDeliveryFeeForTheDistance';
import { getOrderPosition } from './util/getOrderPosition';
import insertOrder from './util/insertOrder';
import insertOrderProducts from './util/insertOrderProducts';
import { removeNonAlphaNumeric } from './util/removeNonAlphaNumeric';
import storeAddressInfo from './util/storeAddressInfo';

import { iProductReducerInterface } from '@/src/contexts/DigitalMenuContext';
import returnPaymentMethodFromId from './util/returnPaymentMethodFromId';
import returnProductNameFromId from './util/returnProductNameFromId';
import returnStreetFromCep from './util/returnStreetFromCep';

async function sendWhatsAppMessage({
  message,
  restaurant_slug,
  whatsapp,
}: {
  message: string;
  restaurant_slug: string;
  whatsapp: string;
}) {
  try {
    await whatsappRestApi.post('/send-message', {
      id: restaurant_slug,
      number: '55' + removeNonAlphaNumeric(whatsapp.toString()),
      message: message,
    });
  } catch (err) {
    console.error(err);
  }
}

async function returnListOfProducts(products: iProductReducerInterface) {
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

  console.log('foundDeliveryFee', foundDeliveryFee);

  if (isDelivery) {
    if (!foundDeliveryFee) {
      toast.error(
        'Sinto muito, o endereço digitado está fora do alcance de nossos entregadores!'
      );

      return;
    }
  }

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
    address_id: isDelivery ? address?.id : null,
    contact_id: contact.id,
  });

  if (!client) {
    toast.error('Erro ao cadastrar cliente.');
    return;
  }

  const orderPosition = await getOrderPosition({
    restaurantId: restaurant.id,
    currentCashBoxId: currentCashBox.id,
  });

  const { orderData, orderError } = await insertOrder({
    restaurant,
    client,
    deliveryForm,
    currentCashBox,
    foundDeliveryFee: isDelivery ? foundDeliveryFee : null,
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

  const listOfProducts = await returnListOfProducts(products);

  const messageOrderInfo = `😀 Olá ${name}, obrigado por fazer seu pedido no restaurante ${
    restaurant.name
  }!\n\n📝 *Pedido #${orderPosition}:*\n\n${listOfProducts}\n 💳 _Método de Pagamento:_ ${await returnPaymentMethodFromId(
    payment_method
  )}\n${
    foundDeliveryFee?.fee
      ? '🏍 _Taxa de Entrega: R$ ' + foundDeliveryFee.fee + '_'
      : ''
  }\n${
    isDelivery
      ? `🏠 _Endereço: ${await returnStreetFromCep(cep.toString())}, ${number}_`
      : ''
  }\n\n*_Total: R$ ${
    totalOrderPrice + (foundDeliveryFee ? foundDeliveryFee.fee : 0)
  }_*`;

  sendWhatsAppMessage({
    message: messageOrderInfo,
    restaurant_slug: restaurant.slug,
    whatsapp: whatsapp.toString(),
  });

  if (isPayingUsingPix) {
    sendWhatsAppMessage({
      message: `_Valor total: *R$ ${
        totalOrderPrice + (foundDeliveryFee ? foundDeliveryFee.fee : 0)
      }*, pague com o PIX utilizando a chave abaixo._`,
      restaurant_slug: restaurant.slug,
      whatsapp: whatsapp.toString(),
    });

    sendWhatsAppMessage({
      message: `${restaurant.pix}`,
      restaurant_slug: restaurant.slug,
      whatsapp: whatsapp.toString(),
    });
  }
}
