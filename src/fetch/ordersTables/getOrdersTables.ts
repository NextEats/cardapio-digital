import { supabase } from "@/src/server/api";
import { iOrdersTables, iOrdersTablesWithFkData, iProducts } from "@/src/types/types";

export async function getOrdersTablesFetch(): Promise<iOrdersTablesWithFkData[]> {
    const { data } = await supabase.from("orders_tables").select(`
    id,
    has_been_paid,
    orders (
        *,
        cash_boxes (
            is_open
        ),
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
    `)
    return data! as unknown as iOrdersTablesWithFkData[];
}
