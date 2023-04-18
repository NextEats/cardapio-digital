import { supabase } from '../../server/api';
import { Json } from '../../types/supabase';
import { iOrdersProducts } from '../../types/types';

interface iPostOrderProductFetch {
  product_id: number;
  order_id: number;
  observation: string;
  selects_data: Json;
  additionals_data?: Json;
  total_price: number;
  quantity: number;
}

export async function postOrderProductFetch({
  observation,
  order_id,
  product_id,
  quantity,
  selects_data,
  total_price,
  additionals_data,
}: iPostOrderProductFetch): Promise<iOrdersProducts['data']> {
  const { data, error } = await supabase
    .from('orders_products')
    .insert({
      product_id,
      order_id,
      observation,
      additionals_data,
      selects_data,
      total_price,
      quantity,
    })
    .select('*');

  console.error(error);
  return data!;
}
