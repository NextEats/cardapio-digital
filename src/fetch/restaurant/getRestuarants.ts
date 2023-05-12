import { iRestaurants } from '@/src/types/iRestaurant';
import { supabase } from '../../server/api';

export async function getRestaurantsFetch(): Promise<iRestaurants['data']> {
  const { data } = await supabase.from('restaurants').select();

  return data!;
}
