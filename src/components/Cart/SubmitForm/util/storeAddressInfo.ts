export default function storeAddressInfo(
  deliveryForm: number,
  cep: number,
  neighborhood: string,
  street: string,
  number: string,
  complement: string | null
) {
  if (deliveryForm === 1) {
    localStorage.setItem('cep', cep.toString());
    localStorage.setItem('neighborhood', neighborhood);
    localStorage.setItem('street', street);
    localStorage.setItem('number', number);
    complement ? localStorage.setItem('complement', complement) : null;
  }
}
