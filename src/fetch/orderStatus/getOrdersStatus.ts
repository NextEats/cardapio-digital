import { supabase } from "../../server/api";
import { iOrdersStatus } from "../../types/types";

export async function getOrderStatusFetch(): Promise<iOrdersStatus["data"]> {
    const { data } = await supabase.from("order_status").select()

    return data!
}