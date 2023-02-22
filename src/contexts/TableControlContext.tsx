import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from "../server/api";
import { iRestaurant, iTable, iTables } from "../types/types";

interface iTableContextProps {
    tables: iTables["data"];
    setOpenedTableModal: Dispatch<SetStateAction<iTable["data"] | null>>;
    openedTableModal: iTable["data"] | null;
    createNewtable: (cheirAmount: string) => Promise<void>;
}
interface iTableContextProviderProps {
    children: ReactNode
    restaurant: iRestaurant["data"]

}

export const TableContext = createContext({} as iTableContextProps)

export default function TableContextProvider({ children, restaurant }: iTableContextProviderProps) {
    const [tables, setTables] = useState<iTables["data"]>([])

    const [openedTableModal, setOpenedTableModal] = useState<iTable["data"] | null>(null)

    useEffect(() => {
        const getTables = async () => {
            const tablesData = await api.get("api/table_control/" + restaurant.id)
            setTables(tablesData.data)
        }
        getTables()
    }, [restaurant])

    async function createNewtable(cheirAmount: string) {
        const novaMessa: iTables["data"] = await api.post("api/table_control/" + restaurant.id, {
            chair_ammount: cheirAmount,
        })
        setTables(state => [...state, novaMessa[0]],)
    }

    return (
        <TableContext.Provider
            value={{
                tables,
                setOpenedTableModal,
                openedTableModal,
                createNewtable,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}