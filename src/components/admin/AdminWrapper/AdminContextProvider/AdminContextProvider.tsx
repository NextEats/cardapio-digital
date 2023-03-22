import { AdminContext } from '@/src/contexts/adminContext';
import { useUserAndDetails } from '@/src/hooks/User';
import { serverURL } from '@/src/server/api';
import { iRestaurantWithFKData } from '@/src/types/types';
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
    const { user, userDetails } = useUserAndDetails();

    useEffect(() => {
        if (!restaurant) {
            return;
        }

        if (!user || userDetails?.restaurant_id !== restaurant.id) {
            router.replace(`/login`);
        }
    });

    useMemo(() => {
        async function fetchRestaurantData() {
            try {
                const restaurantData = await fetch(
                    `${serverURL}/api/restaurants/${slug}`
                );
                const jsonData = await restaurantData.json();
                setRestaurant(jsonData);
            } catch (err) {
                console.error(err);
            }
        }

        fetchRestaurantData();
    }, [slug]);

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
