import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from "../server/api";
import { iOrdersWithFKData, iProductCategories, iProducts, iRestaurant, iTable, iTables } from "../types/types";

interface iTableContextProps {
    tables: iTables["data"];
    setOpenedTableModal: Dispatch<SetStateAction<iTable["data"] | null>>;
    openedTableModal: iTable["data"] | null;
    setIsOpenedProductTableModal: Dispatch<SetStateAction<boolean>>
    isOpenedProductTableModal: boolean
    products: iProducts["data"]
    categories: iProductCategories["data"]
    createNewtable: (cheirAmount: string) => Promise<void>;
}
interface iTableContextProviderProps {
    children: ReactNode
    restaurant: iRestaurant["data"]
    products: iProducts["data"]
    categories: iProductCategories["data"]
}

export const TableContext = createContext({} as iTableContextProps)

export default function TableContextProvider({ children, restaurant, products, categories }: iTableContextProviderProps) {
    const [tables, setTables] = useState<iTables["data"]>([])

    const [openedTableModal, setOpenedTableModal] = useState<iTable["data"] | null>(null)
    const [isOpenedProductTableModal, setIsOpenedProductTableModal] = useState(false)

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
                setIsOpenedProductTableModal,
                isOpenedProductTableModal,
                createNewtable,
                products,
                categories,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}