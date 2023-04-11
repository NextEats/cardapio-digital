import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import {
  distanceFeeApi,
  serverURL,
  supabase,
  whatsappRestApi,
} from '@/src/server/api';
import {
  iAddress,
  iCashBox,
  iClient,
  iContact,
  iOrder,
} from '@/src/types/types';

import { toast } from 'react-toastify';

export function removeNonAlphaNumeric(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, '');
}

export async function returnDistanceInMeters(start: string, end: string) {
  try {
    const { data } = await distanceFeeApi.post('/calcular-distancia', {
      start,
      end,
    });

    return data.distance / 1000;
  } catch (err) {
    console.log(err);
  }
}

async function createClient({
  name,
  address_id,
  contact_id,
}: {
  name: string;
  address_id: number;
  contact_id: number;
}) {
  const { data: clientData, error } = await supabase
    .from('clients')
    .insert({
      name,
      address_id,
      contact_id,
    })
    .select('*');

  const client = clientData![0] as unknown as iClient['data'];

  if (error) {
    return null;
  }

  return client;
}

async function createContact({ phone }: { phone: string }) {
  const { data: contactData, error } = await supabase
    .from('contacts')
    .insert({ phone })
    .select('*');

  const contact = contactData![0] as unknown as iContact['data'];

  if (error) {
    return null;
  }

  return contact;
}

async function findDeliveryFeeForTheDistance({
  restaurant_address_string,
  restaurant_slug,
  restaurant_id,
  cep,
  number,
}: {
  restaurant_address_string: string;
  restaurant_slug: string;
  restaurant_id: number;
  cep: string;
  number: string;
}) {
  const distance_in_km = await returnDistanceInMeters(
    restaurant_address_string,
    cep + ' ' + number
  );

  const { data: delivery_fees_data } = await supabase
    .from('delivery_fees')
    .select('*')
    .eq('restaurant_id', restaurant_id);

  const foundDeliveryFee = delivery_fees_data!.find(df => {
    console.log(distance_in_km!, df.end_km!, df.start_km!);
    return distance_in_km! <= df.end_km! && distance_in_km! >= df.start_km!;
  });

  if (!foundDeliveryFee) {
    toast.error(
      'Sinto muito, o endereço digitado está fora do alcance de nossos entregadores!',
      {
        theme: 'light',
        position: 'top-center',
      }
    );

    setTimeout(() => {
      window.location.href = serverURL + restaurant_slug;
    }, 6000);

    return null;
  }

  return foundDeliveryFee;
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
}: any) {
  try {
    const foundDeliveryFee = await findDeliveryFeeForTheDistance({
      restaurant_address_string: restaurant.address_string,
      restaurant_slug: restaurant.slug,
      restaurant_id: restaurant.id,
      cep,
      number,
    });

    const { data: currentCashBoxData } = await supabase
      .from('cash_boxes')
      .select('*')
      .match({ restaurant_id: restaurant!.id, is_open: true });

    const currentCashBox =
      currentCashBoxData![0] as unknown as iCashBox['data'];

    if (!currentCashBox) {
      toast.error('O Pedido só pode ser feito se o caixa estiver aberto.', {
        theme: 'light',
      });
      return;
    }

    let address;

    if (deliveryForm === 1) {
      const { data: addressData } = await supabase
        .from('addresses')
        .insert({ cep, number, complement })
        .select('*');
      address = addressData![0] as unknown as iAddress['data'];
    }

    const contact = await createContact({ phone: whatsapp });

    if (!address || !contact) {
      return;
    }

    const client = await createClient({
      name,
      address_id: address.id,
      contact_id: contact.id,
    });

    if (!client) {
      return;
    }

    const orderDataByCashBoxId = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restaurant?.id);

    const orderPosition = orderDataByCashBoxId.data
      ? orderDataByCashBoxId?.data.length + 1
      : 1;

    const { data: orderData, error: orderError } = await supabase
      .from('orders')
      .insert({
        restaurant_id: restaurant!.id,
        client_id: client.id,
        order_type_id: deliveryForm,
        cash_box_id: currentCashBox.id,
        order_status_id: 2,
        delivery_fee_id:
          deliveryForm == 1 && foundDeliveryFee ? foundDeliveryFee.id : null,
        payment_method_id: payment_method,
        number: orderPosition,
        change_value,
      })
      .select('*');

    if (deliveryForm === 1 && !orderError) {
      localStorage.setItem('cep', cep);
      localStorage.setItem('neighborhood', neighborhood);
      localStorage.setItem('street', street);
      localStorage.setItem('number', number);
      complement ? localStorage.setItem('complement', complement) : null;
    }

    const order = orderData![0] as unknown as iOrder['data'];

    setOrderNumber(order.number);

    products.state.forEach(async (product: any) => {
      if (product.quantity) {
        for (let i = 0; i < product.quantity; i++) {
          await supabase
            .from('orders_products')
            .insert({
              order_id: order.id,
              product_id: product.id,
              selects_data: product.selects,
              observation: product.observation,
              additionals_data: product.additionals,
            })
            .select('*');
        }
      } else {
        await supabase
          .from('orders_products')
          .insert({
            order_id: order.id,
            product_id: product.id,
            selects_data: product.selects,
            observation: product.observation,
            additionals_data: product.additionals,
          })
          .select('*');
      }
    });

    try {
      await whatsappRestApi({
        method: 'post',
        url: '/send-message',
        data: {
          id: restaurant!.slug,
          number: '55' + removeNonAlphaNumeric(whatsapp),
          message: `*${
            restaurant!.name
          }*\n\n☺✅ _Seu pedido foi recebido com sucesso e começará a ser preparado em breve!_ Você receberá aqui todas as atualizações.`,
        },
      });
    } catch (err) {
      console.error(err);
    }

    const isDelivery = deliveryForm == 1;
    const isPayingUsingPix = payment_method == 1;

    if (isDelivery) {
      try {
        await whatsappRestApi({
          method: 'post',
          url: '/send-message',
          data: {
            id: restaurant!.slug,
            number: '55' + removeNonAlphaNumeric(whatsapp),
            message: `🏍 O valor da taxa de entrega é: R$ ${foundDeliveryFee?.fee}`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    const totalOrderPrice = await calculateTotalOrderPrice({
      products,
      restaurantId: restaurant.id,
    });

    if (isPayingUsingPix) {
      try {
        await whatsappRestApi({
          method: 'post',
          url: '/send-message',
          data: {
            id: restaurant!.slug,
            number: '55' + removeNonAlphaNumeric(whatsapp),
            message: `😊 O valor total do seu pedido é de ${
              isDelivery && foundDeliveryFee
                ? foundDeliveryFee.fee + totalOrderPrice
                : totalOrderPrice
            }\n\nPague através da chave pix: _*${
              restaurant!.pix
            }*_\n\n☑ _Assim que fizer a transferência, envie o comprovante aqui_`,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    setDeliveryFee(foundDeliveryFee?.fee);
  } catch (error) {
    console.error(error);
  }
}
