import { supabase } from "../../server/api";
import { iOrders, iOrdersProducts, iOrdersStatus, iOrderStatus, iProductCategories, iProducts } from "../../types/types";

export async function getProductsCategoriesByRestaurantIdFetch(restaurant_id: number): Promise<iProductCategories["data"]> {
    const { data } = await supabase.from("product_categories").select().eq("restaurant_id", restaurant_id)

    return data!
}