import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../server/api";
import { iRestaurant, iRestaurants, iTables } from "../types/types";

interface iTableContextProps {
    tables: iTables["data"]
}
interface iTableContextProviderProps {
    children: ReactNode
    restaurant: iRestaurant["data"]
}

export const TableContext = createContext({} as iTableContextProps)

export default function TableContextProvider({ children, restaurant }: iTableContextProviderProps) {
    const [tables, setTables] = useState<iTables["data"]>([])

    useEffect(() => {
        const getTables = async () => {
            const tablesData = await api.get("api/table_control/" + restaurant.id)
            setTables(tablesData.data)
        }
        getTables()
    }, [restaurant])

    return (
        <TableContext.Provider
            value={{
                tables,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}