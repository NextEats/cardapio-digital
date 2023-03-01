import { supabase } from "../../server/api";
import { iInsertTables, iOrdersTables } from "../../types/types";

interface iUpdateOrdertable {
    has_been_paid: boolean
    order_table_id: number
}

export async function updateOrderTableFetch({ has_been_paid, order_table_id }: iUpdateOrdertable): Promise<iOrdersTables["data"]> {
    const { data } = await supabase.from("orders_tables").update({
        has_been_paid,
    }).eq("id", order_table_id).select("*")

    return data!
}