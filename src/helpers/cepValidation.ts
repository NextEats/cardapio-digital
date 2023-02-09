export default function cepValidation(cep: string) {
  const regex = /^[0-9]{8}/;
  return regex.test(cep);
}

// export function cepValidation(cep: string) {
//   const regex = /^[0-9]{8}/;
//   return regex.test(cep);
// }
