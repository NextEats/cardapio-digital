import { supabase } from "../../server/api";
import { iOrders, iOrdersStatus, iOrderStatus, iProducts } from "../../types/types";

export async function getOrderStatusFetch(): Promise<iOrdersStatus["data"]> {
    const { data } = await supabase.from("order_status").select()

    return data!
}