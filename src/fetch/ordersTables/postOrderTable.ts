import { supabase } from "../../server/api";
import { iInsertOrdersTables } from "../../types/types";

interface iPostOrdertable {
    restaurant_id: number
    order_id: number,
    table_id: number,
}

export async function postOrderTableFetch({ order_id, restaurant_id, table_id }: iPostOrdertable): Promise<iInsertOrdersTables["data"]> {
    const { data } = await supabase.from("orders_tables").insert({
        order_id,
        table_id,
    }).select("*")

    return data!
}