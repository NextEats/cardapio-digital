import { supabase } from "../../server/api";
import { iAdditionals, iOrders } from "../../types/types";

export async function getAdditionalsFetch(restaurant_id: number | undefined): Promise<iAdditionals["data"]> {
    const { data } = await supabase.from("additionals").select().eq("restaurant_id", restaurant_id)

    return data!
}