import { iTables } from '@/src/types/iTable';
import { supabase } from '../../server/api';

export async function getTablesByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iTables['data']> {
  const { data } = await supabase
    .from('tables')
    .select()
    .eq('restaurant_id', restaurant_id)
    .order('id', { ascending: true });

  return data!;
}
