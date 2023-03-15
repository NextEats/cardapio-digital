import {
    iAdditionals,
    iInsertOrdersProducts,
    iInsertProducts,
    iOrdersWithFKData,
    iRestaurantWithFKData,
} from '@/src/types/types';
import * as Dialog from '@radix-ui/react-dialog';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Dispatch, RefObject, useMemo, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { showModalAction } from '../../../../reducers/statusReducer/action';
import { iStatusReducer } from '../../../../reducers/statusReducer/reducer';
import { api, supabase } from '../../../../server/api';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';
import { DropdownMenuObservation } from '../DropDownMenuObservation';

import ReactToPrint from 'react-to-print';

interface iOrderModalProps {
    ordersState: iStatusReducer;
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    ordersDispatch: Dispatch<any>;
    restaurant: iRestaurantWithFKData;
    ordersProducts: iInsertOrdersProducts['data'];
    additionals: iAdditionals['data'];
    products: iInsertProducts['data'];
    printComponent: RefObject<HTMLDivElement>;
}

export function OrderModal({
    ordersDispatch,
    ordersProducts,
    ordersGroupedByOrderStatus,
    ordersState,
    products,
    restaurant,
    printComponent,
    additionals,
}: iOrderModalProps) {
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
        return products.find((p) => {
            return p.id === op?.product_id;
        });
    });
    const thereAnyObservation = orderProductFiltered.some(
        (op) => op.observation !== null
    );

    const descriptionsStyles =
        'text-sm font-semibold text-black text-center mb-3 mt-2';
    const textStyles = 'text-sm font-semibold text-black text-left leading-6';

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
    const totalPriceOfProducts = result.reduce(
        (acc, product) => acc + product.price,
        0
    );

    const totalAdditionalPrice = result.reduce((acc, item) => {
        const orderProductByProductId = orderProductFiltered.find(
            (op) => op.product_id === item.id
        );
        if (!orderProductByProductId) return acc;
        const additionalsData = orderProductByProductId.additionals_data as {
            quantity: number;
            additional_id: number;
        }[];
        const priceOfEachAdditional = additionalsData
            ? additionalsData.map((ad) => {
                  if (
                      additionals.some((a, index) => a.id === ad.additional_id)
                  ) {
                      return (
                          additionals[
                              additionals.findIndex(
                                  (a) => a.id === ad.additional_id
                              )
                          ].price * ad.quantity
                      );
                  }
                  return 0;
              })
            : [0];

        return (
            acc + priceOfEachAdditional.reduce((sum, price) => sum + price, 0)
        );
    }, 0);

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

    function handleAfterPrint(event: { wasCancelled: boolean }) {
        if (event.wasCancelled) {
            console.error('A impressão foi cancelada');
        } else {
            console.error('A impressão foi concluída com sucesso');
        }
    }

    //

    return (
        <>
            <div>
                <Dialog.Root open={ordersState.isOpenOrderModal}>
                    <Dialog.Portal>
                        <Dialog.Overlay
                            className="bg-black opacity-40 fixed inset-0 transition-all ease-in-out duration-300"
                            onClick={() => ordersDispatch(showModalAction())}
                        />
                        <div className="fixed mt-32 right-1/2 translate-x-1/2 p-4 bg-[#fb3d3a] w-[298px] rounded-lg">
                            <Dialog.Content
                                ref={printComponent}
                                className="bg-white shadow-bd w-[298px] fixed right-1/2 
                            translate-x-1/2 px-6 pt-3 pb-6"
                            >
                                <Dialog.Title className="text-xl font-bold text-center">
                                    Next Eats
                                </Dialog.Title>

                                <Dialog.Description
                                    className={`${descriptionsStyles}`}
                                >
                                    Dados do restaurante
                                </Dialog.Description>
                                <div>
                                    <p className={`${textStyles} text`}>
                                        Restaurante:{' '}
                                        <strong>{restaurant!.name}</strong>
                                    </p>
                                    <p className={`${textStyles}`}>
                                        Nº do pedido:{' '}
                                        <strong> {orderFound?.id} </strong>
                                    </p>
                                    <p className={`${textStyles}`}>
                                        Data:{' '}
                                        <strong>{orderDateFormated}</strong>
                                    </p>
                                </div>

                                {orderFound?.clients ? (
                                    <>
                                        <Dialog.Description
                                            className={`${descriptionsStyles}`}
                                        >
                                            Dados do cliente
                                        </Dialog.Description>

                                        <div>
                                            <p
                                                className={`${textStyles} text-left `}
                                            >
                                                Nome:{' '}
                                                <strong>
                                                    {' '}
                                                    {orderFound?.clients?.name}
                                                </strong>
                                            </p>
                                            <p
                                                className={`${textStyles} font-sans text-left `}
                                            >
                                                Telefone:{' '}
                                                <strong>
                                                    {' '}
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
                                                Endereço:
                                                <strong>
                                                    {address.logradouro},
                                                    {
                                                        orderFound?.clients
                                                            .addresses?.number
                                                    }
                                                </strong>
                                            </p>
                                            <p className={`${textStyles}`}>
                                                Bairro:
                                                <strong>
                                                    {' '}
                                                    {address.bairro}{' '}
                                                </strong>
                                            </p>
                                            <p className={`${textStyles}`}>
                                                Cidade:
                                                <strong>
                                                    {address.localidade},
                                                    {address.uf}
                                                </strong>
                                            </p>
                                        </div>
                                    </>
                                ) : null}
                                <p className={`${textStyles}`}>
                                    Metódo de P. :
                                    <strong>
                                        {' '}
                                        {orderFound?.payment_methods.name}
                                    </strong>
                                </p>

                                <Dialog.Description
                                    className={`${descriptionsStyles}`}
                                >
                                    Detalhes do pedido
                                </Dialog.Description>

                                <table className="mb-2 w-full">
                                    <thead>
                                        <tr>
                                            <td className={`${textStyles} `}>
                                                Qnt
                                            </td>
                                            <td className={`${textStyles}`}>
                                                Item
                                            </td>
                                            <td
                                                className={`${textStyles} w-24`}
                                            >
                                                Preço
                                            </td>
                                            <td
                                                className={`${textStyles} w-24 hideButtonToPrint`}
                                            >
                                                Obs.
                                            </td>
                                            {/* {thereAnyObservation ? (
                                        ) : null} */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.map((product) => {
                                            const orderProductByProductId =
                                                orderProductFiltered.find(
                                                    (op) =>
                                                        op.product_id ===
                                                        product.id
                                                );

                                            if (product === undefined) {
                                                return;
                                            }
                                            return (
                                                <tr key={product.id}>
                                                    <td
                                                        className={`${textStyles}`}
                                                    >
                                                        <strong>
                                                            {product.count}
                                                        </strong>
                                                    </td>
                                                    <td
                                                        className={`${textStyles}`}
                                                    >
                                                        <strong>
                                                            {product.name}
                                                        </strong>
                                                    </td>
                                                    <td
                                                        className={`${textStyles}`}
                                                    >
                                                        <strong>
                                                            R$ {product.price}
                                                        </strong>
                                                    </td>
                                                    <td
                                                        className={`${textStyles} hideButtonToPrint`}
                                                    >
                                                        <strong>
                                                            <DropdownMenuObservation
                                                                orderProduct={
                                                                    orderProductByProductId!
                                                                }
                                                                additionals={
                                                                    additionals
                                                                }
                                                            />
                                                        </strong>
                                                    </td>
                                                    {/* {orderProductByProductId?.observation ? (
                                                ): null} */}
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>

                                <div>
                                    <p className="grid grid-cols-2 items-center gap-10">
                                        <span className={`${textStyles}`}>
                                            sub-total:
                                        </span>
                                        <span className={`${textStyles}`}>
                                            <strong>
                                                R$
                                                {totalPriceOfProducts +
                                                    totalAdditionalPrice}
                                            </strong>
                                        </span>
                                    </p>
                                    {orderFound?.delivery_fees ? (
                                        <p className="grid grid-cols-2 items-center gap-10">
                                            <span className={`${textStyles} `}>
                                                Taxa de entrega:
                                            </span>
                                            <span className={`${textStyles}`}>
                                                <strong>
                                                    R$
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
                                            Total a pagar:
                                        </span>
                                        <span className={`${textStyles} w-`}>
                                            <strong>
                                                R$
                                                {totalPriceOfProducts +
                                                    (orderFound?.delivery_fees
                                                        ? orderFound
                                                              .delivery_fees.fee
                                                        : 0) +
                                                    totalAdditionalPrice}
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
                                            onAfterPrint={() =>
                                                moveToEmProduçãoCard(
                                                    orderFound?.id!
                                                )
                                            }
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
                                        trigger={() => {
                                            return (
                                                <CardapioDigitalButton
                                                    name="Imprimir"
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
