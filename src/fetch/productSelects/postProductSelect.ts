import { supabase } from "../../server/api";
import { iInsertSelect, iInsertSelects } from "../../types/types";

export async function postSelectFetch({ name, restaurant_id }: iInsertSelect["data"]): Promise<iInsertSelects["data"]> {
    const { data } = await supabase.from("selects").insert({
        name, restaurant_id
    }).select("*")

    return data!
}