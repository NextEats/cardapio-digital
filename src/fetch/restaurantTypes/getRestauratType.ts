import { supabase } from "../../server/api";
import { iRestaurantTypes } from "../../types/types";

export async function getRestauratTypeFetch(id: number): Promise<iRestaurantTypes["data"]> {
    const { data } = await supabase.from("restaurant_types").select().eq("id", id)

    return data!
}