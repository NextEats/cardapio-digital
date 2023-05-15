import { iInsertSelect } from '@/src/types/iInsert';
import { iSelects } from '@/src/types/iSelect';
import { supabase } from '../../server/api';

export async function updateSelectFetch({
  name,
  restaurant_id,
  id,
}: iInsertSelect['data']): Promise<iSelects['data']> {
  const { data } = await supabase
    .from('selects')
    .update({
      name,
      restaurant_id,
    })
    .eq('id', id)
    .select('*');

  return data!;
}
