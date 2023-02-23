import { supabase } from '@/src/server/api';
import type { tUserDetails } from '@/src/types/types';
import { useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useUserAndDetails() {
    const user = useUser();
    const [userDetails, setUserDetails] = useState<tUserDetails | undefined>(
        undefined
    );
    const router = useRouter();

    useEffect(() => {
        async function fetchUserDetails() {
            const { data: userDetailsData, error } = await supabase
                .from('user_details')
                .select(
                    `
                        id,
                        restaurant_id,
                        user_id,
                        is_waiter,
                        restaurants (
                            id,
                            name,
                            slug
                        )
                    `
                )
                .eq('user_id', user?.id);

            if (error) {
                console.error(error);
                return;
            }

            if (!userDetailsData) {
                router.replace(`/login`);
            } else {
                const userDetailsTypedData =
                    userDetailsData[0] as unknown as tUserDetails;
                setUserDetails(userDetailsTypedData);
            }
        }

        if (user) {
            fetchUserDetails();
        }
    }, [user, router]);

    return { user, userDetails };
}
