import { supabase } from "../../server/api";
import { iSelects } from "../../types/types";

export async function getSelectsByRestaurantIdFetch(restaurant_id: number | undefined): Promise<iSelects["data"]> {
    const { data } = await supabase.from("selects").select().eq("restaurant_id", restaurant_id)

    return data!
}