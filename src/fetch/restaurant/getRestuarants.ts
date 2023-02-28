import { supabase } from "../../server/api";
import { iRestaurants } from "../../types/types";

export async function getRestaurantsFetch(): Promise<iRestaurants["data"]> {
    const { data } = await supabase.from("restaurants").select()

    return data!
}