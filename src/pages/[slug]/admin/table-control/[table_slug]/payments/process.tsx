import Process from '@/src/components/admin/Tables/Table/Payment/Process';
import { getPaymentMethodsRestaurantsByRestaurantIdFetch } from '@/src/fetch/paymentMethodsRestaurants/getPaymentMethodsRestaurantsByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import {
  iPaymentMethodsRestaurantsWithFKData,
  iRestaurantWithFKData,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iPaymentsProps {
  restaurant: iRestaurantWithFKData;
  payment_method_restaurant: iPaymentMethodsRestaurantsWithFKData[];
  order_table_id: number;
}

export default function PaymentsPage({
  restaurant,
  payment_method_restaurant,
  order_table_id,
}: iPaymentsProps) {
  return (
    <div className="flex flex-col gap-8">
      <Process
        payment_method_restaurant={payment_method_restaurant}
        order_table_id={order_table_id}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const restaurant = await getRestaurantBySlugFetch(query.slug);

  const { data: table_id } = await supabase.from('tables').select('id').match({
    restaurant_id: restaurant.id,
    table_slug: query.table_slug,
  });

  const [payment_method_restaurant, order_table_id] = await Promise.all([
    getPaymentMethodsRestaurantsByRestaurantIdFetch(restaurant.id),
    supabase
      .from('orders_tables')
      .select('id, order_id')
      .eq('table_id', table_id![0].id)
      .eq('has_been_paid', false),
  ]);

  return {
    props: {
      restaurant,
      payment_method_restaurant: payment_method_restaurant,
      order_table_id: order_table_id.data![0].id,
    },
  };
};
