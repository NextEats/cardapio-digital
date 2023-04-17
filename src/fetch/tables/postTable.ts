import { supabase } from '../../server/api';
import { iInsertTable, iTables } from '../../types/types';

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
      table_slug: name?.replace('', '-'),
    })
    .select('*');

  return data!;
}
