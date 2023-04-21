import AdminWrapper from '@/src/components/admin/AdminWrapper';
import { CashBox } from '@/src/components/admin/CashBox';
import CashBillingCards from '@/src/components/admin/CashBox/CashBillingCards';
import CashHeader from '@/src/components/admin/CashBox/CashHeader';
import { getActiveCashBoxByTheRestaurantID } from '@/src/fetch/cashBoxes/getActiveCashboxByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iCashBox,
  iOrdersProductsWithFKData,
  iRestaurantWithFKData,
  iTablePaymentWithPaymentFKData,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

export interface iCashboxManagement {
  activeCashBox: iCashBox['data'] | null;
  ordersProductsData: iOrdersProductsWithFKData[];
  restaurant: iRestaurantWithFKData;
  thereArePendingOrders: boolean;
  tables_payments: iTablePaymentWithPaymentFKData[];
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

  const [ordersProductsByOrdersIds, ordersTablesData] = await Promise.all([
    supabase
      .from('orders_products')
      .select(
        '*, products (*), orders (*, payment_methods (*), order_status (*) )'
      )
      .in('order_id', orders_ids),
    supabase.from('orders_tables').select('id').in('order_id', [orders_ids]),
  ]);

  const ordersTablesIds = ordersTablesData.data!.map(ot => ot.id);

  const { data: tables_payments } = await supabase
    .from('table_payments')
    .select('*, payment_methods (*)')
    .in('order_table_id', [ordersTablesIds]);

  return {
    props: {
      ordersProductsData: ordersProductsByOrdersIds.data,
      activeCashBox,
      restaurant,
      thereArePendingOrders,
      tables_payments,
    },
  };
};

export default function CashboxPage(props: iCashboxManagement) {
  const {
    activeCashBox,
    ordersProductsData,
    restaurant,
    thereArePendingOrders,
    tables_payments,
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
          tables_payments={tables_payments}
        />
        <CashBillingCards
          totalMesa={totalMesa}
          totalDelivery={totalDelivery}
          cashBoxInitialValue={activeCashBox ? activeCashBox?.initial_value : 0}
        />
        <div className="pb-20">
          <CashBox
            tables_payments={tables_payments}
            ordersProducts={ordersProductsData || []}
          />
        </div>
      </div>
    </AdminWrapper>
  );
}
