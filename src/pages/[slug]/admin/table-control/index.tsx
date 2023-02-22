import AdminWrapper from "@/src/components/admin/AdminWrapper";
import Tables from "@/src/components/admin/Tables/";
import TableContextProvider from "@/src/contexts/TableControlContext";
import { getOrdersByRestaurantIdFetch } from "@/src/fetch/orders/getOrdersByRestaurantId";
import { getProductsByRestaurantIdFetch } from "@/src/fetch/products/getProductsByRestaurantId";
import { getProductsCategoriesByRestaurantIdFetch } from "@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId";
import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";
import { iOrdersWithFKData, iProductCategories, iProducts, iRestaurantWithFKData } from "@/src/types/types";
import { GetServerSideProps } from "next";

interface iAdminHomePageProps {
    restaurant: iRestaurantWithFKData
    products: iProducts["data"]
    categories: iProductCategories["data"]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const restaurant = await getRestaurantBySlugFetch(context.query.slug);
    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);

    return {
        props: {
            restaurant,
            products: await getProductsByRestaurantIdFetch(restaurant.id),
            categories: await getProductsCategoriesByRestaurantIdFetch(restaurant.id),
        },
    };
};

export default function TableControl({
    restaurant,
    products,
    categories
}: iAdminHomePageProps) {
    return (
        <AdminWrapper>
            <TableContextProvider products={products} categories={categories} restaurant={restaurant}>
                <div className="flex flex-col gap-8">

                    <Tables />

                </div>
            </TableContextProvider>
        </AdminWrapper>
    );
}
