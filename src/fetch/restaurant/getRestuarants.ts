import { supabase } from "../../server/api";
import { iRestaurants } from "../../types/types";

export async function getRestaurants(): Promise<iRestaurants["data"]> {
    const { data } = await supabase.from("restaurants").select()

    return data!
}