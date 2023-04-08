import AdminWrapper from '@/src/components/admin/AdminWrapper';
import CashBoxButtons from '@/src/components/admin/initialPage/CashBoxButtons';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { getRestaurantResources } from '@/src/fetch/restaurantResources';
import { calculateBilling } from '@/src/helpers/calculateBilling';
import { groupOrdersByStatus } from '@/src/helpers/groupOrdersByStatus';
import { supabase } from '@/src/server/api';
import { iCashBox, iCashboxManagement } from '@/src/types/types';
import { GetServerSideProps } from 'next';

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
  const resources = await getRestaurantResources(restaurant.id);

  const activeCashBox = await getActiveCashBoxByTheRestaurantID(restaurant.id);

  const ordersFromTheActiveCashBox = activeCashBox
    ? await supabase
        .from('orders')
        .select('*')
        .match({ cashbox_id: activeCashBox.id })
    : null;

  console.log('ordersFromTheActiveCashBox', ordersFromTheActiveCashBox);

  return {
    props: {
      ...resources,
      activeCashBox: activeCashBox ? activeCashBox : null,
      restaurant,
    },
  };
};

const CashboxManagement = (props: iCashboxManagement) => {
  const {
    ordersData,
    activeCashBox,
    ordersProductsData,
    products,
    cashBoxes,
    additionals,
    selects,
    restaurant,
  } = props;

  console.log('activeCashBox', activeCashBox);

  const cashBoxOpened = cashBoxes.find((cb: any) => cb.is_open === true);
  const ordersGroupedByOrderStatus = groupOrdersByStatus(ordersData);

  let res: any = {};

  if (
    ordersGroupedByOrderStatus['entregue'] &&
    ordersGroupedByOrderStatus['cancelado'] &&
    ordersGroupedByOrderStatus['em produção']
  ) {
    res['entregue'] = ordersGroupedByOrderStatus['entregue']
      ? ordersGroupedByOrderStatus['entregue'].filter(
          elem => elem.cash_box_id === cashBoxOpened?.id
        )
      : [];

    res['cancelado'] = ordersGroupedByOrderStatus['cancelado']
      ? ordersGroupedByOrderStatus['cancelado'].filter(
          elem => elem.cash_box_id === cashBoxOpened?.id
        )
      : [];

    res['em produção'] = ordersGroupedByOrderStatus['em produção']
      ? ordersGroupedByOrderStatus['em produção'].filter(
          elem => elem.cash_box_id === cashBoxOpened?.id
        )
      : [];
  } else {
    res = ordersGroupedByOrderStatus;
  }

  const billingAmount = calculateBilling({
    ordersGroupedByOrderStatus: res,
    ordersProductsData,
    additionals,
    products,
    selects,
  });

  if (!restaurant) {
    return null;
  }

  return (
    <AdminWrapper>
      <CashBoxButtons
        cashBoxState={cashBoxOpened}
        restaurantId={restaurant.id}
        ordersGroupedByOrderStatus={res}
        billing={billingAmount}
      />
    </AdminWrapper>
  );
};

export default CashboxManagement;
