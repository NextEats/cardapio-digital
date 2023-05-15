import { iInsertOrdersTables } from '@/src/types/iOrders';
import { supabase } from '../../server/api';

interface iPostOrdertable {
  order_id: number;
  table_id: number;
  has_been_paid: true;
}

export async function postOrderTableFetch({
  order_id,
  table_id,
  has_been_paid,
}: iPostOrdertable): Promise<iInsertOrdersTables['data']> {
  const { data } = await supabase
    .from('orders_tables')
    .insert({
      order_id,
      table_id,
      has_been_paid,
    })
    .select('*');

  return data!;
}
