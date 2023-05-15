import { iClients } from '@/src/types/iClient';
import { supabase } from '../../server/api';

export async function postClientFetch(
  address_id: number,
  name: string,
  contact_id: number
): Promise<iClients['data']> {
  const { data } = await supabase
    .from('clients')
    .insert({
      address_id,
      name,
      contact_id,
    })
    .select('*');

  return data!;
}
