import { ProductsData } from '@/src/components/admin/Products';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { iRestaurant } from '@/src/types/types';
import { GetStaticPaths, GetStaticProps } from 'next';
import AdminWrapper from '../../../../components/admin/AdminWrapper';

interface iProdcutsProps {
    restaurant: iRestaurant["data"]
}



export default function Prodcuts({
    restaurant
}: iProdcutsProps) {

    return (
        // <AdminWrapper>
        <div className='pt-16 pl-60'>
            <div className='p-5 flex flex-col gap-3'>
                <div className='lg:grid 1xl:grid 1xl:grid-cols-3 gap-3'>
                    <ProductsData />
                    <ProductsData />
                    <ProductsData />
                </div>
                <ProductsData />
            </div>
        </div>
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


    return {
        props: {
            restaurant
        },
        revalidate: 1 * 60
    };
};