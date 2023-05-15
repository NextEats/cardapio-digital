import { iInsertTable, iTables } from '@/src/types/iTable';
import { supabase } from '../../server/api';

export async function postTableFetch({
  restaurant_id,
  chair_ammount,
  name,
}: iInsertTable['data']): Promise<iTables['data']> {
  const { data } = await supabase
    .from('tables')
    .insert({
      restaurant_id,
      name,
      chair_ammount,
      is_active: false,
      is_occupied: false,
      is_reserved: false,
      table_slug: name?.trim().toLowerCase().replace(/\s+/g, '-'),
    })
    .select('*');

  return data!;
}
