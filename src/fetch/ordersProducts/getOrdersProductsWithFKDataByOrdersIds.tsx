import { Json } from '@/src/types/supabase';
import { supabase } from '../../server/api';
import {
  iAdditional,
  iOrdersProductsWithFKData,
  iProductOptions,
} from '../../types/types';

interface iGetOrdersProductsWithFKDataByOrdersIdsFetchProps {
  ordersIds: number[];
}
interface iNewAdditionalsData {
  additional: iAdditional['data'];
  quantity: number;
}
interface iAdditionalsData {
  quantity: number;
  additional_id: number;
}

interface iSelectData {
  id: number;
  options: iProductOptions['data'];
}

interface iOrderProductData {
  additionals_data: Json;
  created_at: string | null;
  id: number;
  observation: string | null;
  order_id: number;
  product_id: number;
  selects_data: Json;
  products: {} | {}[] | null;
}

export async function getOrdersProductsWithFKDataByOrdersIdsFetch({
  ordersIds,
}: iGetOrdersProductsWithFKDataByOrdersIdsFetchProps): Promise<
  iOrdersProductsWithFKData[]
> {
  const { data } = await supabase
    .from('orders_products')
    .select(
      `
    *,
    products (*),
    orders (
       *,
       status (*),
       payment_method (*)
    )`
    )
    .in('order_id', ordersIds);

  if (data === null) {
    return [];
  }

  console.log(data);

  return data as unknown as iOrdersProductsWithFKData[];
}
