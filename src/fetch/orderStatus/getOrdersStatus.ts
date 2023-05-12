import { iOrdersStatus } from '@/src/types/iOrders';
import { supabase } from '../../server/api';

export async function getOrderStatusFetch(): Promise<iOrdersStatus['data']> {
  const { data } = await supabase.from('order_status').select();

  return data!;
}
