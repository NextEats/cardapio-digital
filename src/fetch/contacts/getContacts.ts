import { supabase } from "../../server/api";
import { iContacts, iInsertContacts, iPaymentMethods } from "../../types/types";

export async function getContactsFetch(): Promise<iContacts["data"]> {
    const { data } = await supabase.from("contacts").select()

    return data!
}