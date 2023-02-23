import AdminWrapper from "@/src/components/admin/AdminWrapper";
import Tables from "@/src/components/admin/Tables/";
import TableContextProvider from "@/src/contexts/TableControlContext";
import { getProductOptionsFetch } from "@/src/fetch/productOptions/getProductOptions";
import { getOrdersProductsFetch } from "@/src/fetch/ordersProducts/getOrdersProducts";
import { getOrdersTablesFetch } from "@/src/fetch/ordersTables/getOrdersTables";
import { getProductsByRestaurantIdFetch } from "@/src/fetch/products/getProductsByRestaurantId";
import { getProductsCategoriesByRestaurantIdFetch } from "@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId";
import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";
import { getSelectsByRestaurantIdFetch } from "@/src/fetch/selects/getSelectsByRestaurantId";
import { iAdditionals, iOrdersProducts, iOrdersTablesWithFkData, iOrdersWithFKData, iProductCategories, iProductOptions, iProducts, iRestaurantWithFKData, iSelects } from "@/src/types/types";
import { GetServerSideProps } from "next";
import getAdditionalsByRestaurantId from "@/src/pages/api/additionals/[restaurant_id]";
import { getAdditionalsByRestaurantIdFetch } from "@/src/fetch/additionals/getAdditionals";
import { MdOutlineWifiProtectedSetup } from "react-icons/md";

interface iAdminHomePageProps {
    restaurant: iRestaurantWithFKData
    additionals: iAdditionals["data"]
    productOptions: iProductOptions["data"]
    selects: iSelects["data"]
    products: iProducts["data"]
    ordersProducts: iOrdersProducts["data"]
    categories: iProductCategories["data"]
    ordersTables: iOrdersTablesWithFkData[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const restaurant = await getRestaurantBySlugFetch(context.query.slug);
    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);

    return {
        props: {
            restaurant,
            additionals: await getAdditionalsByRestaurantIdFetch(restaurant.id),
            products: await getProductsByRestaurantIdFetch(restaurant.id),
            productOptions: await getProductOptionsFetch(),
            selects: await getSelectsByRestaurantIdFetch(restaurant.id),
            ordersProducts: await getOrdersProductsFetch(),
            categories: await getProductsCategoriesByRestaurantIdFetch(restaurant.id),
            ordersTables: await getOrdersTablesFetch()
        },
    };
};

export default function TableControl({
    restaurant,
    products,
    ordersProducts,
    categories,
    ordersTables,
    selects,
    productOptions,
    additionals
}: iAdminHomePageProps) {
    return (
        <AdminWrapper>
            <TableContextProvider
                products={products}
                selects={selects}
                ordersProducts={ordersProducts}
                categories={categories}
                ordersTables={ordersTables}
                restaurant={restaurant}
                additionals={additionals}
                productOptions={productOptions}
            >
                <div className="flex flex-col gap-8">

                    <Tables />

                </div>
            </TableContextProvider>
        </AdminWrapper>
    );
}
