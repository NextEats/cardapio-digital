import { supabase } from '@/src/server/api';
import { iAddress } from '@/src/types/types';
import { default as cepPromise } from 'cep-promise';

export default async function createAddressIfNeeded(
  deliveryForm: number,
  cep: number,
  number: string,
  complement: string | null
) {
  const cepInfo = await cepPromise(cep);

  let address;

  if (deliveryForm === 1) {
    const { data: addressData } = await supabase
      .from('addresses')
      .insert({
        cep: cep.toString(),
        number,
        complement,
        fullstring: `${cepInfo.street}, ${number} - ${
          cepInfo.neighborhood
        } - ${cep.toString()}`,
      })
      .select('*');
    address = addressData![0] as unknown as iAddress['data'];
  }
  return address;
}
