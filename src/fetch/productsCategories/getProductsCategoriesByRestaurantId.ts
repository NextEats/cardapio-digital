import { iProductCategories } from '@/src/types/iProducts';
import { supabase } from '../../server/api';

export async function getProductsCategoriesByRestaurantIdFetch(
  restaurant_id: number
): Promise<iProductCategories['data']> {
  const { data } = await supabase
    .from('product_categories')
    .select()
    .eq('restaurant_id', restaurant_id)
    .order('category_order', { ascending: true });

  return data!;
}
