import cepPromise from 'cep-promise';
import { removeNonAlphaNumeric } from './removeNonAlphaNumeric';

export default async function returnStreetFromCep(cep: string) {
  const cepInfo = await cepPromise(removeNonAlphaNumeric(cep));

  return cepInfo.street;
}
