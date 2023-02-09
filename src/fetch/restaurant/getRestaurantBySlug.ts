import { supabase } from "../../server/api";
import { iRestaurants } from "../../types/types";

export async function getRestaurantBySlugFetch(slug: string | string[] | undefined): Promise<iRestaurants["data"]> {
    const { data } = await supabase.from("restaurants").select().eq("slug", slug)

    return data!
}