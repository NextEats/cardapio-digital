import AdminWrapper from '@/src/components/admin/AdminWrapper';
import { CashBox } from '@/src/components/admin/CashBox';
import CashBillingCards from '@/src/components/admin/CashBox/CashBillingCards';
import CashHeader from '@/src/components/admin/CashBox/CashHeader';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iCashBox,
  iOrdersProductsWithFKData,
  iRestaurantWithFKData,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

export interface iCashboxManagement {
  activeCashBox: iCashBox['data'] | null;
  ordersProductsData: iOrdersProductsWithFKData[];
  restaurant: iRestaurantWithFKData;
  thereArePendingOrders: boolean;
}

async function getActiveCashBoxByTheRestaurantID(restaurant_id: number) {
  const { data } = await supabase
    .from('cash_boxes')
    .select()
    .match({ restaurant_id, is_open: true });

  if (data) {
    return data[0] as unknown as iCashBox['data'];
  } else {
    return null;
  }
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);
  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);
  if (!activeCashBox) {
    return {
      props: {
        ordersProductsData: [],
        activeCashBox: null,
        restaurant,
      },
    };
  }
  const { data: ordersFromTheActiveCashBox } = await supabase
    .from('orders')
    .select('*')
    .eq('cash_box_id', activeCashBox!.id);

  const thereArePendingOrders: boolean =
    ordersFromTheActiveCashBox !== null
      ? ordersFromTheActiveCashBox?.some(order => {
          return (
            order.order_status_id === 2 ||
            order.order_status_id === 3 ||
            order.order_status_id === 4
          );
        })
      : false;

  const orders_ids = ordersFromTheActiveCashBox
    ? ordersFromTheActiveCashBox!.map(o => o.id)
    : [];

  const { data: ordersProductsByOrdersIds } = await supabase
    .from('orders_products')
    .select(
      'product_id, order_id, total_price, quantity, id, products (*), orders (*, payment_methods (*), order_status(*) )'
    )
    .in('order_id', orders_ids);

  return {
    props: {
      ordersProductsData: ordersProductsByOrdersIds,
      activeCashBox,
      restaurant,
      thereArePendingOrders,
    },
  };
};

export default function CashboxPage(props: iCashboxManagement) {
  const {
    activeCashBox,
    ordersProductsData,
    restaurant,
    thereArePendingOrders,
  } = props;

  let totalDelivery = 0;
  let totalMesa = 0;
  if (ordersProductsData)
    ordersProductsData.map(item => {
      if (item.orders.payment_methods.name === 'MESA') {
        totalMesa = totalMesa + item.total_price * item.quantity;
      } else {
        totalDelivery = totalDelivery + item.total_price * item.quantity;
      }
    });

  console.log(
    'totalMesa',
    totalMesa,
    'totalDelivery',
    totalDelivery,
    'restaurantId',
    restaurant.id,
    'activeCashBox',
    activeCashBox,
    'thereArePendingOrders',
    thereArePendingOrders,
    'ordersProducts',
    ordersProductsData
  );

  return (
    <AdminWrapper>
      <div>
        <CashHeader
          totalMesa={totalMesa}
          totalDelivery={totalDelivery}
          restaurantId={restaurant.id}
          activeCashBox={activeCashBox}
          thereArePendingOrders={thereArePendingOrders}
          ordersProducts={ordersProductsData}
        />
        <CashBillingCards
          totalMesa={totalMesa}
          totalDelivery={totalDelivery}
          cashBoxInitialValue={activeCashBox ? activeCashBox?.initial_value : 0}
        />
        <CashBox ordersProducts={ordersProductsData || []} />
      </div>
    </AdminWrapper>
  );
}
