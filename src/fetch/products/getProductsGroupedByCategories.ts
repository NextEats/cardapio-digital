import { iGroupedProducts, ProductWithCategory } from '../../types/types';
import { supabase } from './../../server/api';

export async function getProductsGroupedByCategories(restaurantId: number) {
    const categoryMap = await getCategoryMap(restaurantId);
    if (!categoryMap) {
        return;
    }


    const products = await getProducts(restaurantId);
    if (!products) {
        return;
    }

    return groupProductsByCategory(categoryMap, products);
}

async function getCategoryMap(restaurantId: number) {
    try {
        const res = await supabase
            .from('product_categories')
            .select('id, name, category_order')
            .eq('restaurant_id', restaurantId);
        if (!res.data) {
            return;
        }

        const categoryMap = new Map<number, string>();
        for (const category of res.data) {
            categoryMap.set(category.id, category.name);
        }

        return categoryMap;
    } catch (error: any) {
        throw new error(error);
    }
}

async function getProducts(restaurantId: number) {
    try {
        const res = await supabase
            .from('products')
            .select('*')
            .eq('restaurant_id', restaurantId);
        if (!res.data) {
            return;
        }

        return res.data;
    } catch (error: any) {
        throw new error(error);
    }
}

function groupProductsByCategory(
    categoryMap: Map<number, string>,
    products: any
) {
    return products.reduce((acc: iGroupedProducts, product: any) => {
        if (!acc[product.category_id]) {
            acc[product.category_id] = {
                category_name: categoryMap.get(product.category_id) || '',
                products: [],
            };
        }

        const productWithCategory: ProductWithCategory = {
            ...product,
            category_name: acc[product.category_id].category_name,
        };
        acc[product.category_id].products.push(productWithCategory);

        return acc;
    }, {});
}
