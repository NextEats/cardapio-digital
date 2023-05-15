import { supabase } from '@/src/server/api';
import { iClient } from '@/src/types/iClient';

export default async function createClient({
  name,
  address_id,
  contact_id,
}: {
  name: string;
  address_id: number | null | undefined;
  contact_id: number;
}) {
  const { data: clientData, error } = await supabase
    .from('clients')
    .insert({
      name,
      address_id,
      contact_id,
    })
    .select('*');

  const client = clientData![0] as unknown as iClient['data'];

  if (error) {
    return null;
  }

  return client;
}
