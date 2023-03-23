import { supabase } from "@/src/server/api";
import { getRestaurantBySlugFetch } from "./getRestaurantBySlug";

export async function updateRestaurant(pictureUrl: string, data: any, id: any) {
    await supabase
        .from('restaurants')
        .update({
            name: data.name,
            slug: data.slug,
            picture_url: pictureUrl,
        })
        .eq('id', id);

        const newRestaurant = await getRestaurantBySlugFetch(data?.slug)
        return newRestaurant.picture_url
}