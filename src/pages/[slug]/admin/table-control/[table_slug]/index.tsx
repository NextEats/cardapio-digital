import Table from '@/src/components/admin/Tables/Table';
import TableContextProvider from '@/src/contexts/TableContext';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iOrder,
  iOrdersProducts,
  iOrdersTablesWithFkData,
  iRestaurantWithFKData,
  iTable,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iTableProps {
  restaurant: iRestaurantWithFKData;
  table: iTable['data'];
  orders_tables: iOrdersTablesWithFkData;
  orders_products: iOrdersProducts['data'];
  order: iOrder['data'];
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
    .select('*, orders (*) ')
    .eq('table_id', table[0].id)
    .eq('has_been_paid', false);
  const { data: orders_products } = await supabase
    .from('orders_products')
    .select('*')
    .eq('order_id', orders_tables![0].order_id);

  return {
    props: {
      restaurant,
      table: table[0],
      orders_products,
      orders_tables: orders_tables![0],
      order: orders_tables![0].orders,
    },
  };
};

export default function TablePage({
  restaurant,
  table,
  orders_products,
  orders_tables,
  order,
}: iTableProps) {
  return (
    <div className="flex flex-col gap-8">
      <TableContextProvider
        restaurant={restaurant}
        table={table}
        orders_products={orders_products}
        orders_tables={orders_tables}
        order={order}
      >
        <Table />
      </TableContextProvider>
    </div>
  );
}
