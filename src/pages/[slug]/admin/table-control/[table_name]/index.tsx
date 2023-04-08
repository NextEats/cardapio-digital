import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import { iRestaurantWithFKData, iTables } from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iTableProps {
  restaurant: iRestaurantWithFKData;
  table: iTables['data'];
}

export const getServerSideProps: GetServerSideProps<
  any,
  { table_name: string; slug: string }
> = async ({ query }) => {
  const restaurant = await getRestaurantBySlugFetch(query.slug);
  const { data: table } = await supabase
    .from('tables')
    .select('*')
    .match({ restaurant_id: restaurant.id, name: query.table_name });
  return {
    props: {
      restaurant,
      table,
    },
  };
};

export default function Table({ restaurant, table }: iTableProps) {
  console.log(table);
  // if (!table) return null
  return <div className="flex flex-col gap-8">{table[0].name}</div>;
}
