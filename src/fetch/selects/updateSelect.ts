import { supabase } from "../../server/api";
import { iAdditionals, iInsertAdditional, iInsertSelect, iOrders, iSelects } from "../../types/types";

export async function updateSelectFetch({ name, restaurant_id, id }: iInsertSelect["data"]): Promise<iSelects["data"]> {
    const { data } = await supabase.from("selects").update({
        name, restaurant_id
    }).eq("id", id).select("*")

    return data!
}