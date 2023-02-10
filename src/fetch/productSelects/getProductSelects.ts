import { supabase } from "../../server/api";
import { iProductSelects } from "../../types/types";

export async function getProductSelectsFetch(): Promise<iProductSelects["data"]> {
    const { data } = await supabase.from("product_selects").select()

    return data!
}