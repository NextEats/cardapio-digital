import { iProductAdditionals } from '@/src/types/iProducts';
import { supabase } from '../../server/api';

export async function getProductAdditionalsFetch(): Promise<
  iProductAdditionals['data']
> {
  const { data } = await supabase.from('product_additionals').select();

  return data!;
}
