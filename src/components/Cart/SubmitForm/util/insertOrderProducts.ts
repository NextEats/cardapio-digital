import { iProductReducerInterface } from '@/src/contexts/DigitalMenuContext';
import { supabase } from '@/src/server/api';
import { iOrder } from '@/src/types/types';

export default async function insertOrderProducts(
  order: iOrder['data'],
  products: iProductReducerInterface
) {
  products.state!.forEach(async (product: any) => {
    if (product.quantity) {
      for (let i = 0; i < product.quantity; i++) {
        await supabase
          .from('orders_products')
          .insert({
            order_id: order.id,
            product_id: product.id,
            selects_data: product.selects,
            observation: product.observation,
            additionals_data: product.additionals,
          })
          .select('*');
      }
    } else {
      await supabase
        .from('orders_products')
        .insert({
          order_id: order.id,
          product_id: product.id,
          selects_data: product.selects,
          observation: product.observation,
          additionals_data: product.additionals,
        })
        .select('*');
    }
  });
}
