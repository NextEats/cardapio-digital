import {
  iOrder,
  iOrdersProductsWithFKDataToDelivery,
  iOrdersWithStatusFKData,
  iRestaurant,
} from '@/src/types/types';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { getActiveCashBoxByTheRestaurantID } from '../fetch/cashBoxes/getActiveCashboxByRestaurantId';
import { getOrdersProductsWithFKDataByOrdersIdsFetch } from '../fetch/ordersProducts/getOrdersProductsWithFKDataByOrdersIds';
import { supabase } from '../server/api';

interface iDeliveryPageContext {
  ordersProducts: Array<iOrdersProductsWithFKDataToDelivery> | null;
  orders: iOrdersWithStatusFKData[];
}
interface iDeliveryContextProviderProps {
  children: ReactNode;
  ordersProductsData: Array<iOrdersProductsWithFKDataToDelivery> | null;
  ordersData: iOrdersWithStatusFKData[];
  restaurant: iRestaurant['data'];
}

export const DeliveryPageContext = createContext({} as iDeliveryPageContext);

export default function DeliveryPageContextProvider({
  children,
  ordersProductsData,
  ordersData,
  restaurant,
}: iDeliveryContextProviderProps) {
  const [orders, setOrders] = useState<iOrdersWithStatusFKData[]>([
    ...ordersData,
  ]);
  const [ordersProducts, setOrdersProducts] = useState<
    iOrdersProductsWithFKDataToDelivery[] | null
  >(ordersProductsData);

  useEffect(() => {
    const getOrdersProductsRealTime = async () => {
      const activeCashBox = await getActiveCashBoxByTheRestaurantID(
        restaurant.id
      );

      if (!activeCashBox) {
        return;
      }

      const { data: ordersFromTheActiveCashBox } = await supabase
        .from('orders')
        .select('*, order_status (*), order_types (*), delivery_fees (*)')
        .eq('cash_box_id', activeCashBox.id)
        .returns<iOrdersWithStatusFKData[]>();

      const orders_ids = ordersFromTheActiveCashBox?.map(o => o.id);

      const newOrdersProducts =
        await getOrdersProductsWithFKDataByOrdersIdsFetch({
          ordersIds: orders_ids || [],
        });

      setOrdersProducts([...newOrdersProducts]);
      setOrders([...(ordersFromTheActiveCashBox || [])]);
    };

    const subscription = supabase
      .channel('db-orders')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        payload => {
          if ((payload.new as iOrder['data']).restaurant_id) {
            getOrdersProductsRealTime();
          }
        }
      )
      .subscribe();
  }, [orders]);

  return (
    <DeliveryPageContext.Provider
      value={{
        ordersProducts,
        orders,
      }}
    >
      {children}
    </DeliveryPageContext.Provider>
  );
}
