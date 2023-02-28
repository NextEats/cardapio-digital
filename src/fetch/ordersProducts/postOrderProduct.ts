import { supabase } from "../../server/api";
import { iCashBoxes, iOrders, iOrdersProducts } from "../../types/types";

export async function postOrderProductFetch(
    product_id: number,
    order_id: number,
    observation: string
): Promise<iOrdersProducts["data"]> {

    const { data } = await supabase.from("orders_products").insert({
        product_id,
        order_id,
        observation,
    }).select("*")

    return data!
}