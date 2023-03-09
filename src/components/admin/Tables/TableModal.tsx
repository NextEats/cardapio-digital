import { TableContext } from '@/src/contexts/TableControlContext';
import { filterOptionsSelected } from '@/src/helpers/filterOptionsSelected';
import { api } from '@/src/server/api';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
import { BsCheckCircle, BsGear } from 'react-icons/bs';
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
        ordersTables,
    } = useContext(TableContext);

    async function handleFinishOrder() {
        const foundCashBoxes = cashBoxes.find((c) => c.is_open === true);
        if (foundCashBoxes === undefined) {
            alert('O Pedido só pode ser feito se o caixa estiver aberto.')
            return
        };

        const orderData = await api.post(`api/orders/${restaurant.id}`, {
            order_type_id: 3,
            cash_box_id: foundCashBoxes.id,
            order_status_id: 3,
            payment_method_id: 7,
        });

        if (orderData === null) return;

        const productsOfTheTable = tableState.productsSelected.filter(p => p.table_id === openedTableModal!.id)

        productsOfTheTable.forEach(async (ps) => {

            const additionals_data = ps.quantityAdditionals.reduce(
                (acc: { quantity: number; additional_id: number }[], item) => {
                    return (acc = [...acc, {
                        quantity: item.quantity,
                        additional_id: item.additionalId,
                    },
                    ]);
                },
                []
            );
            const selects_data = filterOptionsSelected({
                productsOptionsSelected: ps.productSelects ? ps.productSelects : [],
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

    async function handleFinishProduction() {

        const ordersInProduction = ordersTables.filter(ot => ot.orders.order_status.status_name === 'em produção' && ot.tables.id === openedTableModal!.id)
        ordersInProduction.forEach(async o => {
            const orderData = await api.put(`api/orders/${restaurant.id}`, {
                order_status_id: 1,
                order_id: o.orders.id
            });
        })
        window.location.reload()
    }
    async function handleFinishService() {

        const ordersDelievered = ordersTables.filter(ot => ot.has_been_paid === false)
        // if(ordersInProduction.some( o => o.orders.order_status.status_name === 'em produção')) {
        //     alert("Para finalizar o serviço, todos os pedidos em produção precisam ser entregues.")
        //     return
        // }
        ordersDelievered.forEach(async o => {
            const ordersTableData = await api.put(`api/orders_tables/`, {
                order_table_id: o.id,
                has_been_paid: true,

            });
        })
        await updateTable(false, false, openedTableModal?.id!);
        window.location.reload()
    }

    const enableFinishServiceButton = ordersTables.some(o => o.orders.order_status.status_name === 'em produção' && o.tables.id === openedTableModal!.id)

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
                        <Dialog.Title className="flex items-center justify-between text-base w-full text-center font-semibold mb-2 sm:mb-6 mt-3">
                            <div className="flex items-center justify-start gap-3">
                                <GiTable className="text-gray-350" size={32} />
                                <span className="text-lg font-bold ">  {openedTableModal?.name} </span>
                                <span className='text-bsse font-semibold text-green-500'> R$ {tableData.tableBill.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2, maximumFractionDigits: 2
                                })} </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                {openedTableModal?.is_occupied && !enableFinishServiceButton ?
                                    <BsCheckCircle size={24} className="text-blue-500 cursor-pointer" onClick={() => handleFinishService()} />
                                    : null}
                                <BsGear size={24} className="cursor-pointer" onClick={() => setIsOpenedTableConfigModal(true)} />
                            </div>
                        </Dialog.Title>

                        <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-4'>
                            <div className='flex items-center gap-3'>
                                <span className='h-4 w-4 bg-green-500 rounded-full'></span><span> Pedidos Entregue </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className='h-4 w-4 bg-blue-500 rounded-full'></span><span> Pedidos Em Produção </span>
                            </div>
                            <div className='flex items-center gap-3'>
                                <span className='h-4 w-4 bg-red-500 rounded-full'></span><span> Pedidos Em Análise     </span>
                            </div>
                        </div>

                        <div className='w-full h-[2px] bg-gray-300 my-3'></div>

                        <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 max-h-[350px] overflow-auto p-2 scrollbar-custom">
                            {tableState.productsSelected
                                ? tableState.productsSelected.map((orderProductData, index) => {
                                    if (orderProductData.product === null) return;
                                    if (orderProductData.table_id !== openedTableModal!.id) return;
                                    return <CustomerAtTheTable key={index} orderStatus='em análise' orderProductData={orderProductData} />
                                })
                                : null}
                            {tableData.productsDeliveredData
                                ? tableData.productsDeliveredData.map((orderProductData, index) => {
                                    return <CustomerAtTheTable key={index} orderStatus={'entregue'} orderProductData={orderProductData} />
                                })
                                : null}

                            {tableData.productsInProductionData
                                ? tableData.productsInProductionData.map((orderProductData, index) => {
                                    return <CustomerAtTheTable key={index} orderStatus='em produção' orderProductData={orderProductData} />
                                })
                                : null}
                        </div>

                        {!openedTableModal?.is_active ? (
                            <div className="w-full flex items-center justify-end gap-3 mt-4 ">
                                {tableData.productsInProductionData !== undefined && tableData.productsInProductionData?.length > 0 ?
                                    <CardapioDigitalButton name="Entregar Pedido" h="h-8" w="w-44" onClick={() => handleFinishProduction()} />
                                    : null}

                                <CardapioDigitalButton name="Pedir" h="h-8" w="w-40" onClick={() => setIsOpenedProductTableModal(true)} />

                                {tableState.productsSelected.length > 0 ? (
                                    <CardapioDigitalButton name="Confirmar" h="h-8" w="w-40" onClick={() => handleFinishOrder()} />
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
