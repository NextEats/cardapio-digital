import { supabase } from '../../server/api';

export async function getProductWithFKData(selectedProduct: any) {
    const { data: productData } = await supabase
        .from('products')
        .select()
        .match({ is_deleted: false, id: selectedProduct?.state });

    const product = productData![0] as any;

    return product;
}
