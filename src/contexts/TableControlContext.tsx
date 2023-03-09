import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import {
    getOrdersProductsData,
    iOrdersProductsData,
} from '../helpers/getOrdersProductsData';
import {
    iTableReducer,
    tableReducer,
    tableReducerDefaultValues,
} from '../reducers/tableReducer/reducer';
import { api } from '../server/api';
import {
    iAdditionals,
    iCashBoxes,
    iOrdersProducts,
    iOrdersTablesWithFkData,
    iProduct,
    iProductAdditionals,
    iProductCategories,
    iProductOptions,
    iProducts,
    iRestaurant,
    iSelects,
    iTable,
    iTables,
} from '../types/types';

interface iTableContextProps {
    tables: iTables['data'];
    setOpenedTableModal: Dispatch<SetStateAction<iTable['data'] | null>>;
    openedTableModal: iTable['data'] | null;
    setIsOpenedProductTableModal: Dispatch<SetStateAction<boolean>>;
    isOpenedProductTableModal: boolean;
    setIsOpenedTableConfigModal: Dispatch<SetStateAction<boolean>>;
    isOpenedTableConfigModal: boolean;
    setIsOpenedCreateTableModal: Dispatch<SetStateAction<boolean>>;
    isOpenedCreateTableModal: boolean;
    setViewProduct: Dispatch<SetStateAction<iProduct['data'] | null>>;
    isOpenedInactiveTablesModalState: {
        state: boolean;
        set: Dispatch<SetStateAction<boolean>>;
    };
    viewProduct: iProduct['data'] | null;
    products: iProducts['data'];
    tableData: {
        productsInProductionData: iOrdersProductsData[] | undefined;
        productsDeliveredData: iOrdersProductsData[] | undefined;
        tableBill: number;
    };
    additionals: iAdditionals['data'];
    productOptions: iProductOptions['data'];
    selects: iSelects['data'];
    productAdditionals: iProductAdditionals['data'];
    cashBoxes: iCashBoxes['data'];
    ordersProducts: iOrdersProducts['data'];
    categories: iProductCategories['data'];
    ordersTables: iOrdersTablesWithFkData[];
    restaurant: iRestaurant['data'];
    tableDispatch: Dispatch<any>;
    tableState: iTableReducer;
    updateTable: (
        is_active: boolean,
        is_occupied: boolean,
        table_id: number
    ) => Promise<void>;
    createNewtable: (cheirAmount: string, tableName: string) => Promise<void>;
    deleteTable: () => Promise<void>;
}
interface iTableContextProviderProps {
    children: ReactNode;
    restaurant: iRestaurant['data'];
    additionals: iAdditionals['data'];
    productOptions: iProductOptions['data'];
    selects: iSelects['data'];
    products: iProducts['data'];
    productAdditionals: iProductAdditionals['data'];
    ordersProducts: iOrdersProducts['data'];
    categories: iProductCategories['data'];
    ordersTables: iOrdersTablesWithFkData[];
    cashBoxes: iCashBoxes['data'];
}

export const TableContext = createContext({} as iTableContextProps);

