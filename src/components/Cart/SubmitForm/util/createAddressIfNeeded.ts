import { supabase } from '@/src/server/api';
import { iAddress } from '@/src/types/types';

export default async function createAddressIfNeeded(
  deliveryForm: number,
  cep: number,
  number: string,
  complement: string | null
) {
  let address;

  if (deliveryForm === 1) {
    const { data: addressData } = await supabase
      .from('addresses')
      .insert({ cep: cep.toString(), number, complement })
      .select('*');
    address = addressData![0] as unknown as iAddress['data'];
  }
  return address;
}
