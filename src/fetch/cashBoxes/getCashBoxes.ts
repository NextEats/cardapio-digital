import { supabase } from "../../server/api";
import { iCashBoxes } from "../../types/types";

export async function getCashBoxesFetch(): Promise<iCashBoxes["data"]> {
    const { data } = await supabase.from("cash_boxes").select()

    return data!
}