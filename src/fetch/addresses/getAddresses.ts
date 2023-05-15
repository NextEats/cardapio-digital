import { iAddresses } from '@/src/types/iAddress';
import { supabase } from '../../server/api';

export async function getAddressesFetch(): Promise<iAddresses['data']> {
  const { data } = await supabase.from('addresses').select();

  return data!;
}
