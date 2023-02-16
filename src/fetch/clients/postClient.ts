import { supabase } from "../../server/api";
import { iCashBoxes, iClients, iOrders } from "../../types/types";

export async function postClientFetch(address_id: number, name: string, contact_id: number,): Promise<iClients["data"]> {

    const { data } = await supabase.from("clients").insert({
        address_id,
        name,
        contact_id,
    }).select("*")

    return data!
}