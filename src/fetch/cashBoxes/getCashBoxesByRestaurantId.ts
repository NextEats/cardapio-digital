import { iCashBoxes } from '@/src/types/iCashBox';
import { supabase } from '../../server/api';

export async function getCashBoxesByRestaurantIdFetch(
  restaurant_id: number
): Promise<iCashBoxes['data']> {
  const { data } = await supabase
    .from('cash_boxes')
    .select()
    .eq('restaurant_id', restaurant_id);

  return data!;
}
