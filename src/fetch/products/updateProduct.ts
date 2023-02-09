import { supabase } from "../../server/api";
import { iAdditionals, iInsertAdditional, iInsertProduct, iInsertSelect, iOrders, iProducts, iSelects } from "../../types/types";

export async function updateSelectFetch({ name, description, picture_url, category_id, price, id }: iInsertProduct["data"]): Promise<iProducts["data"]> {
    const { data } = await supabase.from("products").update({
        name, category_id, description, picture_url, price
    }).eq("id", id).select("*")

    return data!
}