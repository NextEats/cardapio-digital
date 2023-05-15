import { iOrdersProducts } from '@/src/types/iOrders';
import { supabase } from '../../server/api';

export async function getOrdersProductsFetch(): Promise<
  iOrdersProducts['data']
> {
  const { data } = await supabase
    .from('orders_products')
    .select()
    .order('created_at', { ascending: false });

  return data!;
}
