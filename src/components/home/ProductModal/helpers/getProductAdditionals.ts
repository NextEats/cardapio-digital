import { supabase } from '../../../../server/api';
import { iAdditional } from '../../../../types/types';

export interface iProductAdditional {
    additional_id: number;
    additionals: iAdditional['data'];
}

export async function getProductAdditionals(productId: number) {
    const productAdditionals = await supabase
        .from('product_additionals')
        .select(
            `
    additional_id,
        additionals (*)
    `
        )
        .eq('product_id', productId);

    if (!productAdditionals.data || productAdditionals.error) {
        return;
    }

    return productAdditionals.data;
}
