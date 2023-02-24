import { supabase } from "../../server/api";

interface iDeleteTable {
    table_id: number | undefined
}

export async function deleteTableFetch({ table_id }: iDeleteTable): Promise<number> {
    const { status } = await supabase.from("tables").delete().eq("id", table_id)

    return status
}
