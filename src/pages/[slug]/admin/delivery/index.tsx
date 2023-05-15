import AdminWrapper from '@/src/components/admin/AdminWrapper';
import Delivery from '@/src/components/admin/Delivery';
import DeliveryContextProvider from '@/src/contexts/DeliveryContext';
import { getActiveCashBoxByTheRestaurantID } from '@/src/fetch/cashBoxes/getActiveCashboxByRestaurantId';
import { getOrdersProductsWithFKDataByOrdersIdsFetch } from '@/src/fetch/ordersProducts/getOrdersProductsWithFKDataByOrdersIds';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersWithStatusFKData,
} from '@/src/types/iOrders';
import { iRestaurant } from '@/src/types/iRestaurant';

import { GetServerSideProps } from 'next';
interface iDeliveryPageProps {
  restaurant: iRestaurant['data'];
  ordersData: iOrdersWithStatusFKData[];
  ordersProductsData: Array<iOrdersProductsWithFKDataToDelivery> | null;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);
  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);

  if (!activeCashBox) {
    return {
      props: {
        restaurant,
        ordersProductsData: [],
        ordersData: [],
      },
    };
  }

  const { data: ordersFromTheActiveCashBox } = await supabase
    .from('orders')
    .select('*, order_status (*), order_types (*), delivery_fees (*)')
    .eq('cash_box_id', activeCashBox!.id);

  const orders_ids = ordersFromTheActiveCashBox?.map(o => o.id);

  const ordersProductsData = await getOrdersProductsWithFKDataByOrdersIdsFetch({
    ordersIds: orders_ids || [],
  });

  return {
    props: {
      restaurant,
      ordersProductsData,
      ordersData: ordersFromTheActiveCashBox,
    },
  };
};

export default function DeliveryPage({
  ordersData,
  ordersProductsData,
  restaurant,
}: iDeliveryPageProps) {
  return (
    <AdminWrapper>
      <DeliveryContextProvider
        ordersData={ordersData}
        restaurant={restaurant}
        ordersProductsData={ordersProductsData}
      >
        <Delivery />
      </DeliveryContextProvider>
    </AdminWrapper>
  );
}
