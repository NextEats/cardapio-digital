import { supabase } from '@/src/server/api';
import { iRestaurantWithFKData } from '@/src/types/types';

export default async function getOrderPosition(
  restaurant: iRestaurantWithFKData
) {
  const orderDataByCashBoxId = await supabase
    .from('orders')
    .select('*')
    .eq('restaurant_id', restaurant?.id);

  return orderDataByCashBoxId.data ? orderDataByCashBoxId?.data.length + 1 : 1;
}
