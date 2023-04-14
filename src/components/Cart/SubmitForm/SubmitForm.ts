import { calculateTotalOrderPrice } from '@/src/helpers/calculateTotalOrderPrice';
import { supabase } from '@/src/server/api';
import { iOrder } from '@/src/types/types';

import { iSubmitForm } from './types';
import { checkCashBox } from './util/checkCashBox';
import createAddressIfNeeded from './util/createAddressIfNeeded';
import createClient from './util/createClient';
import createContact from './util/createContact';
import findDeliveryFeeForTheDistance from './util/findDeliveryFeeForTheDistance';
import getOrderPosition from './util/getOrderPosition';
import insertOrder from './util/insertOrder';
import insertOrderProducts from './util/insertOrderProducts';
import sendDeliveryFeeMessage from './util/sendDeliveryFeeMessage';
import sendOrderReceivedMessage from './util/sendOrderReceivedMessage';
import sendTotalOrderPriceMessage from './util/sendTotalOrderPriceMessage';
import storeAddressInfo from './util/storeAddressInfo';

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
  try {
    const foundDeliveryFee = await findDeliveryFeeForTheDistance({
      restaurant_address_string: restaurant.address_string,
      restaurant_slug: restaurant.slug,
      restaurant_id: restaurant.id,
      cep,
      number,
    });

    const currentCashBox = await checkCashBox(restaurant);
    if (!currentCashBox) return;

    const address = await createAddressIfNeeded(
      deliveryForm,
      cep,
      number,
      complement
    );

    const contact = await createContact({ phone: whatsapp });

    if (!address || !contact) return;

    const client = await createClient({
      name,
      address_id: address.id,
      contact_id: contact.id,
    });

    if (!client) return;

    const orderDataByCashBoxId = await supabase
      .from('orders')
      .select('*')
      .eq('restaurant_id', restaurant?.id);

    const orderPosition = getOrderPosition(orderDataByCashBoxId);

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

    if (orderError) return;

    storeAddressInfo(
      deliveryForm,
      cep,
      neighborhood,
      street,
      number,
      complement
    );

    const order = orderData![0] as unknown as iOrder['data'];

    setOrderNumber(order.number);

    await insertOrderProducts(order, products);

    await sendOrderReceivedMessage(restaurant, whatsapp);

    const isDelivery = deliveryForm == 1;
    const isPayingUsingPix = payment_method == 1;

    if (isDelivery) {
      await sendDeliveryFeeMessage(restaurant, whatsapp, foundDeliveryFee);
    }

    const totalOrderPrice = await calculateTotalOrderPrice({
      products,
      restaurantId: restaurant.id,
    });

    if (isPayingUsingPix) {
      await sendTotalOrderPriceMessage(
        restaurant,
        whatsapp,
        isDelivery,
        foundDeliveryFee,
        totalOrderPrice
      );
    }

    if (foundDeliveryFee) {
      setDeliveryFee(foundDeliveryFee.fee);
    }
  } catch (error) {
    console.error(error);
  }
}
