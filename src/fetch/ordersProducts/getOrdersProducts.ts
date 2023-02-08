import { supabase } from "../../server/api";
import { iOrdersProducts } from "../../types/types";

export async function getOrdersProductsFetch(): Promise<iOrdersProducts["data"]> {
    const { data } = await supabase.from("orders_products").select()

    return data!
}