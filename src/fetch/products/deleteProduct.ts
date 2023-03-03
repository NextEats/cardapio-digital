import { supabase } from "../../server/api";

export async function deleteProductFetch(id: number | undefined): Promise<number> {
    const { status } = await.delete().eq("id", id)

    return status
}