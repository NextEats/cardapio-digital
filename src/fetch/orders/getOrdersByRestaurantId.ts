import { iOrdersWithFKData } from '@/src/types/iOrders';
import { supabase } from '../../server/api';

export async function getOrdersByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iOrdersWithFKData[]> {
  let { data, error } = await supabase
    .from('orders')
    .select(
      `
        *,
        payment_methods (*),
        order_types (*),
        clients (
            *,
            addresses (*),
            contacts (*)
        ),
        order_status (*),
        delivery_fees (*)
    `
    )
    .eq('restaurant_id', restaurant_id)
    .order('created_at', { ascending: false });

  return data! as unknown as iOrdersWithFKData[];
}
