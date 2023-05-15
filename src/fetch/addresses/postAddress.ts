import { iAddresses } from '@/src/types/iAddress';
import { supabase } from '../../server/api';

export async function postAddressFetch(
  cep: string,
  number: string,
  complement: string,
  google_maps_link: string,
  reference_point: string
): Promise<iAddresses['data']> {
  const { data } = await supabase
    .from('addresses')
    .insert({
      cep,
      number,
      complement,
      google_maps_link,
      reference_point,
    })
    .select('*');

  return data!;
}
