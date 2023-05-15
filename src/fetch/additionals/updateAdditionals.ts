import { iAdditionals } from '@/src/types/iAdditional';
import { iInsertAdditional } from '@/src/types/iInsert';
import { supabase } from '../../server/api';

export async function updateAdditionalsFetch({
  name,
  picture_url,
  price,
  restaurant_id,
  id,
}: iInsertAdditional['data']): Promise<iAdditionals['data']> {
  const { data } = await supabase
    .from('additionals')
    .update({
      name,
      picture_url,
      price,
    })
    .eq('id', id)
    .select('*');

  return data!;
}
