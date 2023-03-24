import { iProductsWithFKData, iProducts } from '@/src/types/types';
import { supabase } from '../../server/api';

interface iGetProductWithFKDataByRestaurantIdFetch {
    restaurantId: number;
}

export async function getProductWithFKDataByRestaurantIdFetch({ restaurantId }: iGetProductWithFKDataByRestaurantIdFetch): Promise<iProductsWithFKData[]> {
    const { data: productData, error } = await supabase
        .from('products')
        .select('*, category_id ( * )')
        .eq('restaurant_id', restaurantId);

    console.log(productData, error)



    return productData!
}
