import { supabase } from "../../server/api";
import { iAddresses } from "../../types/types";

export async function getAddressesFetch(): Promise<iAddresses["data"]> {
    const { data } = await supabase.from("addresses").select()

    return data!
}