import { Payments } from '@/src/components/admin/Tables/Table/Payment';
import { getOrdersProductsWithFKProducdDataByOrdersIdsFetch } from '@/src/fetch/ordersProducts/getOrdersProductsWithFKProducdDataByOrdersIds';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iOrdersProductsWithFKProducdData,
  iRestaurantWithFKData,
  iTablePaymentMethodsWithPaymentFKData,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iPaymentsProps {
  restaurant: iRestaurantWithFKData;
  table_payments: iTablePaymentMethodsWithPaymentFKData[];
  total_orders_products_price: number;
}

export default function PaymentsPage({
  restaurant,
  table_payments,
  total_orders_products_price,
}: iPaymentsProps) {
  return (
    <div className="flex flex-col gap-8">
      <Payments
        table_payments={table_payments}
        total_orders_products_price={total_orders_products_price}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const restaurant = await getRestaurantBySlugFetch(query.slug);

  const { data: table } = await supabase.from('tables').select('*').match({
    restaurant_id: restaurant.id,
    table_slug: query.table_slug,
  });
  if (!table) {
    return {
      props: { restaurant },
    };
  }

  const { data: orders_tables } = await supabase
    .from('orders_tables')
    .select('id, order_id')
    .eq('table_id', table[0].id)
    .eq('has_been_paid', false);

  if (!orders_tables) {
    return {
      props: {
        restaurant,
        table_payments: [],
        total_orders_products_price: 0,
      },
    };
  }

  const [table_payments, orders_products] = await Promise.all([
    orders_tables && orders_tables[0]
      ? supabase
          .from('table_payments')
          .select('*, payment_methods (*)')
          .eq('order_table_id', orders_tables[0].id)
      : null,
    orders_tables && orders_tables[0]
      ? getOrdersProductsWithFKProducdDataByOrdersIdsFetch({
          ordersIds: [orders_tables[0].order_id!],
        })
      : [],
  ]);
  console.log(table_payments);

  const total_orders_products_price = (
    orders_products as iOrdersProductsWithFKProducdData[]
  ).reduce<number>((acc, item) => acc + item.total_price * item.quantity, 0);

  return {
    props: {
      restaurant,
      table_payments: table_payments?.data || [],
      total_orders_products_price,
    },
  };
};
