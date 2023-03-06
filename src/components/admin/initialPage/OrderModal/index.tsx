import {
    iAdditionals,
    iInsertOrdersProducts,
    iInsertProducts,
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
import { Br, Cut, Line, Printer, Text, Row, render } from 'react-thermal-printer';



interface iOrderModalProps {
    ordersState: iStatusReducer;
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

    console.log(ordersState);

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
        'text-sm font-semibold text-gray-red-400 text-center mb-3 mt-6';
    const textStyles =
        'text-sm font-semibold text-gray-red-400 text-left leading-6';

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




    // const receipt = (
    //     <Printer type="epson" width={42} characterSet="korea">
    //         <Text size={{ width: 2, height: 2 }}>9,500원</Text>
    //         <Text bold={true}>결제 완료</Text>
    //         <Br />
    //         <Line />
    //         <Row left="Nomeasdasd" right={orderFound?.clients?.name!} />
    //         <Row left="Número" right={'sdfsldmfs'} />
    //         <Row left="할부기간" right="일시불" />
    //         <Row left="결제금액" right="9,500" />
    //         <Row left="부가세액" right="863" />
    //         <Row left="공급가액" right="8,637" />
    //         <Line />
    //         <Row left="맛있는 옥수수수염차 X 2" right="11,000" />
    //         <Text>옵션1(500)/옵션2/메모</Text>
    //         <Row left="(-) 할인" right="- 500" />
    //         <Br />
    //         <Line />
    //         <Row left="합계" right="9,500" />
    //         <Row left="(-) 할인 2%" right="- 1,000" />
    //         <Line />
    //         <Row left="대표" right="김대표" />
    //         <Row left="사업자등록번호" right="000-00-00000" />
    //         <Row left="대표번호" right="0000-0000" />
    //         <Row left="주소" right="어디시 어디구 어디동 몇동몇호" />
    //         <Line />
    //         <Br />
    //         <Text align="center">Wifi: some-wifi / PW: 123123</Text>
    //         <Cut />
    //     </Printer>
    // );

    async function handleThermalPrint() {

        const print = await api.post('api/print')
        console.log(print)
        // const url = 'https://web.whatsapp.com/send?phone=87998199329&text=edu&app_absent=0'
        // window.open(url)

        // try {
        //     const data: Uint8Array = await render(receipt);
        //     const port = await navigator.serial.requestPort();
        //     await port.open({ baudRate: 9600 });
        //     const writer = port.writable?.getWriter();
        //     if (writer != null) {
        //         await writer.write(data);
        //         writer.releaseLock();
        //     }
        //     console.log(port);
        // } catch (error) {
        //     console.error(error);
        // }
        // const data = await render(
        //     <Printer type="epson" characterSet='pc860_portuguese'>
        //         <Text>Hello World</Text>
        //     </Printer>
        // );

        // const port = await window.navigator.serial.requestPort();
        // await port.open({ baudRate: 9600 });

        // const writer = port.writable?.getWriter();
        // if (writer != null) {
        //     await writer.write(data);
        //     writer.releaseLock();
        // }

        // const data: Uint8Array = await render(receipt);
        // const port = await window.navigator.serial.requestPort();
        // await port.open({ baudRate: 9600 });
        // const writer = port.writable?.getWriter();
        // if (writer != null) {
        //     await writer.write(data);
        //     writer.releaseLock();
        // }
        // console.log(port);
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
                        <Dialog.Content
                            ref={printComponent}
                            className="bg-white shadow-bd w-[350px] md:w-[550px] fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  rounded-md p-6"
                        >
                            <Dialog.Title className="text-xl font-bold text-center">
                                {' '}
                                Next Eats{' '}
                            </Dialog.Title>

                            <Dialog.Description
                                className={`${descriptionsStyles}`}
                            >
                                Dados do restaurante
                            </Dialog.Description>

                            <div>
                                <p className={`${textStyles} text`}>
                                    &nbsp; Restaurante:{' '}
                                    <strong>{restaurant!.name}</strong>
                                    &nbsp;
                                </p>
                                <p className={`${textStyles}`}>
                                    &nbsp; Nº do pedido:{' '}
                                    <strong> {orderFound?.id} </strong>&nbsp;
                                </p>
                                <p className={`${textStyles}`}>
                                    Data:
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
                                        <p className={`${textStyles}`}>
                                            &nbsp; Nome:{' '}
                                            <strong>
                                                {orderFound?.clients?.name}
                                            </strong>
                                            &nbsp;
                                        </p>
                                        <p className={`${textStyles}`}>
                                            &nbsp; Telefone:{' '}
                                            <strong>
                                                {' '}
                                                {
                                                    orderFound?.clients.contacts
                                                        ?.phone
                                                }{' '}
                                            </strong>
                                            &nbsp;
                                        </p>
                                        <p className={`${textStyles}`}>
                                            &nbsp; Email:{' '}
                                            <strong>
                                                {' '}
                                                {
                                                    orderFound?.clients.contacts
                                                        ?.email
                                                }{' '}
                                            </strong>
                                            &nbsp;
                                        </p>
                                        <p className={`${textStyles}`}>
                                            &nbsp; Endereço:&nbsp;
                                            <strong>
                                                &nbsp;
                                                {address.logradouro},{' '}
                                                {
                                                    orderFound?.clients
                                                        .addresses?.number
                                                }
                                                &nbsp;
                                            </strong>
                                            &nbsp;
                                        </p>
                                        <p className={`${textStyles}`}>
                                            &nbsp; Bairro:{' '}
                                            <strong> {address.bairro} </strong>
                                            &nbsp;
                                        </p>
                                        <p className={`${textStyles}`}>
                                            &nbsp; Cidade:&nbsp;
                                            <strong>
                                                &nbsp;
                                                {address.localidade},{' '}
                                                {address.uf}&nbsp;
                                            </strong>
                                            &nbsp;
                                        </p>
                                    </div>
                                </>
                            ) : null}

                            <Dialog.Description
                                className={`${descriptionsStyles}`}
                            >
                                Detalhes do pedido
                            </Dialog.Description>

                            <table className="mb-4 w-full">
                                <thead>
                                    <tr>
                                        <td className={`${textStyles}`}>
                                            {' '}
                                            Qnt{' '}
                                        </td>
                                        <td className={`${textStyles}`}>
                                            {' '}
                                            Item{' '}
                                        </td>
                                        <td className={`${textStyles} w-24`}>
                                            {' '}
                                            Preço{' '}
                                        </td>
                                        <td
                                            className={`${textStyles} w-24 hideButtonToPrint`}
                                        >
                                            {' '}
                                            Obs.{' '}
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
                                                    op.product_id === product.id
                                            );

                                        if (product === undefined) {
                                            return;
                                        }
                                        return (
                                            <tr key={product.id}>
                                                <td className={`${textStyles}`}>
                                                    <strong>
                                                        {' '}
                                                        {product.count}{' '}
                                                    </strong>
                                                </td>
                                                <td className={`${textStyles}`}>
                                                    <strong>
                                                        {' '}
                                                        {product.name}{' '}
                                                    </strong>
                                                </td>
                                                <td className={`${textStyles}`}>
                                                    <strong>
                                                        {' '}
                                                        R$ {product.price}{' '}
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
                                                    &nbsp;
                                                </td>
                                                {/* {orderProductByProductId?.observation ? (
                                                ): null} */}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>

                            <div>
                                <p className="grid grid-cols-2 items-center gap-20">
                                    <span className={`${textStyles}`}>
                                        sub-total:
                                    </span>
                                    <span className={`${textStyles}`}>
                                        <strong>
                                            {' '}
                                            R${' '}
                                            {totalPriceOfProducts +
                                                totalAdditionalPrice}{' '}
                                        </strong>
                                    </span>
                                </p>
                                {orderFound?.delivery_fees ? (
                                    <p className="grid grid-cols-2 items-center gap-20">
                                        <span className={`${textStyles} `}>
                                            Taxa de entrega:
                                        </span>
                                        <span className={`${textStyles}`}>
                                            <strong>
                                                {' '}
                                                R${' '}
                                                {
                                                    orderFound?.delivery_fees
                                                        .fee
                                                }{' '}
                                            </strong>
                                        </span>
                                    </p>
                                ) : null}

                                <p className="grid grid-cols-2 items-center gap-20">
                                    <span className={`${textStyles}`}>
                                        Total a pagar:{' '}
                                    </span>
                                    <span className={`${textStyles} w-`}>
                                        <strong>
                                            R${' '}
                                            {totalPriceOfProducts +
                                                (orderFound?.delivery_fees
                                                    ? orderFound.delivery_fees
                                                        .fee
                                                    : 0) +
                                                totalAdditionalPrice}{' '}
                                        </strong>
                                    </span>
                                </p>
                            </div>

                            <div className="flex flex-1 items-center justify-end gap-3 mt-5 hideButtonToPrint">
                                {orderFound?.order_status.status_name ===
                                    'em análise' ? (
                                    <ReactToPrint
                                        copyStyles={true}
                                        content={() => printComponent.current}
                                        onAfterPrint={() =>
                                            moveToEmProduçãoCard(
                                                orderFound?.id!
                                            )
                                        }
                                        trigger={() => {
                                            return (
                                                <CardapioDigitalButton
                                                    name="Imprimir e aceitar o pedido"
                                                    w="w-80"
                                                    h="h-8"
                                                />
                                            );
                                        }}
                                    />
                                ) : null}
                                <ReactToPrint
                                    copyStyles={true}
                                    content={() => printComponent.current}
                                    trigger={() => {
                                        return (
                                            <CardapioDigitalButton
                                                name="Imprimir"
                                                w="flex-1"
                                                h="h-8"
                                            />
                                        );
                                    }}
                                />
                                <CardapioDigitalButton
                                    name="Confirmar"
                                    w="flex-1"
                                    h="h-8"
                                    onClick={async () => await handleThermalPrint()}
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
                    </Dialog.Portal>
                </Dialog.Root>
            </div>
        </>
    );
}
