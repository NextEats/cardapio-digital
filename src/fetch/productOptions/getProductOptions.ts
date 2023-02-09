import { supabase } from "../../server/api";
import { iProductOptions } from "../../types/types";

export async function getProductOptionsFetch(): Promise<iProductOptions["data"]> {
    const { data } = await supabase.from("product_options").select()

    return data!
}