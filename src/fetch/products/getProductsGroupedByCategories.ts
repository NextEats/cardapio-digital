import { ProductWithCategory } from '../../types/types';
import { supabase } from './../../server/api';

export async function getProductsGroupedByCategories(restaurantId: number) {
    const categoryMap = await getCategoryMap(restaurantId);
    if (!categoryMap) {
        return [];
    }

    const products = await getProducts(restaurantId);
    if (!products) {
        return [];
    }

    const groupedProducts = groupProductsByCategory(categoryMap, products);

    // Convert object to array and sort by category_order
    const sortedProducts = Object.values(groupedProducts).sort(
        (a: any, b: any) => a.category_order - b.category_order
    );

    // Flatten the array of products
    const flatProducts = sortedProducts.reduce(
        (acc: ProductWithCategory[], category: any) =>
            acc.concat(category.products),
        []
    );

    console.log(flatProducts);

    return flatProducts;
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
    return products.reduce((acc: any, product: any) => {
        if (!acc[product.category_id]) {
            acc[product.category_id] = {
                category_name: categoryMap.get(product.category_id) || '',
                category_order: product.category_order,
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
