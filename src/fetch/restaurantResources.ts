import { supabase } from '../server/api';
import { getAdditionalsByRestaurantIdFetch } from './additionals/getAdditionals';
import { getCashBoxesByRestaurantIdFetch } from './cashBoxes/getCashBoxesByRestaurantId';
import { getOrdersByRestaurantIdFetch } from './orders/getOrdersByRestaurantId';
import { getOrdersTablesFetch } from './ordersTables/getOrdersTables';
import { getProductsByRestaurantIdFetch } from './products/getProductsByRestaurantId';
import { getSelectsByRestaurantIdFetch } from './selects/getSelectsByRestaurantId';

export const getRestaurantResources = async (restaurantId: number) => {
  const [
    ordersData,
    products,
    cashBoxes,
    additionals,
    selects,
    ordersTablesData,
  ] = await Promise.all([
    getOrdersByRestaurantIdFetch(restaurantId),
    getProductsByRestaurantIdFetch(restaurantId),
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
    cashBoxes,
    additionals,
    selects,
    ordersTablesData,
  };
};
