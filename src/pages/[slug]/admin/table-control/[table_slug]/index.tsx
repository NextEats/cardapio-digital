import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import { iOrders, iRestaurantWithFKData, iTables } from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iTableProps {
  restaurant: iRestaurantWithFKData;
  table: iTables['data'];
  orders_products: iOrders['data'];
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
  // const ordersId = orders_products!.map( op => op.id )
  const { data: orders_products, error } = await supabase
    .from('orders_products')
    .select('*')
    .range(10, 50);
  return {
    props: {
      restaurant,
      table,
      orders_products,
    },
  };
};

export default function Table({
  restaurant,
  table,
  orders_products,
}: iTableProps) {
  console.log(orders_products);

  return <div className="flex flex-col gap-8">{table[0].name}</div>;
}
