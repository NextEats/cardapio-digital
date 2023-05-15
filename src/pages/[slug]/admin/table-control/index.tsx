import AdminWrapper from '@/src/components/admin/AdminWrapper';
import Tables from '@/src/components/admin/Tables/';
import TableControlContextProvider from '@/src/contexts/TableControlContext';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import { iRestaurantWithFKData } from '@/src/types/iRestaurant';
import { iTables } from '@/src/types/iTable';

import { GetServerSideProps } from 'next';

interface iAdminHomePageProps {
  restaurant: iRestaurantWithFKData;
  tablesData: iTables['data'];
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);

  const { data: tablesData } = await supabase
    .from('tables')
    .select('*')
    .eq('restaurant_id', restaurant.id)
    .not('deleted_at', 'is', null)
    .order('id', { ascending: true });
  return {
    props: {
      restaurant,
      tablesData,
    },
  };
};

export default function TableControl({
  restaurant,
  tablesData,
}: iAdminHomePageProps) {
  return (
    <AdminWrapper>
      <TableControlContextProvider
        restaurant={restaurant}
        tablesData={tablesData}
      >
        <div className="flex flex-col gap-8">
          <Tables />
        </div>
      </TableControlContextProvider>
    </AdminWrapper>
  );
}
