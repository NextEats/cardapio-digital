import { iOrder } from '@/src/types/iOrders';
import { supabase } from '../../server/api';

export async function updateOrderFetch({
  order_id,
  order_status_id,
}: {
  order_status_id: number;
  order_id: number;
}): Promise<iOrder['data']> {
  const { data } = await supabase
    .from('orders')
    .update({
      order_status_id,
    })
    .eq('id', order_id)
    .select('*');

  return data![0] as unknown as iOrder['data'];
}
