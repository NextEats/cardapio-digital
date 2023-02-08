import { supabase } from "../../server/api";

export async function deleteAdditionalByRestaurantIdFetch(restaurant_id: number | undefined): Promise<number> {
    const { status } = await supabase.from("additionals").delete().eq("restaurant_id", restaurant_id)

    return status
}