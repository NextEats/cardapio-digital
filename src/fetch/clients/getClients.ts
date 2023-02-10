import { supabase } from "../../server/api";
import { iClients } from "../../types/types";

export async function getclientsFetch(): Promise<iClients["data"]> {
    const { data } = await supabase.from("clients").select()

    return data!
}