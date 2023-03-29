import { supabase } from '@/src/server/api';
import { iOrdersTablesWithFkData } from '@/src/types/types';

export async function getOrdersTablesFetch(): Promise<
    iOrdersTablesWithFkData[]
> {
    const { data } = await supabase
        .from('orders_tables')
        .select(
            `
            id,
            has_been_paid,
            orders (
                id,
                order_status (
                    id, 
                    status_name
                )
            ),
            tables (
                id,
                restaurant_id,
                is_reserved,
                is_active,
                is_occupied,
                chair_ammount,
                name
            )
    `
        )
        .order('created_at', { ascending: false });

    return data! as unknown as iOrdersTablesWithFkData[];
}
