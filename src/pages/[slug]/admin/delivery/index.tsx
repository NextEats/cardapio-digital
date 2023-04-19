import AdminWrapper from '@/src/components/admin/AdminWrapper';
import Delivery from '@/src/components/admin/Delivery';
import DeliveryContextProvider from '@/src/contexts/DeliveryContextProvider';
import { getActiveCashBoxByTheRestaurantID } from '@/src/fetch/cashBoxes/getActiveCashboxByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import { iOrders, iOrdersProductsView, iRestaurant } from '@/src/types/types';
import { GetServerSideProps } from 'next';
interface iDeliveryPageProps {
  restaurant: iRestaurant['data'];
  orders: iOrders;
  ordersProducts: Array<iOrdersProductsView['data']> | null;
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);
  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);

  const { data: ordersFromTheActiveCashBox } = await supabase
    .from('orders')
    .select('*')
    .eq('cash_box_id', activeCashBox!.id);

  const { data: ordersProducts } = await supabase
    .from('orders_products_by_restaurant')
    .select('*')
    .match({
      o_restaurant_id: restaurant.id,
      o_cash_box_id: activeCashBox?.id,
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
