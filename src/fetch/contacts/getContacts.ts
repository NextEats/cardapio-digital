import { iContacts } from '@/src/types/iContact';
import { supabase } from '../../server/api';

export async function getContactsFetch(): Promise<iContacts['data']> {
  const { data } = await supabase.from('contacts').select();

  return data!;
}
