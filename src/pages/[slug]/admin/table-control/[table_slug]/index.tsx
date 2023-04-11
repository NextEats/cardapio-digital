import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iOrders,
  iOrdersProducts,
  iRestaurantWithFKData,
  iTables,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iTableProps {
  restaurant: iRestaurantWithFKData;
  table: iTables['data'];
  orders_products: iOrders['data'];
  orders: iOrders['data'];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const restaurant = await getRestaurantBySlugFetch(query.slug);
  const { data: table } = await supabase
    .from('tables')
    .select('*')
    .match({ restaurant_id: restaurant.id, table_slug: query.table_slug });

  if (!table) {
    return {
      props: {
        restaurant,
      },
    };
  }
  const { data: orders_tables } = await supabase
    .from('orders_tables')
    .select('*')
    .eq('table_id', table[0].id);
  const ordersId = orders_tables!.map(op => op.order_id);
  const { data: orders_products, error } = await supabase
    .from('orders_products')
    .select('*')
    .in('order_id', ordersId);

  const MAX_PER_PAGE = 1000;
  let currentPage = 0;
  let allOrders: iOrdersProducts['data'] = [];

  while (true) {
    const { data: orders, error } = await supabase
      .from('orders_products')
      .select('*')
      .range(currentPage * MAX_PER_PAGE, (currentPage + 1) * MAX_PER_PAGE - 1);

    if (error) {
      console.error('Error fetching orders:', error);
      break;
    }

    if (orders.length === 0) {
      // Nenhum pedido restante, interrompa o loop
      break;
    }

    allOrders = allOrders.concat(orders);
    currentPage++;
  }

  return {
    props: {
      restaurant,
      table,
      orders_products: allOrders,
      // orders: allOrders
    },
  };
};

export default function Table({
  restaurant,
  table,
  orders_products,
  orders,
}: iTableProps) {
  console.log(orders_products);

  return <div className="flex flex-col gap-8">{table[0].name}</div>;
}
