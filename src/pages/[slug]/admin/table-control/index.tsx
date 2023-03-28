import AdminWrapper from '@/src/components/admin/AdminWrapper';
import Tables from '@/src/components/admin/Tables/';
import TableContextProvider from '@/src/contexts/TableControlContext';
import { getAdditionalsByRestaurantIdFetch } from '@/src/fetch/additionals/getAdditionals';
import { getCashBoxesByRestaurantIdFetch } from '@/src/fetch/cashBoxes/getCashBoxesByRestaurantId';
import { getOrdersByRestaurantIdFetch } from '@/src/fetch/orders/getOrdersByRestaurantId';
import { getOrdersProductsFetch } from '@/src/fetch/ordersProducts/getOrdersProducts';
import { getOrdersTablesFetch } from '@/src/fetch/ordersTables/getOrdersTables';
import { getPaymentMethodsRestaurantsByRestaurantIdFetch } from '@/src/fetch/paymentMethodsRestaurants/getPaymentMethodsRestaurantsByRestaurantId';
import { getProductAdditionalsFetch } from '@/src/fetch/productAdditionals/getProductAdditionals';
import { getProductOptionsFetch } from '@/src/fetch/productOptions/getProductOptions';
import { getProductsByRestaurantIdFetch } from '@/src/fetch/products/getProductsByRestaurantId';
import { getProductsCategoriesByRestaurantIdFetch } from '@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId';
import { getRestaurantBySlugFetch } from '@/src/fetch/restaurant/getRestaurantBySlug';
import { getSelectsByRestaurantIdFetch } from '@/src/fetch/selects/getSelectsByRestaurantId';
import {
    iAdditionals,
    iCashBoxes,
    iOrders,
    iOrdersProducts,
    iOrdersTablesWithFkData,
    iPaymentMethodsRestaurantsWithFKData,
    iProductAdditionals,
    iProductCategories,
    iProductOptions,
    iProducts,
    iRestaurantWithFKData,
    iSelects,
} from '@/src/types/types';
import { GetServerSideProps } from 'next';

interface iAdminHomePageProps {
    restaurant: iRestaurantWithFKData;
    additionals: iAdditionals['data'];
    productOptions: iProductOptions['data'];
    selects: iSelects['data'];
    productAdditionals: iProductAdditionals['data'];
    products: iProducts['data'];
    ordersProducts: iOrdersProducts['data'];
    orders: iOrders["data"]
    categories: iProductCategories['data'];
    ordersTables: iOrdersTablesWithFkData[];
    cashBoxes: iCashBoxes['data'];
    paymentMethod: iPaymentMethodsRestaurantsWithFKData[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const restaurant = await getRestaurantBySlugFetch(context.query.slug);
    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);

    const { data: ordersProducts } = await supabase
        .from('orders_products')
        .select('*')
        .order('created_at', { ascending: false });

    return {
        props: {
            restaurant,
            additionals: await getAdditionalsByRestaurantIdFetch(restaurant.id),
            productAdditionals: await getProductAdditionalsFetch(),
            products: await getProductsByRestaurantIdFetch(restaurant.id),
            productOptions: await getProductOptionsFetch(),
            selects: await getSelectsByRestaurantIdFetch(restaurant.id),
            ordersProducts: ordersProducts,
            orders: await getOrdersByRestaurantIdFetch(restaurant.id),
            categories: await getProductsCategoriesByRestaurantIdFetch(
                restaurant.id
            ),
            ordersTables: await getOrdersTablesFetch(),
            cashBoxes: await getCashBoxesByRestaurantIdFetch(restaurant.id),
            paymentMethod:
                await getPaymentMethodsRestaurantsByRestaurantIdFetch(
                    restaurant.id
                ),
        },
    };
};

export default function TableControl({
    restaurant,
    products,
    productAdditionals,
    ordersProducts,
    orders,
    categories,
    ordersTables,
    selects,
    productOptions,
    additionals,
    cashBoxes,
    paymentMethod,
}: iAdminHomePageProps) {
    return (
        <AdminWrapper>
            <TableContextProvider
                products={products}
                productAdditionals={productAdditionals}
                selects={selects}
                ordersProducts={ordersProducts}
                orders={orders}
                categories={categories}
                ordersTables={ordersTables}
                restaurant={restaurant}
                additionals={additionals}
                productOptions={productOptions}
                cashBoxes={cashBoxes}
                paymentMethod={paymentMethod}
            >
                <div className="flex flex-col gap-8">
                    <Tables />
                </div>
            </TableContextProvider>
        </AdminWrapper>
    );
}