export default function TableContextProvider({
    children,
    restaurant,
    products,
    productAdditionals,
    ordersProducts,
    additionals,
    productOptions,
    selects,
    cashBoxes,
    categories,
    ordersTables,
}: iTableContextProviderProps) {
    const [tableState, tableDispatch] = useReducer(
        tableReducer,
        tableReducerDefaultValues
    );
    console.log(tableState);
    const [tables, setTables] = useState<iTables['data']>([]);

    const [viewProduct, setViewProduct] = useState<iProduct['data'] | null>(
        null
    );

    const [openedTableModal, setOpenedTableModal] = useState<
        iTable['data'] | null
    >(null);
    const [isOpenedInactiveTablesModal, setIsOpenedInactiveTablesModal] =
        useState(false);
    const [isOpenedProductTableModal, setIsOpenedProductTableModal] =
        useState(false);
    const [isOpenedTableConfigModal, setIsOpenedTableConfigModal] =
        useState(false);
    const [isOpenedCreateTableModal, setIsOpenedCreateTableModal] =
        useState(false);

    useEffect(() => {
        const getTables = async () => {
            const tablesData = await api.get(
                'api/table_control/' + restaurant.id
            );
            setTables(tablesData.data);
        };
        getTables();
    }, [restaurant]);

    const tableInProductionData = useMemo(() => {
        if (!openedTableModal) return;

        const ordersTableInProductionFiltered = ordersTables.filter((ot) => {
            return (
                ot.tables.id === openedTableModal.id &&
                ot.has_been_paid === false &&
                ot.orders.order_status.status_name === 'em produção'
            );
        });
        const ordersProductsFiltered = ordersProducts.filter((op) =>
            ordersTableInProductionFiltered.some(
                (ot) => ot.orders.id === op.order_id
            )
        );
        const tableProductIds = ordersProductsFiltered.map(
            (op) => op.product_id
        );

        const productsFiltered = tableProductIds.reduce(
            (acc: iProducts['data'], id) => {
                const product = products.find((p) => p.id === id);
                if (product) {
                    acc.push(product);
                }
                return acc;
            },
            []
        );

        const totalPriceOfProducts = productsFiltered.reduce(
            (acc, item) => +acc + item.price,
            0
        );
        const ordersProductsDataTable = getOrdersProductsData({
            additionals,
            ordersProducts: ordersProductsFiltered,
            products: productsFiltered,
        });

        const totalPriceOfAdditionals = ordersProductsDataTable.reduce(
            (acc, item) => {
                return acc + item.totalAdditionalsPriceByProduct;
            },
            0
        );

        return {
            productsData: ordersProductsDataTable,
            tableBill: totalPriceOfProducts + totalPriceOfAdditionals,
        };
    }, [openedTableModal, ordersTables, ordersProducts, products, additionals]);

    const tableDeliveredData = useMemo(() => {
        if (!openedTableModal) return;
        const ordersTableDeliveredFiltered = ordersTables.filter((ot) => {
            return (
                ot.tables.id === openedTableModal.id &&
                ot.has_been_paid === false &&
                ot.orders.order_status.status_name === 'entregue'
            );
        });

        const ordersProductsFiltered = ordersProducts.filter((op) =>
            ordersTableDeliveredFiltered.some(
                (ot) => ot.orders.id === op.order_id
            )
        );
        const tableProductIds = ordersProductsFiltered.map(
            (op) => op.product_id
        );

        const productsFiltered = tableProductIds.reduce(
            (acc: iProducts['data'], id) => {
                const product = products.find((p) => p.id === id);
                if (product) {
                    acc.push(product);
                }
                return acc;
            },
            []
        );

        const totalPriceOfProducts = productsFiltered.reduce(
            (acc, item) => +acc + item.price,
            0
        );
        const ordersProductsDataTable = getOrdersProductsData({
            additionals,
            ordersProducts: ordersProductsFiltered,
            products: productsFiltered,
        });

        const totalPriceOfAdditionals = ordersProductsDataTable.reduce(
            (acc, item) => {
                return acc + item.totalAdditionalsPriceByProduct;
            },
            0
        );

        return {
            productsData: ordersProductsDataTable,
            tableBill: totalPriceOfProducts + totalPriceOfAdditionals,
        };
    }, [openedTableModal, ordersTables, ordersProducts, products, additionals]);

    async function createNewtable(cheirAmount: string, tableName: string) {
        if (tableName === '') {
            alert('O nome da mesa é obrigatório');
            return;
        }
        const novaMessa: iTables['data'] = await api.post(
            'api/table_control/' + restaurant.id,
            {
                chair_ammount: cheirAmount,
                name: tableName,
            }
        );

        window.location.reload();
    }

    async function updateTable(
        is_active: boolean,
        is_occupied: boolean,
        table_id: number
    ) {
        const tableUpdated = await api.put(
            `api/table_control/${restaurant.id!}`,
            {
                chair_ammount: openedTableModal?.chair_ammount,
                is_active,
                is_occupied,
                table_id: openedTableModal?.id!,
            }
        );
        setOpenedTableModal(tableUpdated.data);
        setTables((state) => {
            const foundTable = state.find((t) => t.id === table_id);
            const updatedTable = { ...foundTable, is_active, is_occupied };
            const updatedTables = state.map((t) =>
                t.id === table_id ? updatedTable : t
            );
            return [...(updatedTables as iTables['data'])];
        });
        setIsOpenedTableConfigModal(false);
        setOpenedTableModal(null);
    }

    async function deleteTable() {
        const table_id = openedTableModal?.id!;
        await api.delete(`api/table_control/${restaurant.id!}`, {
            data: { table_id },
        });

        setTables((state) => {
            const tableIndex = state.findIndex((t) => t.id === table_id);
            state.splice(tableIndex, 1);
            return [...state];
        });
        setOpenedTableModal(null);
        setIsOpenedTableConfigModal(false);
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
                isOpenedInactiveTablesModalState: {
                    state: isOpenedInactiveTablesModal,
                    set: setIsOpenedInactiveTablesModal,
                },
                setViewProduct,
                viewProduct,
                products,
                productAdditionals,
                tableData:
                    tableDeliveredData !== undefined
                        ? {
                              productsInProductionData:
                                  tableInProductionData?.productsData,
                              productsDeliveredData:
                                  tableDeliveredData.productsData,
                              tableBill:
                                  tableInProductionData !== undefined
                                      ? tableDeliveredData.tableBill +
                                        tableInProductionData.tableBill
                                      : tableDeliveredData.tableBill,
                          }
                        : {
                              productsInProductionData: undefined,
                              productsDeliveredData: undefined,
                              tableBill: 0,
                          },

                additionals,
                productOptions,
                selects,
                cashBoxes,
                ordersProducts,
                categories,
                ordersTables,
                restaurant,
                tableDispatch,
                tableState,
                createNewtable,
                updateTable,
                deleteTable,
            }}
        >
            {children}
        </TableContext.Provider>
    );
}