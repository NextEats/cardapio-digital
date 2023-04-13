import AdminWrapper from '@/src/components/admin/AdminWrapper';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iAdditionals,
  iCashBox,
  iCashBoxes,
  iInsertAddresses,
  iInsertClients,
  iInsertContacts,
  iInsertOrderStatuss,
  iOrdersProducts,
  iOrdersTablesWithFkData,
  iOrdersWithFKData,
  iProducts,
  iRestaurantWithFKData,
  iSelects,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

export interface iCashboxManagement {
  ordersData: iOrdersWithFKData[];
  activeCashBox: iCashBox | null;
  orderStatuss: iInsertOrderStatuss['data'];
  ordersProductsData: iOrdersProducts['data'];
  products: iProducts['data'];
  clients: iInsertClients['data'];
  contacts: iInsertContacts['data'];
  addresses: iInsertAddresses['data'];
  cashBoxes: iCashBoxes['data'];
  additionals: iAdditionals['data'];
  selects: iSelects['data'];
  ordersTablesData: iOrdersTablesWithFkData[];
  restaurant: iRestaurantWithFKData;
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
  // const resources = await getRestaurantResources(restaurant.id);

  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);

  const { data: ordersFromTheActiveCashBox } = await supabase
    .from('orders')
    .select('*')
    .match({ cashbox_id: activeCashBox!.id });

  const orders_ids = ordersFromTheActiveCashBox
    ? ordersFromTheActiveCashBox!.map(o => o.id)
    : [];

  const { data: ordersProductsByOrdersIds } = await supabase
    .from('orders_products')
    .select('*')
    .in('order_id', orders_ids);

  return {
    props: {
      // ...activeCashBox,
      ordersProductsData: ordersProductsByOrdersIds,
      activeCashBox: activeCashBox ? activeCashBox : null,
      restaurant,
    },
  };
};

const CashboxManagement = (props: iCashboxManagement) => {
  const { activeCashBox, ordersProductsData, cashBoxes, restaurant } = props;

  console.log('ordersProductsData', ordersProductsData);
  console.log('activeCashBox', activeCashBox);

  // const cashBoxOpened = cashBoxes.find((cb: any) => cb.is_open === true);
  // const ordersGroupedByOrderStatus = groupOrdersByStatus(ordersData);

  if (!restaurant) {
    return null;
  }

  let res: any = {};

  // console.log('ordersGroupedByOrderStatus', ordersGroupedByOrderStatus);

  // if (ordersGroupedByOrderStatus['entregue']) {
  //   res['entregue'] = ordersGroupedByOrderStatus['entregue']
  //     ? ordersGroupedByOrderStatus['entregue'].filter(elem => {
  //         return elem.cash_box_id === cashBoxOpened?.id;
  //       })
  //     : [];
  // }

  // if (ordersGroupedByOrderStatus['cancelado']) {
  //   res['cancelado'] = ordersGroupedByOrderStatus['cancelado']
  //     ? ordersGroupedByOrderStatus['cancelado'].filter(
  //         elem => elem.cash_box_id === cashBoxOpened?.id
  //       )
  //     : [];
  // }

  // if (ordersGroupedByOrderStatus['em produção']) {
  //   res['em produção'] = ordersGroupedByOrderStatus['em produção']
  //     ? ordersGroupedByOrderStatus['em produção'].filter(
  //         elem => elem.cash_box_id === cashBoxOpened?.id
  //       )
  //     : [];
  // }

  // if (
  //   !ordersGroupedByOrderStatus['entregue'] &&
  //   !ordersGroupedByOrderStatus['cancelado'] &&
  //   !ordersGroupedByOrderStatus['em produção']
  // ) {
  //   res = ordersGroupedByOrderStatus;
  // }

  // const billingAmount = calculateBilling({
  //   ordersGroupedByOrderStatus: res,
  //   ordersProductsData,
  //   additionals,
  //   products,
  //   selects,
  // });

  // console.log(billingAmount);

  return (
    <AdminWrapper>
      <div></div>
      {/* <CashBox
        cashBoxState={activeCashBox}
        restaurantId={restaurant.id}
        ordersGroupedByOrderStatus={res}
        billing={69}
      /> */}
    </AdminWrapper>
  );
};

export default CashboxManagement;
