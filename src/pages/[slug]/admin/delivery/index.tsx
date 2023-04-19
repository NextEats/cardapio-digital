import AdminWrapper from '@/src/components/admin/AdminWrapper';
import Delivery from '@/src/components/admin/Delivery';
import DeliveryContextProvider from '@/src/contexts/DeliveryContextProvider';
import { getActiveCashBoxByTheRestaurantID } from '@/src/fetch/cashBoxes/getActiveCashboxByRestaurantId';
import { getOrdersProductsWithFKDataByOrdersIdsFetch } from '@/src/fetch/ordersProducts/getOrdersProductsWithFKDataByOrdersIds';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersWithStatusFKData,
  iRestaurant,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';
interface iDeliveryPageProps {
  restaurant: iRestaurant['data'];
  orders: iOrdersWithStatusFKData[];
  ordersProducts: Array<iOrdersProductsWithFKDataToDelivery> | null;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);
  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);

  const { data: ordersFromTheActiveCashBox } = await supabase
    .from('orders')
    .select('*, order_status (*), order_types (*)')
    .eq('cash_box_id', activeCashBox!.id);

  const orders_ids = ordersFromTheActiveCashBox?.map(o => o.id);

  const ordersProducts = await getOrdersProductsWithFKDataByOrdersIdsFetch({
    ordersIds: orders_ids || [],
  });

  return {
    props: {
      ordersProducts,
      orders: ordersFromTheActiveCashBox,
    },
  };
};

export default function DeliveryPage({
  orders,
  ordersProducts,
}: iDeliveryPageProps) {
  return (
    <AdminWrapper>
      <DeliveryContextProvider orders={orders} ordersProducts={ordersProducts}>
        <Delivery />
      </DeliveryContextProvider>
    </AdminWrapper>
  );
}
