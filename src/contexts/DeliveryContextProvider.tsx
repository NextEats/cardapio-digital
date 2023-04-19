import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersWithStatusFKData,
} from '@/src/types/types';
import { createContext, ReactNode } from 'react';

interface iDeliveryPageContextProps {
  ordersProducts: Array<iOrdersProductsWithFKDataToDelivery> | null;
  orders: iOrdersWithStatusFKData[];
}
interface iDeliveryContextProvider extends iDeliveryPageContextProps {
  children: ReactNode;
}

export const DeliveryPageContext = createContext(
  {} as iDeliveryPageContextProps
);

export default function DeliveryPageContextProvider({
  children,
  ordersProducts,
  orders,
}: iDeliveryContextProvider) {
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
