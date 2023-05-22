import { AdminContext } from '@/src/contexts/adminContext';
import { useUserAndDetails } from '@/src/hooks/User';
import { api } from '@/src/server/api';
import { iRestaurantWithFKData } from '@/src/types/iRestaurant';
import { useRouter } from 'next/router';
import { SetStateAction, useEffect, useMemo } from 'react';

interface iAdminContextProvider {
  children: JSX.Element;
  restaurant: iRestaurantWithFKData | undefined;
  setRestaurant: React.Dispatch<
    SetStateAction<iRestaurantWithFKData | undefined>
  >;
}

export default function AdminContextProvider({
  children,
  restaurant,
  setRestaurant,
}: iAdminContextProvider) {
  const router = useRouter();
  const { slug } = router.query;
  const { user, userDetails, isLoading } = useUserAndDetails();

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    if (!isLoading) {
      if (!user) {
        router.replace(`/login`);
        return;
      }

      if (userDetails?.restaurant_id !== restaurant.id) {
        router.replace(`/${userDetails?.restaurants.slug}/admin`);
        return;
      }
    }
  }, [user, restaurant, router, userDetails, isLoading]);

  useMemo(() => {
    async function fetchRestaurantData() {
      try {
        const restaurantData = await api.get(`/api/restaurants/${slug}`);
        setRestaurant(restaurantData.data);
      } catch (err) {
        console.error(err);
      }
    }

    fetchRestaurantData();
  }, [slug, setRestaurant]);

  return (
    <AdminContext.Provider
      value={{
        restaurant: restaurant,
        userDetails: userDetails,
        user: user,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
