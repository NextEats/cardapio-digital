import { iProductOptions } from '@/src/types/iProducts';
import { supabase } from '../../server/api';

export async function getProductOptionsFetch(): Promise<
  iProductOptions['data']
> {
  const { data } = await supabase.from('product_options').select();

  return data!;
}
