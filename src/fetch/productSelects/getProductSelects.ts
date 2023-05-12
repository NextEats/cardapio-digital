import { iProductSelects } from '@/src/types/iProducts';
import { supabase } from '../../server/api';

export async function getProductSelectsFetch(): Promise<
  iProductSelects['data']
> {
  const { data } = await supabase.from('product_selects').select();

  return data!;
}
