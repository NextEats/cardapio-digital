import { PostgrestResponse } from '@supabase/supabase-js';
import { toast } from 'react-toastify';

interface iPromiseAlert {
    pending: string,
    success: string,
    error: string,
    data: PostgrestResponse<any>
}

export function promiseAlert({ data, error, pending, success }: iPromiseAlert) {
    const fetchData = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ data: data });
            }, 1500);
        });
    };
    toast.promise(
        fetchData,
        {
            pending,
            success,
            error,
        }
    )
}
export function supabaseError(message: string) {
    toast.loading(message);
}