import { supabase } from "../../server/api";
import { iCashBoxes } from "../../types/types";
import { getCashBoxesByRestaurantIdFetch } from "./getCashBoxesByRestaurantId";

export async function postCloseCashBoxFetch(restaurant_id: number): Promise<iCashBoxes["data"]> {
    const cashBoxes = await getCashBoxesByRestaurantIdFetch(restaurant_id)
    const findCashBox = cashBoxes.find(c => c.is_open === true)
    if (findCashBox === undefined) {
        return []
    }
    const { data } = await supabase.from("cash_boxes").update({
        is_open: false,
        closed_at: new Date().toISOString(),
    }).eq("id", findCashBox.id).select("*")

    return data!
}