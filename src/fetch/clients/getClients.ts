import { iClients } from '@/src/types/iClient';
import { supabase } from '../../server/api';

export async function getclientsFetch(): Promise<iClients['data']> {
  const { data } = await supabase.from('clients').select();

  return data!;
}
