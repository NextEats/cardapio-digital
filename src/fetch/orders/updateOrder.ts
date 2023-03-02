import { supabase } from "../../server/api";
import { iOrder } from "../../types/types";

export async function updateOrderFetch(
    { order_id, order_status_id }: {
        order_status_id: number,
        order_id: number,
    }
): Promise<iOrder["data"]> {
    // console.log()
    const { data } = await supabase.from("orders").update({
        order_status_id,
    }).eq("id", order_id).select("*")

    return data![0] as unknown as iOrder["data"];
}