import { supabase } from "../../server/api";
import { iInsertTable, iTables } from "../../types/types";

export async function postTableFetch({ restaurant_id, chair_ammount }: iInsertTable["data"]): Promise<iTables["data"]> {
    const { data } = await supabase.from("tables").insert({
        restaurant_id,
        chair_ammount,
        is_active: false,
        is_occupied: false,
        is_reserved: false,
    }).select("*")

    return data!
}