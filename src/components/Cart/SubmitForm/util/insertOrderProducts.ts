import {
  iProductReducerInterface,
  iProductsReducer,
} from '@/src/contexts/DigitalMenuContext';
import { getOrdersProductsTotalPrice } from '@/src/helpers/getOrdersProductsTotalPrice';
import { supabase } from '@/src/server/api';
import { iOrder } from '@/src/types/types';

export default async function insertOrderProducts(
  order: iOrder['data'],
  products: iProductReducerInterface
) {
  products.state!.forEach(async (product: iProductsReducer) => {
    const total_price = await getOrdersProductsTotalPrice({
      product_id: product.id,
      additionals: product.additionals,
    });

    await supabase.from('orders_products').insert({
      order_id: order.id,
      product_id: product.id,
      selects_data: product.selects,
      observation: product.observation,
      additionals_data: product.additionals,
      quantity: product.quantity,
      total_price,
    });
  });
}
