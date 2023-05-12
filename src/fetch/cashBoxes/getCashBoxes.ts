import { iCashBoxes } from '@/src/types/iCashBox';
import { supabase } from '../../server/api';

export async function getCashBoxesFetch(): Promise<iCashBoxes['data']> {
  const { data } = await supabase.from('cash_boxes').select();

  return data!;
}
