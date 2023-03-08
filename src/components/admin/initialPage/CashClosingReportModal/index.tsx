import { api } from '@/src/server/api';
import { iAdditionals, iCashBox, iCashBoxes, iOrdersProducts, iOrdersWithFKData, iProducts } from '@/src/types/types';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from 'react-icons/fi';
import { getOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import ReactToPrint from 'react-to-print';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';

interface iCashClosingReportModalProps {
    setOpenCashBoxClosingReportModal: Dispatch<SetStateAction<boolean>>
    openCashBoxClosingReportModal: boolean
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    restaurantId: number;
    cashBoxState: iCashBox['data'] | undefined;
    billing: number
}

export default function CashClosingReportModal({
    ordersGroupedByOrderStatus,
    restaurantId,
    cashBoxState,
    billing,
    openCashBoxClosingReportModal,
    setOpenCashBoxClosingReportModal
}: iCashClosingReportModalProps) {

    const [ordersProducts, setOrdersProducts] = useState<iOrdersProducts["data"]>([])
    const [additionals, setAdditionals] = useState<iAdditionals["data"]>([])
    const [products, setProducts] = useState<iProducts["data"]>([])
    const CashBoxReportComponent = useRef<HTMLDivElement>(null)

    const user = useUser();

    const moment = new Date()
    const cashBoxOpenedAt = new Date(cashBoxState?.opened_at!)

    useEffect(() => {
        async function getDatas() {
            const ordersProductsData = await api.get(`api/orders_products`)
            setOrdersProducts(ordersProductsData.data)
            const additionalsData = await api.get(`api/additionals/${restaurantId}`)
            setAdditionals(additionalsData.data)
            const productsData = await api.get(`api/products/${restaurantId}`)
            setProducts(productsData.data)
        }
        getDatas()
    }, [restaurantId])
    async function handleCloseCashBox() {
        if (
            ordersGroupedByOrderStatus['em análise'] ||
            ordersGroupedByOrderStatus['em produção'] ||
            ordersGroupedByOrderStatus['a caminho']
        ) {
            alert('Para fechar o caixa, todos os pedidos precisam ser entregues.');
            return;
        }
        const cashBox = await api.post('api/cash_boxes/close', {
            restaurant_id: restaurantId,
        });
    }


    interface Payment {
        payment_method: string;
        value: number;
    }

    function getPaymentTotals(orders: iOrdersWithFKData[]): Payment[] {
        const paymentTotals: Payment[] = [];

        orders.forEach((order) => {
            const paymentMethod = order.payment_methods.name;
            const orderValue = getOrderValue(order);

            const paymentTotalIndex = paymentTotals.findIndex(
                (payment) => payment.payment_method === paymentMethod
            );

            if (paymentTotalIndex === -1) {
                paymentTotals.push({ payment_method: paymentMethod, value: orderValue });
            } else {
                paymentTotals[paymentTotalIndex].value += orderValue;
            }
        });

        return paymentTotals;
    }

    function getOrderValue(order: iOrdersWithFKData): number {

        const ordersProductFiltered = ordersProducts.filter((op) => op.order_id === order.id);

        const totalPriceOfOrder = getOrdersProductsData({
            ordersProducts: ordersProductFiltered,
            additionals,
            products,
        }).reduce((acc, item) => acc + item.totalPrice, 0)

        const deliveryFees = order.delivery_fees ? order.delivery_fees.fee : 0
        return deliveryFees + totalPriceOfOrder/* adicionar valor do pedido */;
    }

    return (
        <div className="flex items-center gap-3">
            <Dialog.Root open={openCashBoxClosingReportModal}>
                <Dialog.Trigger>
                </Dialog.Trigger>

                <Dialog.Portal>
                    <Dialog.Overlay onClick={() => setOpenCashBoxClosingReportModal(false)} className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
                    <Dialog.Content ref={CashBoxReportComponent} className="hideShadowToPrint fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[400px] h-[] bg-white shadow-md p-6" >
                        <Dialog.Title className="text-base w-full uppercase text-center font-semibold mb-6">
                            Extrato e Caixa
                        </Dialog.Title>

                        <div className='max-w-full'>
                            <p className=''> Usuário: Fulano</p>
                            <p className='mb-2'>Email: {user?.email}</p>

                            {cashBoxState ?
                                <p>Data de abertura:  {format(cashBoxOpenedAt, 'P', { locale: ptBR })}{' '}{format(cashBoxOpenedAt, 'HH')} {':'} {format(cashBoxOpenedAt, 'mm')}</p>
                                : null}
                            <p>Saldo abertura: 0,00</p>
                            <p>Data de fechamento:  {format(moment, 'P', { locale: ptBR })}{' '}{format(moment, 'HH')} {':'} {format(moment, 'mm')}</p>
                            <p>Saldo fechamento: {billing.toLocaleString('pt-BR', {
                                minimumFractionDigits: 2, maximumFractionDigits: 2
                            })}</p>

                            <h3 className='text-base w-full uppercase text-center font-semibold my-3'>Valores totais do caixa</h3>

                            <p className='text-lg font-semibold mb-2'>Entradas</p>
                            {cashBoxState ? getPaymentTotals(ordersGroupedByOrderStatus['entregue']).map((paymentMethods, index) => {
                                return <p key={index} className='text-sm font-medium'> {paymentMethods.payment_method}: R$ {paymentMethods.value.toLocaleString('pt-BR', {
                                    maximumFractionDigits: 2, minimumFractionDigits: 2
                                })} </p>
                            }) : null}
                        </div>


                        <Dialog.Close className="fixed top-3 right-3 text-gray-600 hideButtonToPrint" onClick={() => setOpenCashBoxClosingReportModal(false)} >
                            <FiX size={22} />
                        </Dialog.Close>

                        <div className='flex items-center gap-3 w-full mt-6 hideButtonToPrint'>
                            <ReactToPrint
                                copyStyles={true}
                                content={() => CashBoxReportComponent.current}
                                onAfterPrint={() => handleCloseCashBox()}
                                trigger={() => {
                                    return (
                                        <CardapioDigitalButton
                                            name="Imprimir e fechar o caixa"
                                            w="w-80"
                                            h="h-8"
                                        />
                                    );
                                }}
                            />


                            <ReactToPrint
                                copyStyles={true}
                                content={() => CashBoxReportComponent.current}
                                trigger={() => {
                                    return (
                                        <CardapioDigitalButton
                                            name="Imprimir"
                                            w="w-32"
                                            h="h-8"
                                        />
                                    );
                                }}
                            />
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Root>
        </div>
    );
}