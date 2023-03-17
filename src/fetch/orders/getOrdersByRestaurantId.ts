import { supabase } from '../../server/api';
import { iOrdersWithFKData } from '../../types/types';

export async function getOrdersByRestaurantIdFetch(
    restaurant_id: number | undefined
): Promise<iOrdersWithFKData[]> {
    let { data, error } = await supabase
        .from('orders')
        .select(
            `
            *,
            payment_methods (*),
            order_types (*),
            clients (
                *,
                addresses (*),
                contacts (*)
            ),
            order_status (*),
            delivery_fees (*)
    `
        )
        .eq('restaurant_id', restaurant_id);

    return data! as unknown as iOrdersWithFKData[];
}