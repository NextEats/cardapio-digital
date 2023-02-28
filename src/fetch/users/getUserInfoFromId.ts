import { supabase } from '@/src/server/api';
import { iUserDetails } from '@/src/types/types';

export async function getUserInfoFromId(id: string | undefined) {
    const { data, error } = await supabase
        .from('user_details')
        .select('*')
        .eq('id', id);

    if (error || !data) {
        throw new Error(error.message);
    }

    return data[0] as iUserDetails['data'];
}
