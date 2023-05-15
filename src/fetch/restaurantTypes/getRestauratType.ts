import { iRestaurantTypes } from '@/src/types/iRestaurant';
import { supabase } from '../../server/api';

export async function getRestauratTypeFetch(
  id: number
): Promise<iRestaurantTypes['data']> {
  const { data } = await supabase
    .from('restaurant_types')
    .select()
    .eq('id', id);

  return data!;
}
