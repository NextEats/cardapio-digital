import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useMemo,
  useReducer,
  useState,
} from 'react';
import {
  iTableReducer,
  tableReducer,
  tableReducerDefaultValues,
} from '../reducers/tableReducer/reducer';
import { iAdditionals } from '../types/iAdditional';
import {
  iOrder,
  iOrdersProductsWithFKProducdData,
  iOrdersTablesWithOrderFkData,
} from '../types/iOrders';
import {
  iProduct,
  iProductAdditionals,
  iProductCategories,
  iProducts,
} from '../types/iProducts';
import { iRestaurant } from '../types/iRestaurant';
import { iTable } from '../types/iTable';

interface iTableContextProps {
  table: iTable['data'];
  restaurant: iRestaurant['data'];
  orders_tables: iOrdersTablesWithOrderFkData;
  orders_products: iOrdersProductsWithFKProducdData[];
  order: iOrder['data'] | null;
  additionalByProductId: iAdditionals['data'];
  products: iProducts['data'];
  categories: iProductCategories['data'];
  product_additionals: iProductAdditionals['data'];
  viewProductState: [
    iProduct['data'] | null,
    Dispatch<SetStateAction<iProduct['data'] | null>>
  ];
  tableDispatch: Dispatch<any>;
  tableState: iTableReducer;
  table_paymants_values: number;
}
interface iTableContextProviderProps {
  children: ReactNode;
  restaurant: iRestaurant['data'];
  orders_tables: iOrdersTablesWithOrderFkData;
  orders_products: iOrdersProductsWithFKProducdData[];
  order: iOrder['data'] | null;
  table: iTable['data'];
  additionals: iAdditionals['data'];
  products: iProducts['data'];
  categories: iProductCategories['data'];
  product_additionals: iProductAdditionals['data'];
  table_paymants_values: number;
}

export const TableContext = createContext({} as iTableContextProps);

export default function TableContextProvider({
  children,
  restaurant,
  order,
  orders_products,
  orders_tables,
  table,
  additionals,
  products,
  categories,
  product_additionals,
  table_paymants_values,
}: iTableContextProviderProps) {
  const viewProductState = useState<iProduct['data'] | null>(null);

  const [tableState, tableDispatch] = useReducer(
    tableReducer,
    tableReducerDefaultValues
  );

  const additionalByProductId = useMemo(() => {
    return additionals.filter(a => {
      return product_additionals.some(
        pa =>
          pa.additional_id === a.id && pa.product_id === viewProductState[0]?.id
      );
    });
  }, [viewProductState, additionals, product_additionals]);

  return (
    <TableContext.Provider
      value={{
        restaurant,
        order,
        orders_products,
        orders_tables,
        table,
        additionalByProductId,
        products,
        categories,
        product_additionals,
        viewProductState,
        tableDispatch,
        tableState,
        table_paymants_values,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}
