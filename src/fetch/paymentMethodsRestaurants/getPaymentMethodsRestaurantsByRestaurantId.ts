import { supabase } from "../../server/api";
import { iPaymentMethodsRestaurantss } from "../../types/types";

export async function getPaymentMethodsRestaurantsByRestaurantIdFetch(restaurant_id: number | undefined): Promise<iPaymentMethodsRestaurantss["data"]> {
    const { data } = await supabase.from("payment_methods_restaurants").select().eq("restaurant_id", restaurant_id)

    return data!
}