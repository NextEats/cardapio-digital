import { createContext, ReactNode } from 'react';
import {
  iOrders,
  iOrdersTablesWithFkData,
  iRestaurant,
  iTable,
} from '../types/types';

interface iTableContextProps {
  table: iTable['data'];
  restaurant: iRestaurant['data'];
  orders_tables: iOrdersTablesWithFkData;
  orders_products: iOrders['data'];
  order: iOrders['data'];
}
interface iTableContextProviderProps {
  children: ReactNode;
  restaurant: iRestaurant['data'];
  orders_tables: iOrdersTablesWithFkData;
  orders_products: iOrders['data'];
  order: iOrders['data'];
  table: iTable['data'];
}

export const TableContext = createContext({} as iTableContextProps);

export default function TableContextProvider({
  children,
  restaurant,
  order,
  orders_products,
  orders_tables,
  table,
}: iTableContextProviderProps) {
  return (
    <TableContext.Provider
      value={{
        restaurant,
        order,
        orders_products,
        orders_tables,
        table,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
