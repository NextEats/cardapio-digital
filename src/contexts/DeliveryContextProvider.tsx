import { iOrders, iOrdersProductsView } from '@/src/types/types';
import { ReactNode, createContext } from 'react';

interface iDeliveryPageContextProps {
  ordersProducts: Array<iOrdersProductsView['data']> | null;
  orders: iOrders;
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
