import { supabase } from "../../server/api";
import { iAdditionals, iInsertAdditional, iOrders } from "../../types/types";

export async function updateAdditionalsFetch({ name, picture_url, price, restaurant_id, id }: iInsertAdditional["data"]): Promise<iAdditionals["data"]> {
    const { data } = await supabase.from("additionals").update({
        name, picture_url, price
    }).eq("id", id).select("*")

    return data!
}