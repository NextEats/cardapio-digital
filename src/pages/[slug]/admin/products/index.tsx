import { ProductsData } from '@/src/components/admin/ProductsData';
import { CategoryCard } from '@/src/components/admin/ProductsData/CategoryCard';
import ProductContextProvider from '@/src/contexts/ProductContext';
import { getProductsByRestaurantIdFetch } from '@/src/fetch/products/getProductsByRestaurantId';
import { getProductWithFKDataByRestaurantIdFetch } from '@/src/fetch/products/getProductWithFKDataByRestaurantId';
import { getProductsCategoriesByRestaurantIdFetch } from '@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { supabase } from '@/src/server/api';
import { iProductCategories, iProducts, iProductsWithFKData, iRestaurant } from '@/src/types/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import AdminWrapper from '../../../../components/admin/AdminWrapper';

interface iProdcutsProps {
    restaurant: iRestaurant["data"]
    products: iProductsWithFKData[]
    categories: iProductCategories["data"]
}



export default function Prodcuts({
    restaurant,
    products,
    categories
}: iProdcutsProps) {

    return (
        // <AdminWrapper>
        <ProductContextProvider
            products={products}
            restaurant={restaurant}
            categories={categories}
        >
            <div className='pt-16 pl-60'>
                <div className='p-5 flex flex-col gap-3'>
                    <div className='lg:flex lg:flex-wrap 1xl:grid 1xl:grid-cols-3 gap-3'>
                        {/* <CategoryCard />
                    <ProductsData styles='mb-3 lg:mb-0 flex-1 flex flex-1 flex ' />

                <ProductsData styles='basis-full' /> */}

                    </div>
                    <ProductsData styles='w-full' />
                </div>
            </div>
        </ProductContextProvider>
        // </AdminWrapper>
    );
}


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: true,
    }
}

export const getStaticProps: GetStaticProps<iProdcutsProps, { slug: string }> = async ({ params }) => {
    const restaurantSlug = params?.slug
    const restaurant = await getRestaurantBySlugFetch(restaurantSlug);

    const [products] = await Promise.all([
        getProductWithFKDataByRestaurantIdFetch({ restaurantId: restaurant.id }),
    ])

    const categories = products.reduce((acc: iProductCategories["data"], item: iProductsWithFKData) => {
        const newCategory = item.category_id;
        if (acc.some(c => c.id === newCategory?.id)) return acc;
        return [...acc, newCategory];
    }, []);


    return {
        props: {
            restaurant,
            products,
            categories
        },
        revalidate: 1 * 60
    };
};