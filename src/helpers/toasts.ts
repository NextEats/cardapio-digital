import { toast } from 'react-toastify';

export function supaBaseSuccess(message: string, promise: Promise<void>) {
    // function ptomise() {
    //     return new Promise((resolve) =>  )
    // }
    toast.promise(
        promise,
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