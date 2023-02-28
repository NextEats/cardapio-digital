import { supabase } from "../../server/api";
import { iCashBoxes } from "../../types/types";

export async function postOpenCashBoxFetch(restaurant_id: number): Promise<iCashBoxes["data"]> {

    const { data } = await supabase.from("cash_boxes").insert({
        is_open: true,
        opened_at: new Date().toISOString(),
        restaurant_id
    }).select("*")

    return data!
}