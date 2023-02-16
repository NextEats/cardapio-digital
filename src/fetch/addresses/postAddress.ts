import { supabase } from "../../server/api";
import { iAddresses, iCashBoxes, iClients, iOrders } from "../../types/types";

export async function postAddressFetch(
    cep: string,
    number: number,
    complement: string,
    google_maps_link: string,
    reference_point: string,
): Promise<iAddresses["data"]> {

    const { data } = await supabase.from("addresses").insert({
        cep,
        number,
        complement,
        google_maps_link,
        reference_point,
    }).select("*")

    return data!
}