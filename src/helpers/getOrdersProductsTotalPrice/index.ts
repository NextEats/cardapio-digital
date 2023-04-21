import { supabase } from '../../server/api';

interface iGetOrdersProductsTotalPrice {
  product_id: number;
  additionals:
    | Array<{ additional_id: number; quantity: number }>
    | null
    | undefined;
}

export async function getOrdersProductsTotalPrice({
  product_id,
  additionals,
}: iGetOrdersProductsTotalPrice) {
  const { data: productPrice } = await supabase
    .from('products')
    .select('price')
    .eq('id', product_id)
    .single();

  let totalSumOfAdditionalsPrice = 0;

  if (additionals) {
    const { data: additionalsPrice } = await supabase
      .from('additionals')
      .select('id, price')
      .in(
        'id',
        additionals.map(additional => additional.additional_id)
      );

    totalSumOfAdditionalsPrice = additionalsPrice!.reduce((sum, additional) => {
      const additionalSelected = additionals.find(
        add => add.additional_id === additional.id
      );
      return (sum = sum + additional.price * additionalSelected?.quantity!);
    }, 0);
  }

  return productPrice!.price + totalSumOfAdditionalsPrice;
}
