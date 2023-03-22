import { supabase } from "../server/api";

export const getImagePublicUrl = (pathOrName: string) => {
    const publicUrl = supabase
    .storage
    .from('restaurant-pictures')
    .getPublicUrl(pathOrName)

    return publicUrl
}
