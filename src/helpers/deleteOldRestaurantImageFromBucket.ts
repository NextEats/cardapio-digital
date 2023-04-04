import { supabase } from "../server/api";

export async function deleteOldRestaurantImageFromBucket(oldImageName : string | undefined) {
    await supabase
    .storage
    .from('restaurant-pictures')
    .remove([`${oldImageName}`]);
}