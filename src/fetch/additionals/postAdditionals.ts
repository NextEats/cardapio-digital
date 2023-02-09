import { supabase } from "../../server/api";
import { iAdditionals, iInsertAdditional, iInsertAdditionals } from "../../types/types";

export async function postAdditionalFetch({ name, picture_url, price, restaurant_id }: iInsertAdditional["data"]): Promise<iInsertAdditionals["data"]> {
    const { data } = await supabase.from("additionals").insert({
        name, picture_url, price, restaurant_id
    }).select("*")

    return data!
}