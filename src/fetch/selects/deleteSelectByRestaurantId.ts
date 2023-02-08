import { supabase } from "../../server/api";

export async function deleteSelectByRestaurantIdFetch(restaurant_id: number | undefined): Promise<number> {
    const { status } = await supabase.from("selects").delete().eq("restaurant_id", restaurant_id)

    return status
}