import { supabase } from "../../server/api";
import { iProductAdditionals, iProductOptions } from "../../types/types";

export async function getProductAdditionalsFetch(): Promise<iProductAdditionals["data"]> {
    const { data } = await supabase.from("product_additionals").select()

    return data!
}