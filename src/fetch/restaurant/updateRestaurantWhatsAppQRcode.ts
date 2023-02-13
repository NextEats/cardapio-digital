import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";
import { supabase } from "@/src/server/api";

export default async function updateRestaurantWhatsAppQRCode(slug: string) {
  const restaurant = await getRestaurantBySlugFetch(slug);

  // if(restaurant.restaurant_whatsapp_id){

  // } else {

  // }

}
