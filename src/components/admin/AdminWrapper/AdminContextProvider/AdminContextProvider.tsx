import { AdminContext } from '@/src/contexts/adminContext';
import { serverURL } from '@/src/server/api';
import { iRestaurantWithFKData } from '@/src/types/types';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

interface iAdminContextProvider {
    children: JSX.Element;
}

export default function AdminContextProvider({
    children,
}: iAdminContextProvider) {
    const [restaurant, setRestaurant] = useState<
        iRestaurantWithFKData | undefined
    >(undefined);

    const router = useRouter();
    const { slug } = router.query;

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
        <AdminContext.Provider value={{ restaurant: restaurant }}>
            {children}
        </AdminContext.Provider>
    );
}
