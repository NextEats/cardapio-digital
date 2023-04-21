import { supabase } from '@/src/server/api';
import {
  iCashBox,
  iClient,
  iDeliveryFee,
  iRestaurantWithFKData,
} from '@/src/types/types';

interface iInsertOrder {
  restaurant: iRestaurantWithFKData;
  client: iClient['data'];
  deliveryForm: number;
  currentCashBox: iCashBox['data'];
  foundDeliveryFee: iDeliveryFee['data'] | null | undefined;
  payment_method: number;
  change_value: number;
  orderPosition: number;
}

export default async function insertOrder({
  restaurant,
  client,
  deliveryForm,
  currentCashBox,
  foundDeliveryFee,
  payment_method,
  change_value,
  orderPosition,
}: iInsertOrder) {
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

  return { orderData, orderError };
}
