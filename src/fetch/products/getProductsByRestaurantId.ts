import { supabase } from '@/src/server/api';
import { iProducts } from '@/src/types/iProducts';

export async function getProductsByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iProducts['data']> {
  const { data } = await supabase
    .from('products')
    .select()
    .eq('restaurant_id', restaurant_id);

  return data!;
}
