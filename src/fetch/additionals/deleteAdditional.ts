import { supabase } from "../../server/api";

export async function deleteAdditionalFetch(id: number | undefined): Promise<number> {
    const { status } = await supabase.from("additionals").delete().eq("restaurant_id", id)

    return status
}