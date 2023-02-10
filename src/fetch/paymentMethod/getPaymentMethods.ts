import { supabase } from "../../server/api";
import { iPaymentMethods } from "../../types/types";

export async function getPaymentMethodsFetch(): Promise<iPaymentMethods["data"]> {
    const { data } = await supabase.from("payment_methods").select()

    return data!
}