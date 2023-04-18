import { createContext, ReactNode } from 'react';
import {
  iOrder,
  iOrdersProductsWithFKProducdData,
  iRestaurant,
} from '../types/types';

interface iDeliveryPageContextProps {
  restaurant: iRestaurant['data'];
  orders_products: iOrdersProductsWithFKProducdData[];
  order: iOrder['data'];
}
interface iDeliveryContextProviderProps {
  children: ReactNode;
  restaurant: iRestaurant['data'];
  orders_products: iOrdersProductsWithFKProducdData[];
  order: iOrder['data'];
}

export const DeliveryPageContext = createContext(
  {} as iDeliveryPageContextProps
);

export default function DeliveryPageContextProvider({
  children,
  restaurant,
  orders_products,
  order,
}: iDeliveryContextProviderProps) {
  return (
    <DeliveryPageContext.Provider
      value={{
        restaurant,
        orders_products,
        order,
      }}
    >
      {children}
    </DeliveryPageContext.Provider>
  );
}
