import { TableContext } from "@/src/contexts/TableControlContext";
import { api } from "@/src/server/api";
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from "react";
import { BsGear } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { CardapioDigitalButton } from "../cardapio-digital/CardapioDigitalButton";
import CustomerAtTheTable from "./CustomerAtTheTable";
import ProductsTableModal from "./ProductsTableModal";
import TableConfigModal from "./TableConfigModal";

interface iTableModalProps {

}

export default function TableModal({ }: iTableModalProps) {

    const {
        openedTableModal,
        setOpenedTableModal,
        restaurant,
        cashBoxes,
        isOpenedTableConfigModal,
        isOpenedProductTableModal,
        setIsOpenedTableConfigModal,
        setIsOpenedProductTableModal,
        tableProducts,
        tableState } = useContext(TableContext)

    async function handleFinishOrder() {
        const foundCashBoxes = cashBoxes.find(c => c.is_open === true)
        if (foundCashBoxes === undefined) return
        console.log(tableState.productsSelected)
        const orderData = await api.post(`api/orders/${restaurant.id}`, {
            order_type_id: 3,
            cash_box_id: foundCashBoxes.id,
            order_status_id: 2,
        })

        if (orderData === null) return
        console.log(orderData)

        tableState.productsSelected.forEach(async ps => {
            const additionals_data =
                ps.quantityAdditionals.reduce((acc: { quantity: number, additional_id: number }[], item) => {
                    return acc = [...acc, { quantity: item.quantity, additional_id: item.additionalId }]
                }, [])
            const selects_data = ps.productSelects
            const ordersProductsData = await api.post(`api/orders_products/`, {
                order_id: orderData.data.id,
                table_id: openedTableModal?.id,
                product_id: ps.product?.id,
                selects_data,
                additionals_data,
            })
            console.log(ordersProductsData)
        })
        const ordersTablesData = await api.post(`api/orders_tables/`, {
            order_id: orderData.data.id,
            table_id: openedTableModal?.id,
        })
    }

    return (
        <>
            {isOpenedTableConfigModal ? <TableConfigModal /> : null}
            {isOpenedProductTableModal ? <ProductsTableModal /> : null}

            <Dialog.Root open={openedTableModal !== null}>
                <Dialog.Trigger>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setOpenedTableModal(null)} className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                    <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[600px] lg:w-[900px] h-[] bg-white shadow-md p-6" >
                        <Dialog.Title className="flex items-center justify-between text-base w-full text-center font-semibold mb-6 mt-3">
                            <div className="flex items-center justify-start gap-3">
                                <FaHome className="text-gray-350" size={32} />
                                <span className="text-lg font-bold "> {openedTableModal?.name} </span>
                            </div>
                            <BsGear size={24} className="cursor-pointer" onClick={() => setIsOpenedTableConfigModal(true)} />
                        </Dialog.Title>

                        <div className=" flex flex-col lg:grid lg:grid-cols-2 gap-4 ">
                            {tableProducts ?
                                tableProducts.map(product => {
                                    return <CustomerAtTheTable key={product.id} isInProduction={true} product={product} />
                                }) : null

                            }
                            {tableState.productsSelected ?
                                tableState.productsSelected.map(product => {
                                    if (product.product === null) return
                                    return <CustomerAtTheTable key={product.product!.id} isInProduction={false} product={product.product!} />
                                }) : null

                            }
                        </div>

                        <div className="w-full flex items-center justify-end gap-3">
                            <CardapioDigitalButton name="Pedir" h="h-8" w="w-40" onClick={() => setIsOpenedProductTableModal(true)} />
                            <CardapioDigitalButton name="Confirmar" h="h-8" w="w-40" onClick={() => handleFinishOrder()} />
                        </div>

                        <Dialog.Close className="fixed top-3 right-3 text-gray-600" onClick={() => setOpenedTableModal(null)}>
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </>
    )
}