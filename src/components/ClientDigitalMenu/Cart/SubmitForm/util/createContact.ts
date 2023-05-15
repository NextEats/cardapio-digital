import { supabase } from '@/src/server/api';
import { iContact } from '@/src/types/iContact';

export default async function createContact({ phone }: { phone: number }) {
  const { data: contactData, error } = await supabase
    .from('contacts')
    .insert({ phone: phone.toString() })
    .select('*');

  const contact = contactData![0] as unknown as iContact['data'];

  if (error) {
    return null;
  }

  return contact;
}
