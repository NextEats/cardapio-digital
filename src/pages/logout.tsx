import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useEffect } from 'react';

import { useRouter } from 'next/router';

export type tUserDetails = {
    id: number;
    restaurant_id: number;
    user_id: string;
    restaurants: {
        id: number;
        name: string;
        slug: string;
    };
};

export default function Logout() {
    const supabaseClient = useSupabaseClient();
    const user = useUser();

    const Router = useRouter();

    useEffect(() => {
        async function signOutUser() {
            const { error } = await supabaseClient.auth.signOut();
            Router.replace('/login');
        }

        if (user) {
            signOutUser();
        } else {
            Router.replace('/login');
        }
    }, [user, supabaseClient, Router]);

    return <></>;
}
