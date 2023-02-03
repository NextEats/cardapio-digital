import { PostgrestResponse } from '@supabase/supabase-js';
import { toast } from 'react-toastify';

export function supaBaseSuccess(data: PostgrestResponse<undefined>) {
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: data });
            }, 1000);
        });
    };
    toast.promise(
        fetchData,
        {
            pending: 'Promise is pending',
            success: 'Promise resolved 👌',
            error: 'Promise rejected 🤯'
        }
    )
}
export function supabaseError(message: string) {
    toast.loading(message);
}