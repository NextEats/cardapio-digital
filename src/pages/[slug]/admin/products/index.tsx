import { ProductsData } from '@/src/components/admin/ProductsData';
import ProductContextProvider from '@/src/contexts/ProductContext';
import { getAdditionalsByRestaurantIdFetch } from '@/src/fetch/additionals/getAdditionals';
import { getProductAdditionalsFetch } from '@/src/fetch/productAdditionals/getProductAdditionals';
import { getProductOptionsFetch } from '@/src/fetch/productOptions/getProductOptions';
import { getProductWithFKDataByRestaurantIdFetch } from '@/src/fetch/products/getProductWithFKDataByRestaurantId';
import { getProductsCategoriesByRestaurantIdFetch } from '@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { getSelectsByRestaurantIdFetch } from '@/src/fetch/selects/getSelectsByRestaurantId';
import { supabase } from '@/src/server/api';
import { iAdditionalCategories, iAdditionals, iProductCategories, iProductOptions, iProductsWithFKData, iRestaurant, iSelects } from '@/src/types/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import { ToastContainer } from 'react-toastify';

interface iProdcutsProps {
    restaurant: iRestaurant["data"]
    products: iProductsWithFKData[]
    categories: iProductCategories["data"]
    additionals: iAdditionals["data"]
    selects: iSelects["data"]
    additional_categories: iAdditionalCategories["data"]
    product_options: iProductOptions["data"]
}



export default function Prodcuts({
    restaurant,
    products,
    categories,
    additionals,
    selects,
    additional_categories,
    product_options,
}: iProdcutsProps) {

    return (
        // <AdminWrapper>
        <ProductContextProvider
            products={products}
            restaurant={restaurant}
            categories={categories}
            additionalsData={additionals}
            selectsData={selects}
            additional_categories={additional_categories}
            product_optionsData={product_options}
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
    const [additionals, products, categories, selects, additional_categories, product_options] = await Promise.all([
        getAdditionalsByRestaurantIdFetch(restaurant.id),
        getProductWithFKDataByRestaurantIdFetch({ restaurantId: restaurant.id }),
        getProductsCategoriesByRestaurantIdFetch(restaurant.id),
        getSelectsByRestaurantIdFetch(restaurant.id),
        supabase.from("additional_categories").select("*").eq("restaurant_id", restaurant.id),
        getProductOptionsFetch(),
    ])

    return {
        props: {
            restaurant,
            products,
            categories: categories ? categories : [],
            additionals,
            selects,
            additional_categories: additional_categories.data ? additional_categories.data : [],
            product_options,
        },
        revalidate: 1 * 60
    };
};