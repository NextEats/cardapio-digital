import {
    iAdditionals,
    iInsertOrdersProducts,
    iInsertProducts,
    iOrdersProducts,
    iOrdersTablesWithFkData,
    iOrdersWithFKData,
    iProducts,
    iRestaurantWithFKData,
    iSelects,
} from '@/src/types/types';
import * as Dialog from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dispatch, RefObject, useMemo, useRef, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { showModalAction } from '../../../../reducers/statusReducer/action';
import { iStatusReducer } from '../../../../reducers/statusReducer/reducer';
import { api, supabase } from '../../../../server/api';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';

import { getOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import ReactToPrint, { useReactToPrint } from 'react-to-print';
import ProductionOrder from './ProductionOrder';
import ProductsDetails from './ProductsDetails';

interface iOrderModalProps {
    ordersState: iStatusReducer;
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    ordersDispatch: Dispatch<any>;
    restaurant: iRestaurantWithFKData;
    ordersProducts: iInsertOrdersProducts['data'];
    additionals: iAdditionals['data'];
    selects: iSelects['data'];
    products: iInsertProducts['data'];
    printComponent: RefObject<HTMLDivElement>;
    ordersTables: iOrdersTablesWithFkData[];
}

export function OrderModal({
    ordersDispatch,
    ordersProducts,
    ordersGroupedByOrderStatus,
    ordersState,
    products,
    restaurant,
    selects,
    printComponent,
    additionals,
    ordersTables,
}: iOrderModalProps) {
    const productionOrder = useRef<HTMLDivElement>(null);

    const printProductionOrder = useReactToPrint({
        content: () => productionOrder.current,
    });

    const [address, setAddress] = useState({
        bairro: '',
        cep: '',
        complemento: '',
        ddd: '',
        gia: '',
        ibge: '',
        localidade: '',
        logradouro: '',
        siafi: '',
        uf: '',
    });

    const orderProductFiltered = ordersProducts.filter(
        (op) => op.order_id === ordersState.orderId
    );
    const productsFiltered = orderProductFiltered.map((op) => {
        return products.find((p) => p.id === op?.product_id);
    });
    const thereAnyObservation = orderProductFiltered.some(
        (op) => op.observation !== null
    );
    const textStyles =
        'text-[10px] leading-[14px] font-semibold text-black text-left leading-6';

    const orderFound = ordersState.orders.find(
        (order) => order.id === ordersState.orderId
    );

    useMemo(() => {
        const getAddress = async () => {
            const res = await api.get(
                `https://viacep.com.br/ws/${orderFound?.clients.addresses.cep}/json/`
            );
            setAddress(res.data);
        };
        orderFound?.clients ? getAddress() : null;
    }, [orderFound]);

    const ordersTablesFound = ordersTables.find(
        (ot) => ot.orders.id === orderFound?.id
    );

    let countProducts: {
        [key: string]: {
            id: number | undefined;
            count: number;
            name: string;
            price: number;
        };
    } = {};
    for (let i = 0; i < productsFiltered.length; i++) {
        if (productsFiltered[i] === undefined) {
            return <></>;
        }

        if (!countProducts[productsFiltered[i]!.name]) {
            countProducts[productsFiltered[i]!.name] = {
                id: productsFiltered[i]!.id,
                count: 0,
                name: productsFiltered[i]!.name,
                price: 0,
            };
        }
        countProducts[productsFiltered[i]!.name].count += 1;
        countProducts[productsFiltered[i]!.name].price +=
            productsFiltered[i]!.price;
    }

    const result = Object.entries(countProducts).map(
        ([name, { id, count, price }]) => ({ id, name, count, price })
    );

    const totalOrderPrice = getOrdersProductsData({
        ordersProducts: orderProductFiltered as iOrdersProducts['data'],
        additionals,
        products: products as iProducts['data'],
    }).reduce((acc, item) => acc + item.totalPrice, 0);

    const orderDateFormated = format(
        new Date(`${orderFound?.created_at}`),
        'P',
        { locale: ptBR }
    );

    async function moveToEmProduçãoCard(orderId: number) {
        await supabase
            .from('orders')
            .update({ order_status_id: 3 })
            .eq('id', orderId);
        ordersDispatch(showModalAction());
    }

    return (
        <>
            <div>
                <Dialog.Root open={ordersState.isOpenOrderModal}>
                    <Dialog.Portal>
                        <Dialog.Overlay
                            className="bg-black opacity-40 fixed inset-0 transition-all ease-in-out duration-300"
                            onClick={() => ordersDispatch(showModalAction())}
                        />
                        <div className="fixed mt-12 right-1/2 translate-x-1/2 p-4 bg-[#fb3d3a] w-[298px] rounded-lg max-h-[80vh]">
                            <Dialog.Title className="text-xl font-bold text-center text-[white] mb-3">
                                Next Eats
                            </Dialog.Title>
                            <Dialog.Content
                                ref={printComponent}
                                className="bg-white shadow-bd w-[298px] fixed right-1/2 
                            translate-x-1/2 px-6 pt-3 pb-6"
                            >
                                <ProductionOrder
                                    productsFiltered={productsFiltered}
                                    productionOrder={productionOrder}
                                    printProductionOrder={printProductionOrder}
                                    orderFound={orderFound}
                                    orderDateFormated={orderDateFormated}
                                    ordersTablesFound={ordersTablesFound}
                                    result={result}
                                    additionals={additionals}
                                    orderProductFiltered={orderProductFiltered}
                                    selects={selects}
                                />

                                <h2 className="text-center uppercase text-black font-semibold text-sm">
                                    COMANDA
                                </h2>

                                <hr className="my-2" />
                                <div>
                                    <p className={`${textStyles} text`}>
                                        Restaurante:{' '}
                                        <strong>{restaurant!.name}</strong>
                                    </p>
                                    <p className={`${textStyles}`}>
                                        Nº do pedido:{' '}
                                        <strong>
                                            #
                                            {orderFound?.number
                                                .toString()
                                                .padStart(4, '0')}{' '}
                                        </strong>
                                    </p>
                                    <p className={`${textStyles}`}>
                                        Data:{' '}
                                        <strong>{orderDateFormated}</strong>
                                    </p>
                                    <p className={`${textStyles}`}>
                                        Pagamento:{' '}
                                        <strong>
                                            {orderFound?.payment_methods.name}
                                        </strong>
                                    </p>
                                    {ordersTablesFound ? (
                                        <p className={`${textStyles}`}>
                                            Nome da mesa :{' '}
                                            <strong>
                                                {ordersTablesFound.tables.name}
                                            </strong>
                                        </p>
                                    ) : null}
                                    {orderFound?.payment_methods.id == 5 ? (
                                        <p className={`${textStyles}`}>
                                            Troco:
                                            <strong>
                                                R$ {orderFound?.change_value}{' '}
                                            </strong>
                                        </p>
                                    ) : null}
                                </div>

                                {orderFound?.clients ? (
                                    <>
                                        <hr className="my-2" />

                                        <div>
                                            <p
                                                className={`${textStyles} text-left `}
                                            >
                                                Nome:{' '}
                                                <strong>
                                                    {orderFound?.clients?.name}
                                                </strong>{' '}
                                                - Telefone:{' '}
                                                <strong>
                                                    {
                                                        orderFound?.clients
                                                            .contacts?.phone
                                                    }{' '}
                                                </strong>
                                            </p>

                                            {/* <p className={`${textStyles} text-left `}>
                                            Email:<strong>    {orderFound?.clients.contacts?.email}</strong>
                                           
                                        </p> */}
                                            <p className={`${textStyles}`}>
                                                Endereço:{' '}
                                                <strong>
                                                    {address.logradouro},
                                                    {
                                                        orderFound?.clients
                                                            .addresses?.number
                                                    }{' '}
                                                    - {address.bairro} -{' '}
                                                    {address.localidade},{' '}
                                                    {address.uf}
                                                </strong>
                                            </p>
                                        </div>
                                    </>
                                ) : null}

                                <hr className="my-2" />

                                <ProductsDetails
                                    productsFiltered={
                                        productsFiltered! as iProducts['data']
                                    }
                                    additionals={additionals}
                                    result={result}
                                    orderProductFiltered={orderProductFiltered}
                                    selects={selects}
                                />

                                <hr className="my-2" />

                                <div>
                                    {orderFound?.payment_methods.name !==
                                    'MESA' ? (
                                        <p className="grid grid-cols-2 items-center gap-10">
                                            <span className={`${textStyles}`}>
                                                Sub-Total:
                                            </span>
                                            <span className={`${textStyles}`}>
                                                <strong>
                                                    R$
                                                    {totalOrderPrice}
                                                </strong>
                                            </span>
                                        </p>
                                    ) : null}

                                    {orderFound?.delivery_fees ? (
                                        <p className="grid grid-cols-2 items-center gap-10">
                                            <span className={`${textStyles} `}>
                                                Taxa de entrega:
                                            </span>
                                            <span className={`${textStyles}`}>
                                                <strong>
                                                    R${' '}
                                                    {
                                                        orderFound
                                                            ?.delivery_fees.fee
                                                    }
                                                </strong>
                                            </span>
                                        </p>
                                    ) : null}

                                    <p className="grid grid-cols-2 items-center gap-10">
                                        <span className={`${textStyles}`}>
                                            Total a pagar:{' '}
                                        </span>
                                        <span className={`${textStyles} w-`}>
                                            <strong>
                                                R${' '}
                                                {totalOrderPrice +
                                                    (orderFound?.delivery_fees
                                                        ? orderFound
                                                              .delivery_fees.fee
                                                        : 0)}
                                            </strong>
                                        </span>
                                    </p>
                                </div>

                                <div className="flex flex-1 flex-col items-center justify-end gap-3 mt-5 hideButtonToPrint">
                                    {!ordersGroupedByOrderStatus[
                                        'em análise'
                                    ] ? null : ordersGroupedByOrderStatus[
                                          'em análise'
                                      ].some((o) => o.id === orderFound?.id) ? (
                                        <ReactToPrint
                                            copyStyles={true}
                                            content={() =>
                                                printComponent.current
                                            }
                                            onAfterPrint={() => {
                                                printProductionOrder();
                                                moveToEmProduçãoCard(
                                                    orderFound?.id!
                                                );
                                            }}
                                            trigger={() => {
                                                return (
                                                    <CardapioDigitalButton
                                                        name="Imprimir e aceitar o pedido"
                                                        w="w-full"
                                                        h="h-10"
                                                    />
                                                );
                                            }}
                                        />
                                    ) : null}
                                    <ReactToPrint
                                        content={() => printComponent.current}
                                        onAfterPrint={() => {
                                            printProductionOrder();
                                            moveToEmProduçãoCard(
                                                orderFound?.id!
                                            );
                                        }}
                                        trigger={() => {
                                            return (
                                                <CardapioDigitalButton
                                                    name="Imprimir"
                                                    id="imprimir"
                                                    w="w-full"
                                                    h="h-10"
                                                />
                                            );
                                        }}
                                    />
                                </div>

                                <Dialog.Close
                                    asChild
                                    onClick={() =>
                                        ordersDispatch(showModalAction())
                                    }
                                >
                                    <button
                                        className={`absolute top-3 right-3 hideButtonToPrint`}
                                        aria-label="Close"
                                    >
                                        <FiX className="w-6 h-6" />
                                    </button>
                                </Dialog.Close>
                            </Dialog.Content>
                        </div>
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}
