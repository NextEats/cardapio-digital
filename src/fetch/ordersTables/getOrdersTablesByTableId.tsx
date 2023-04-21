import { supabase } from '@/src/server/api';
import { iOrdersTablesWithOrderFkData } from '@/src/types/types';

interface iGetOrdersTablesByTableId {
  table_id: number;
}

export async function getOrdersTablesByTableId({
  table_id,
}: iGetOrdersTablesByTableId): Promise<iOrdersTablesWithOrderFkData | null> {
  const { data: orders_tables_data } = await supabase
    .from('orders_tables')
    .select('*, orders (*) ')
    .eq('table_id', table_id)
    .eq('has_been_paid', false);

  return orders_tables_data![0] as iOrdersTablesWithOrderFkData;
}
