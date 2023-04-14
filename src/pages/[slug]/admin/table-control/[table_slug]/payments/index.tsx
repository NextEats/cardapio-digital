import { Payments } from '@/src/components/admin/Tables/Table/Payment';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { iRestaurantWithFKData } from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iPaymentsProps {
  restaurant: iRestaurantWithFKData;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const restaurant = await getRestaurantBySlugFetch(query.slug);

  return {
    props: {
      restaurant,
    },
  };
};

export default function PaymentsPage({ restaurant }: iPaymentsProps) {
  return (
    <div className="flex flex-col gap-8">
      <Payments />
    </div>
  );
}
