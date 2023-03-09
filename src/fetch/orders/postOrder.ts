import { supabase } from "../../server/api";
import { iCashBoxes, iOrder } from "../../types/types";

export async function postOrderFetch(
    restaurant_id: number,
    order_type_id: number,
    cash_box_id: number,
    client_id: number,
    order_status_id: number,
    payment_method_id: number,
): Promise<iOrder["data"]> {

    const { data } = await supabase.from("orders").insert({
        order_type_id,
        cash_box_id,
        client_id,
        order_status_id,
        payment_method_id,
        restaurant_id
    }).select("*")

    return data![0] as unknown as iOrder["data"];
}