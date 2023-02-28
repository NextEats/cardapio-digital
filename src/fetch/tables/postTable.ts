import { supabase } from "../../server/api";
import { iInsertTable, iTables } from "../../types/types";

export async function postTableFetch({ restaurant_id, chair_ammount, name }: iInsertTable["data"]): Promise<iTables["data"]> {
    console.log(restaurant_id,
        name,
        chair_ammount,)
    const { data } = await supabase.from("tables").insert({
        restaurant_id,
        name,
        chair_ammount,
        is_active: false,
        is_occupied: false,
        is_reserved: false,
    }).select("*")

    return data!
}