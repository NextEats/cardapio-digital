import AdminWrapper from '@/src/components/admin/AdminWrapper';
import CashBoxButtons from '@/src/components/admin/initialPage/CashBoxButtons';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { getRestaurantResources } from '@/src/fetch/restaurantResources';
import { calculateBilling } from '@/src/helpers/calculateBilling';
import { groupOrdersByStatus } from '@/src/helpers/groupOrdersByStatus';
import { iCashboxManagement } from '@/src/types/types';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSideProps } from 'next';
import { useState } from 'react';

export const getServerSideProps: GetServerSideProps = async context => {
  const supabaseServer = createServerSupabaseClient(context);
  const session = await supabaseServer.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const restaurant = await getRestaurantBySlugFetch(context.query.slug);
  const resources = await getRestaurantResources(restaurant.id);

  return {
    props: {
      ...resources,
      restaurant,
    },
  };
};

const CashboxManagement = (props: iCashboxManagement) => {
  console.log(props);

  const {
    ordersData,
    ordersProductsData,
    products,
    cashBoxes,
    additionals,
    selects,
    restaurant,
  } = props;

  const cashBoxOpened = cashBoxes.find((cb: any) => cb.is_open === true);
  const [cashBoxState, setCashBoxState] = useState(cashBoxOpened);

  const ordersGroupedByOrderStatus = groupOrdersByStatus(ordersData);

  let res: any = {};

  if (
    ordersGroupedByOrderStatus['entregue'] &&
    ordersGroupedByOrderStatus['cancelado'] &&
    ordersGroupedByOrderStatus['em produção']
  ) {
    res['entregue'] = ordersGroupedByOrderStatus['entregue']
      ? ordersGroupedByOrderStatus['entregue'].filter(
          elem => elem.cash_box_id === cashBoxState?.id
        )
      : [];

    res['cancelado'] = ordersGroupedByOrderStatus['cancelado']
      ? ordersGroupedByOrderStatus['cancelado'].filter(
          elem => elem.cash_box_id === cashBoxState?.id
        )
      : [];

    res['em produção'] = ordersGroupedByOrderStatus['em produção']
      ? ordersGroupedByOrderStatus['em produção'].filter(
          elem => elem.cash_box_id === cashBoxState?.id
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
        cashBoxState={cashBoxState}
        restaurantId={restaurant.id}
        ordersGroupedByOrderStatus={res}
        billing={billingAmount}
      />
    </AdminWrapper>
  );
};

export default CashboxManagement;
