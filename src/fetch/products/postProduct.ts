import { iInsertProduct, iProducts } from '@/src/types/iProducts';
import { supabase } from '../../server/api';

export async function postProductFetch({
  name,
  description,
  picture_url,
  price,
  category_id,
  restaurant_id,
}: iInsertProduct['data']): Promise<iProducts['data']> {
  const { data } = await supabase
    .from('products')
    .insert({
      name,
      description,
      picture_url,
      price,
      category_id,
      restaurant_id,
    })
    .select('*');

  return data!;
}
