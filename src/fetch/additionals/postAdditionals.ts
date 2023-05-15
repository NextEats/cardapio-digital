import { iInsertAdditional, iInsertAdditionals } from '@/src/types/iInsert';
import { supabase } from '../../server/api';

export async function postAdditionalFetch({
  name,
  picture_url,
  price,
  additional_category_id,
  restaurant_id,
}: iInsertAdditional['data']): Promise<iInsertAdditionals['data']> {
  const { data } = await supabase
    .from('additionals')
    .insert({
      name,
      picture_url,
      price,
      additional_category_id,
      restaurant_id,
    })
    .select('*');

  return data!;
}
