import { useEffect, useState } from 'react';
import { supabase } from '../server/api';
import { Database } from '../types/supabase';

export default function useProductDataForId(id: number) {
    const [data, setData] =
        useState<Database['public']['Tables']['products']['Row']>();

    useEffect(() => {
        async function fetchData() {
            const { data: products, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id);

            setData(
                products![0] as unknown as Database['public']['Tables']['products']['Row']
            );
        }

        fetchData();
    }, [id]);

    return data;
}
