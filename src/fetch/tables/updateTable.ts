import { iInsertTables } from '@/src/types/iTable';
import { supabase } from '../../server/api';

interface iUpdateOrdertable {
  is_active: boolean;
  is_occupied: boolean;
  table_id: number;
}

export async function updateTableFetch({
  table_id,
  is_active,
  is_occupied,
}: iUpdateOrdertable): Promise<iInsertTables['data']> {
  const { data } = await supabase
    .from('tables')
    .update({
      is_active,
      is_occupied,
    })
    .eq('id', table_id)
    .select('*');

  return data!;
}
