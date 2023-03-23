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

        // setImageSrc(pictureUrl)
        const newRestaurant = await getRestaurantBySlugFetch(data?.slug)
        console.log(newRestaurant)
        return newRestaurant.picture_url
        // window.location.reload();
}