import Table from '@/src/components/admin/Tables/Table';
import TableContextProvider from '@/src/contexts/TableContext';
import { getAdditionalsByRestaurantIdFetch } from '@/src/fetch/additionals/getAdditionals';
import { getOrdersProductsWithFKProducdDataByOrdersIdsFetch } from '@/src/fetch/ordersProducts/getOrdersProductsWithFKProducdDataByOrdersIds';
import { getOrdersTablesByTableId } from '@/src/fetch/ordersTables/getOrdersTablesByTableId';
import { getProductAdditionalsFetch } from '@/src/fetch/productAdditionals/getProductAdditionals';
import { getProductsByRestaurantIdFetch } from '@/src/fetch/products/getProductsByRestaurantId';
import { getProductsCategoriesByRestaurantIdFetch } from '@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iAdditionals,
  iOrder,
  iOrdersProductsWithFKProducdData,
  iOrdersTablesWithOrderFkData,
  iProductAdditionals,
  iProductCategories,
  iProducts,
  iRestaurantWithFKData,
  iTable,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iTableProps {
  categories: iProductCategories['data'];
  restaurant: iRestaurantWithFKData;
  table: iTable['data'];
  orders_tables: iOrdersTablesWithOrderFkData;
  orders_products: iOrdersProductsWithFKProducdData[];
  order: iOrder['data'] | null;
  additionals: iAdditionals['data'];
  products: iProducts['data'];
  product_additionals: iProductAdditionals['data'];
  table_paymants_values: number;
}

export default function TablePage({
  restaurant,
  table,
  orders_products,
  orders_tables,
  order,
  additionals,
  products,
  categories,
  product_additionals,
  table_paymants_values,
}: iTableProps) {
  return (
    <div className="flex flex-col gap-8">
      <TableContextProvider
        product_additionals={product_additionals}
        categories={categories}
        additionals={additionals}
        restaurant={restaurant}
        products={products}
        table={table}
        orders_products={orders_products}
        orders_tables={orders_tables}
        order={order}
        table_paymants_values={table_paymants_values}
      >
        <Table />
      </TableContextProvider>
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

  const orders_tables = await getOrdersTablesByTableId({
    table_id: table[0].id,
  });

  const [
    orders_products,
    additionals,
    products,
    categories,
    product_additionals,
    table_paymants_values_data,
  ] = await Promise.all([
    orders_tables
      ? getOrdersProductsWithFKProducdDataByOrdersIdsFetch({
          ordersIds: [orders_tables.order_id!],
        })
      : [],
    getAdditionalsByRestaurantIdFetch(restaurant.id),
    getProductsByRestaurantIdFetch(restaurant.id),
    getProductsCategoriesByRestaurantIdFetch(restaurant.id),
    getProductAdditionalsFetch(),
    orders_tables && orders_tables
      ? supabase
          .from('table_payments')
          .select('value')
          .eq('order_table_id', orders_tables.id)
      : null,
  ]);

  console.log(table_paymants_values_data);

  const table_paymants_values = table_paymants_values_data?.data
    ? (table_paymants_values_data?.data).reduce(
        (acc, item) => acc + (item.value as number),
        0
      )
    : 0;

  return {
    props: {
      categories,
      restaurant,
      products,
      additionals,
      table: table[0],
      orders_products,
      orders_tables: orders_tables ? orders_tables : null,
      order: orders_tables?.orders ? orders_tables.orders : null,
      product_additionals,
      table_paymants_values,
    },
  };
};
