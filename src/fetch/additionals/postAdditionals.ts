import { supabase } from "../../server/api";
import {
    iAdditionals,
    iInsertAdditional, iInsertAdditionals
} from "../../types/types";

export async function postAdditionalFetch({ name, picture_url, price, additional_category_id, restaurant_id }: iInsertAdditional["data"]): Promise<iInsertAdditionals["data"]> {
    const { data } = await supabase.from("additionals").insert({
        name, picture_url, price, additional_category_id, restaurant_id
    }).select("*")

    console.log(
        'name', name,
        'picture_url', picture_url,
        'price', price,
        'additional_category_id', additional_category_id,
        'restaurant_id', restaurant_id,
    )

    return data!
}