import { supabase } from "../../server/api";
import { IAdditionalsData, iCashBoxes, iOrders, iOrdersProducts } from "../../types/types";
import { Json } from "../../types/supabase";

export async function postOrderProductFetch(
    product_id: number,
    order_id: number,
    observation: string,
    selects_data: Json,
    additionals_data?: Json,
): Promise<iOrdersProducts["data"]> {

    const { data, error } = await supabase.from("orders_products").insert({
        product_id,
        order_id,
        observation,
        additionals_data,
        selects_data,
    }).select("*")
    console.log(error)
    return data!
}