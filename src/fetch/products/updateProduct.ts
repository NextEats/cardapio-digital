import { iInsertProduct, iProducts } from '@/src/types/iProducts';
import { supabase } from '../../server/api';

export async function updateProductFetch({
  name,
  description,
  picture_url,
  category_id,
  price,
  id,
}: iInsertProduct['data']): Promise<iProducts['data']> {
  const { data } = await supabase
    .from('products')
    .update({
      name,
      category_id,
      description,
      picture_url,
      price,
    })
    .eq('id', id)
    .select('*');

  return data!;
}
