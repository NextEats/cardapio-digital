import { supabase } from '@/src/server/api';

export default async function insertOrder({
  restaurant,
  client,
  deliveryForm,
  currentCashBox,
  foundDeliveryFee,
  payment_method,
  change_value,
  orderPosition,
}) {
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
