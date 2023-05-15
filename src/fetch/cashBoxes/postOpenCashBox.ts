import { iCashBoxes } from '@/src/types/iCashBox';
import { supabase } from '../../server/api';

interface iPostOpenCashBoxFetchProps {
  restaurant_id: number;
  initial_value: number;
}

export async function postOpenCashBoxFetch({
  initial_value,
  restaurant_id,
}: iPostOpenCashBoxFetchProps): Promise<iCashBoxes['data']> {
  const { data } = await supabase
    .from('cash_boxes')
    .insert({
      is_open: true,
      opened_at: new Date().toISOString(),
      restaurant_id,
      initial_value,
    })
    .select('*');

  return data!;
}
