import { TableContext } from '@/src/contexts/TableControlContext';
import { filterOptionsSelected } from '@/src/helpers/filterOptionsSelected';
import { api } from '@/src/server/api';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { BsGear } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import { GiTable } from 'react-icons/gi';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
import CustomerAtTheTable from './CustomerAtTheTable';
import ProductsTableModal from './ProductsTableModal';
import TableConfigModal from './TableConfigModal';

export default function TableModal() {
    const {
        openedTableModal,
        setOpenedTableModal,
        restaurant,
        cashBoxes,
        isOpenedTableConfigModal,
        isOpenedProductTableModal,
        setIsOpenedTableConfigModal,
        setIsOpenedProductTableModal,
        tableData,
        tableState,
        updateTable,
    } = useContext(TableContext);

    async function handleFinishOrder() {
        const foundCashBoxes = cashBoxes.find((c) => c.is_open === true);
        if (foundCashBoxes === undefined) return;

        const orderData = await api.post(`api/orders/${restaurant.id}`, {
            order_type_id: 3,
            cash_box_id: foundCashBoxes.id,
            order_status_id: 3,
        });

        if (orderData === null) return;

        tableState.productsSelected.forEach(async (ps) => {
            const additionals_data = ps.quantityAdditionals.reduce(
                (acc: { quantity: number; additional_id: number }[], item) => {
                    return (acc = [
                        ...acc,
                        {
                            quantity: item.quantity,
                            additional_id: item.additionalId,
                        },
                    ]);
                },
                []
            );
            const selects_data = filterOptionsSelected({
                productsOptionsSelected: ps.productSelects
                    ? ps.productSelects
                    : [],
            });

            const ordersProductsData = await api.post(`api/orders_products/`, {
                order_id: orderData.data.id,
                table_id: openedTableModal?.id,
                product_id: ps.product?.id,
                selects_data,
                additionals_data,
            });
        });
        const ordersTablesData = await api.post(`api/orders_tables/`, {
            order_id: orderData.data.id,
            table_id: openedTableModal?.id,
            has_been_paid: false,
        });

        if (openedTableModal?.is_occupied === false) {
            await updateTable(false, true, openedTableModal?.id!);
        }

        window.location.reload()
    }

    return (
        <>
            {isOpenedTableConfigModal ? <TableConfigModal /> : null}
            {isOpenedProductTableModal ? <ProductsTableModal /> : null}

            <Dialog.Root open={openedTableModal !== null}>
                <Dialog.Trigger></Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay
                        onClick={() => setOpenedTableModal(null)}
                        className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out"
                    />
                    <Dialog.Content className="fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[600px] lg:w-[900px] bg-white shadow-md p-6">
                        <Dialog.Title className="flex items-center justify-between text-base w-full text-center font-semibold mb-6 mt-3">
                            <div className="flex items-center justify-start gap-3">
                                <GiTable className="text-gray-350" size={32} />
                                <span className="text-lg font-bold ">
                                    {' '}
                                    {openedTableModal?.name}
                                </span>
                                <span className='text-bsse font-semibold text-green-500'> R$ {tableData.tableBill.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2, maximumFractionDigits: 2
                                })} </span>
                            </div>
                            <BsGear
                                size={24}
                                className="cursor-pointer"
                                onClick={() =>
                                    setIsOpenedTableConfigModal(true)
                                }
                            />
                        </Dialog.Title>

                        <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 max-h-[350px] overflow-auto p-2 scrollbar-custom">
                            {tableData.productsData
                                ? tableData.productsData.map((orderProductData, index) => {
                                    return (
                                        <CustomerAtTheTable
                                            key={orderProductData.product.id}
                                            isInProduction={true}
                                            orderProductData={orderProductData}
                                        />
                                    );
                                })
                                : null}
                            {tableState.productsSelected
                                ? tableState.productsSelected.map((orderProductData) => {
                                    if (orderProductData.product === null) return;
                                    return (
                                        <CustomerAtTheTable
                                            key={orderProductData.product.id}
                                            isInProduction={false}
                                            orderProductData={orderProductData}
                                        />
                                    );
                                })
                                : null}
                        </div>

                        {!openedTableModal?.is_active ? (
                            <div className="w-full flex items-center justify-end gap-3 mt-4 ">
                                <CardapioDigitalButton
                                    name="Pedir"
                                    h="h-8"
                                    w="w-40"
                                    onClick={() =>
                                        setIsOpenedProductTableModal(true)
                                    }
                                />
                                {tableState.productsSelected.length > 0 ? (
                                    <CardapioDigitalButton
                                        name="Confirmar"
                                        h="h-8"
                                        w="w-40"
                                        onClick={() => handleFinishOrder()}
                                    />
                                ) : null}
                            </div>
                        ) : null}

                        <Dialog.Close
                            className="fixed top-3 right-3 text-gray-600"
                            onClick={() => setOpenedTableModal(null)}
                        >
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    );
}
