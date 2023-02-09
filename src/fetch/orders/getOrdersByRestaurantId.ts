import { supabase } from "../../server/api";
import { iOrders } from "../../types/types";

export async function getOrdersByRestaurantIdFetch(restaurant_id: number | undefined): Promise<iOrders["data"]> {
    const { data } = await supabase.from("orders").select().eq("restaurant_id", restaurant_id)

    return data!
}