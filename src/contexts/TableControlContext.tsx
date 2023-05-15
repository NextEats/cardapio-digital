import { createContext, ReactNode } from 'react';
import { iRestaurant } from '../types/iRestaurant';
import { iTables } from '../types/iTable';

interface iTableControlContextProps {
  tables: iTables['data'];
  restaurant: iRestaurant['data'];
}
interface iTableControlContextProviderProps {
  children: ReactNode;
  restaurant: iRestaurant['data'];
  tablesData: iTables['data'];
}

export const TableControlContext = createContext(
  {} as iTableControlContextProps
);

export default function TableControlContextProvider({
  children,
  restaurant,
  tablesData,
}: iTableControlContextProviderProps) {
  // const [tables, setTables] = useState<iTables['data']>([]);

  // useEffect(() => {
  //   const getTables = () => {
  //     setTables(tablesData);
  //   };
  //   getTables();
  // }, [restaurant, tablesData]);
  console.log('tablesdata', tablesData);
  return (
    <TableControlContext.Provider
      value={{
        tables: tablesData,
        restaurant,
      }}
    >
      {children}
    </TableControlContext.Provider>
  );
}
