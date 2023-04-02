// ...imports...

import { supabase } from '../server/api';
import { getAdditionalsByRestaurantIdFetch } from './additionals/getAdditionals';
import { getAddressesFetch } from './addresses/getAddresses';
import { getCashBoxesByRestaurantIdFetch } from './cashBoxes/getCashBoxesByRestaurantId';
import { getContactsFetch } from './contacts/getContacts';
import { getOrdersByRestaurantIdFetch } from './orders/getOrdersByRestaurantId';
import { getOrdersTablesFetch } from './ordersTables/getOrdersTables';
import { getProductsByRestaurantIdFetch } from './products/getProductsByRestaurantId';
import { getSelectsByRestaurantIdFetch } from './selects/getSelectsByRestaurantId';

export const getRestaurantResources = async (restaurantId: number) => {
    const [
        ordersData,
        products,
        contacts,
        addresses,
        cashBoxes,
        additionals,
        selects,
        ordersTablesData,
    ] = await Promise.all([
        getOrdersByRestaurantIdFetch(restaurantId),
        getProductsByRestaurantIdFetch(restaurantId),
        getContactsFetch(),
        getAddressesFetch(),
        getCashBoxesByRestaurantIdFetch(restaurantId),
        getAdditionalsByRestaurantIdFetch(restaurantId),
        getSelectsByRestaurantIdFetch(restaurantId),
        getOrdersTablesFetch(),
    ]);

    const { data: ordersProductsData } = await supabase
        .from('orders_products')
        .select('*')
        .order('created_at', { ascending: false });

    return {
        ordersProductsData,
        ordersData,
        products,
        contacts,
        addresses,
        cashBoxes,
        additionals,
        selects,
        ordersTablesData,
    };
};
