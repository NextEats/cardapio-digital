import { useEffect, useState } from 'react';
import { supabase } from '../server/api';
import { Database } from '../types/supabase';

export default function useAllPaymentMethods() {
    const [data, setData] =
        useState<
            Array<Database['public']['Tables']['payment_methods']['Row']>
        >();

    useEffect(() => {
        async function fetchData() {
            const { data: paymentMethods, error } = await supabase
                .from('payment_methods')
                .select('*');

            setData(
                paymentMethods as unknown as Array<
                    Database['public']['Tables']['payment_methods']['Row']
                >
            );
        }

        fetchData();
    }, []);

    return data;
}
