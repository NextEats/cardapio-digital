import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { api } from "../server/api";
import { iOrdersTablesWithFkData, iProductCategories, iProducts, iRestaurant, iTable, iTables } from "../types/types";

interface iTableContextProps {
    tables: iTables["data"];
    setOpenedTableModal: Dispatch<SetStateAction<iTable["data"] | null>>;
    openedTableModal: iTable["data"] | null;
    setIsOpenedProductTableModal: Dispatch<SetStateAction<boolean>>
    isOpenedProductTableModal: boolean
    setIsOpenedTableConfigModal: Dispatch<SetStateAction<boolean>>
    isOpenedTableConfigModal: boolean
    setIsOpenedCreateTableModal: Dispatch<SetStateAction<boolean>>
    isOpenedCreateTableModal: boolean;
    products: iProducts["data"]
    categories: iProductCategories["data"]
    ordersTables: iOrdersTablesWithFkData[]
    restaurant: iRestaurant["data"]
    updateTable: (is_active: boolean, is_occupied: boolean, table_id: number) => Promise<void>;
    createNewtable: (cheirAmount: string, tableName: string) => Promise<void>;
    deleteTable: () => Promise<void>;
}
interface iTableContextProviderProps {
    children: ReactNode
    restaurant: iRestaurant["data"]
    products: iProducts["data"]
    categories: iProductCategories["data"]
    ordersTables: iOrdersTablesWithFkData[]
}

export const TableContext = createContext({} as iTableContextProps)

export default function TableContextProvider({ children, restaurant, products, categories, ordersTables }: iTableContextProviderProps) {
    const [tables, setTables] = useState<iTables["data"]>([])

    const [openedTableModal, setOpenedTableModal] = useState<iTable["data"] | null>(null)
    const [isOpenedProductTableModal, setIsOpenedProductTableModal] = useState(false)
    const [isOpenedTableConfigModal, setIsOpenedTableConfigModal] = useState(false)
    const [isOpenedCreateTableModal, setIsOpenedCreateTableModal] = useState(false)

    useEffect(() => {
        const getTables = async () => {
            const tablesData = await api.get("api/table_control/" + restaurant.id)
            setTables(tablesData.data)
        }
        getTables()
    }, [restaurant])

    async function createNewtable(cheirAmount: string, tableName: string) {
        if (tableName === '') {
            alert("O nome da mesa é obrigatório")
            return
        }
        const novaMessa: iTables["data"] = await api.post("api/table_control/" + restaurant.id, {
            chair_ammount: cheirAmount,
            name: tableName,
        })
        setTables(state => [...state, novaMessa[0]],)
    }

    async function updateTable(is_active: boolean, is_occupied: boolean, table_id: number) {
        const tableUpdated = await api.put(`api/table_control/${restaurant.id!}`, {
            chair_ammount: openedTableModal?.chair_ammount, is_active, is_occupied, table_id: openedTableModal?.id!
        })
        setOpenedTableModal(tableUpdated.data)
        setTables(state => {
            const foundTable = state.find(t => t.id === table_id)
            const updatedTable = { ...foundTable, is_active, is_occupied };
            const updatedTables = state.map(t => t.id === table_id ? updatedTable : t);
            return [...updatedTables as iTables["data"]];
        },)
        setIsOpenedTableConfigModal(false)
    }
    async function deleteTable() {
        const table_id = openedTableModal?.id!
        await api.delete(`api/table_control/${restaurant.id!}`, { data: { table_id } })

        setTables(state => {
            const tableIndex = state.findIndex(t => t.id === table_id)
            state.splice(tableIndex, 1);
            return [...state];
        },)
        setOpenedTableModal(null)
        setIsOpenedTableConfigModal(false)
    }

    return (
        <TableContext.Provider
            value={{
                tables,
                setOpenedTableModal,
                openedTableModal,
                setIsOpenedProductTableModal,
                isOpenedProductTableModal,
                setIsOpenedTableConfigModal,
                isOpenedTableConfigModal,
                setIsOpenedCreateTableModal,
                isOpenedCreateTableModal,
                products,
                categories,
                ordersTables,
                restaurant,
                createNewtable,
                updateTable,
                deleteTable,
            }}
        >
            {children}
        </TableContext.Provider>
    )
}