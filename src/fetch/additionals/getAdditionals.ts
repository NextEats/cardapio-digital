import { iAdditionals } from '@/src/types/iAdditional';
import { supabase } from '../../server/api';

export async function getAdditionalsByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iAdditionals['data']> {
  const { data } = await supabase
    .from('additionals')
    .select()
    .eq('restaurant_id', restaurant_id);

  return data!;
}
