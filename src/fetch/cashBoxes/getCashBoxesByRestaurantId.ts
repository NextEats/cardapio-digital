import { supabase } from "../../server/api";
import { iCashBoxes } from "../../types/types";

export async function getCashBoxesByRestaurantIdFetch(restaurant_id: number): Promise<iCashBoxes["data"]> {
    const { data } = await supabase.from("cash_boxes").select().eq("restaurant_id", restaurant_id)

    return data!
}