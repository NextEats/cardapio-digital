import { supabase } from "../../server/api";

export async function deleteSelectFetch(id: number | undefined): Promise<number> {
    const { status } = await supabase.from("selects").delete().eq("id", id)

    return status
}
