import { iSelects } from '@/src/types/iSelect';
import { supabase } from '../../server/api';

export async function getSelectsByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iSelects['data']> {
  const { data } = await supabase
    .from('selects')
    .select()
    .eq('restaurant_id', restaurant_id);

  return data!;
}
