import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { GetServerSidePropsContext } from 'next';
import { getAdditionalsByRestaurantIdFetch } from '../fetch/additionals/getAdditionals';
import { getAddressesFetch } from '../fetch/addresses/getAddresses';
import { getCashBoxesByRestaurantIdFetch } from '../fetch/cashBoxes/getCashBoxesByRestaurantId';
import { getclientsFetch } from '../fetch/clients/getClients';
import { getContactsFetch } from '../fetch/contacts/getContacts';
import { getOrdersByRestaurantIdFetch } from '../fetch/orders/getOrdersByRestaurantId';
import { getOrdersTablesFetch } from '../fetch/ordersTables/getOrdersTables';
import { getProductsByRestaurantIdFetch } from '../fetch/products/getProductsByRestaurantId';
import { getRestaurantBySlugFetch } from '../fetch/restaurant/getRestaurantBySlug';
import { getSelectsByRestaurantIdFetch } from '../fetch/selects/getSelectsByRestaurantId';
import { supabase } from '../server/api';

export async function fetchAdminHomePageData(
    context: GetServerSidePropsContext
) {
    const supabaseServer = createServerSupabaseClient(context);

    const {
        data: { session },
    } = await supabaseServer.auth.getSession();

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    } else {
        const { data: userDetailsData } = await supabase
            .from('user_details')
            .select(
                `
                    id,
                    restaurant_id,
                    user_id,
                    restaurants (
                        id,
                        name,
                        slug
                    )
            `
            )
            .eq('user_id', session.user.id);
        if (userDetailsData) {
            const userDetailsTypedData = userDetailsData[0] as unknown as {
                id: number;
                restaurant_id: number;
                user_id: string;
                restaurants: {
                    id: number;
                    name: string;
                    slug: string;
                };
            };
        }
    }

    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);

    const { data: ordersProductsData } = await supabase
        .from('orders_products')
        .select('*')
        .order('created_at', { ascending: false });

    const [
        ordersData,
        products,
        clients,
        contacts,
        addresses,
        cashBoxes,
        additionals,
        selects,
        ordersTablesData,
    ] = await Promise.all([
        getOrdersByRestaurantIdFetch(restaurant.id),
        getProductsByRestaurantIdFetch(restaurant.id),
        getclientsFetch(),
        getContactsFetch(),
        getAddressesFetch(),
        getCashBoxesByRestaurantIdFetch(restaurant.id),
        getAdditionalsByRestaurantIdFetch(restaurant.id),
        getSelectsByRestaurantIdFetch(restaurant.id),
        getOrdersTablesFetch(),
    ]);

    return {
        props: {
            ordersData,
            ordersProductsData,
            products,
            clients,
            contacts,
            addresses,
            cashBoxes,
            additionals,
            selects,
            ordersTablesData,
            restaurant,
        },
    };
}
