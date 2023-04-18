import AdminWrapper from '@/src/components/admin/AdminWrapper';
import Delivery from '@/src/components/admin/Delivery';
import DeliveryContextProvider from '@/src/contexts/DeliveryContextProvider';
import { getActiveCashBoxByTheRestaurantID } from '@/src/fetch/cashBoxes/getActiveCashboxByRestaurantId';
import { getOrdersProductsWithFKDataByOrdersIdsFetch } from '@/src/fetch/ordersProducts/getOrdersProductsWithFKDataByOrdersIds/getOrdersProductsWithFKDataByOrdersIds';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iOrder,
  iOrdersProductsWithFKData,
  iRestaurant,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

// async function getOrdersProductsByRestaurantId(restaurantId: number) {
//   const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurantId);

//   console.log('activeCashBox', activeCashBox);

//   const { data, error } = await supabase
//     .from('orders_products_by_restaurant')
//     .select('*')
//     .match({
//       order_restaurant_id: restaurantId,
//       order_cash_box_id: activeCashBox!.id,
//     });

//   if (error) {
//     console.error('Error fetching orders_products:', error);
//     return [];
//   }

//   return data;
// }
interface iDeliveryPageProps {
  restaurant: iRestaurant['data'];
  ordersProducts: iOrdersProductsWithFKData[];
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);

  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);

  const { data: ordersFromTheActiveCashBox } = await supabase
    .from('orders')
    .select('*')
    .eq('cash_box_id', activeCashBox!.id);

  const orders_ids = ordersFromTheActiveCashBox
    ? ordersFromTheActiveCashBox!.map(o => o.id)
    : [];

  // const ordersProducts = await supabase
  //   .from('orders_products')
  //   .select('*, orders (*), products (*)')
  //   .eq('orders.restaurant_id', restaurant.id);

  return {
    props: {
      ordersProducts: await getOrdersProductsWithFKDataByOrdersIdsFetch({
        ordersIds: orders_ids,
      }),
      restaurant,
    },
  };
};

export default function DeliveryPage({
  restaurant,
  ordersProducts,
}: iDeliveryPageProps) {
  console.log(ordersProducts);
  return (
    <AdminWrapper>
      <DeliveryContextProvider
        order={{} as iOrder['data']}
        orders_products={[]}
        restaurant={restaurant}
      >
        <Delivery />
      </DeliveryContextProvider>
      {/* <DeliveryPage {...props} /> */}
    </AdminWrapper>
  );
}
