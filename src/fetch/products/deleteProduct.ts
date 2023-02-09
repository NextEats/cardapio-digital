import { supabase } from "../../server/api";

export async function deleteProductFetch(id: number | undefined): Promise<number> {
    const { status } = await supabase.from("products").delete().eq("id", id)

    return status
}