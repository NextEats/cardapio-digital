import { removeNonAlphaNumeric } from '@/src/components/Cart/SubmitForm';
import { AdminContext } from '@/src/contexts/adminContext';
import { updateOrderFetch } from '@/src/fetch/orders/updateOrder';
import { Dispatch, useContext, useState } from 'react';
import { AiFillEye, AiOutlineCheck } from 'react-icons/ai';
import { FiX } from 'react-icons/fi';

import {
    getModalDataAction,
    showModalAction,
} from '../../../../reducers/statusReducer/action';
import { iStatusReducer } from '../../../../reducers/statusReducer/reducer';
import { supabase, whatsappRestApi } from '../../../../server/api';
import {
    iInsertOrdersProducts,
    iInsertProducts,
    iOrdersWithFKData,
} from '../../../../types/types';

interface iAddressData {
    bairro: string;
    cep: string;
    complemento: string;
    ddd: string;
    gia: string;
    ibge: string;
    localidade: string;
    logradouro: string;
    siafi: string;
    uf: string;
}
interface iNewRequestProps {
    ordersState: iStatusReducer;
    dispatch: Dispatch<any>;
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    ordersProducts: iInsertOrdersProducts['data'];
    products: iInsertProducts['data'];
}

export default function NewRequests({
    dispatch,
    ordersGroupedByOrderStatus,
    ordersProducts,
    products,
}: iNewRequestProps) {
    const [addressState, setAddressState] = useState({
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

    const restaurant = useContext(AdminContext).restaurant;

    const tdStyle =
        'border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium';

    const handleCancelOrder = (orderId: any) => {
        updateOrderFetch({
            order_id: orderId,
            order_status_id: 5,
        });
    };

    async function moveToEmProduçãoCard(orderId: number) {
        const { data: orderWithUpdatedStatus } = await supabase
            .from('orders')
            .update({ order_status_id: 3 })
            .eq('id', orderId)
            .select('*, clients ( *, contacts (*) )');

        if (!orderWithUpdatedStatus || !orderWithUpdatedStatus[0]) {
            return;
        }

        const whatsappNumber = orderWithUpdatedStatus[0] as unknown as any;

        try {
            await whatsappRestApi({
                method: 'post',
                url: '/send-message',
                data: {
                    id: restaurant!.slug,
                    number:
                        '55' +
                        removeNonAlphaNumeric(
                            whatsappNumber.clients.contacts.phone
                        ),
                    message:
                        '😊✅ Olá! O seu pedido foi aprovado e já começou a ser preparado!',
                },
            });
        } catch (err) {
            console.error(err);
        }
    }

    function showModal(orderId: number) {
        dispatch(showModalAction());
        dispatch(getModalDataAction(orderId));
    }

    ordersGroupedByOrderStatus['em análise']?.sort((a, b) => {
        return a.number - b.number;
    });

    return (
        <div className="flex flex-1 flex-col min-h-[150px] max-h-[230px] bg-white w-auto shadow-sm px-6 pt-2 rounded-md ">
            <h2 className="text-base font-bold mb-4">Novos pedidos</h2>
            <div className="w-full overflow-auto scrollbar-custom">
                <table className="w-full ">
                    <tbody className="w-full border-collapse ">
                        {ordersGroupedByOrderStatus['em análise']?.map(
                            (order) => {
                                const ordersProductsFiltered =
                                    ordersProducts.filter(
                                        (op) => op.order_id === order.id
                                    );
                                const productsFiltered =
                                    ordersProductsFiltered.map((op) => {
                                        return products[
                                            products.findIndex(
                                                (p) => op.product_id === p.id
                                            )
                                        ];
                                    });
                                const totalProductsPrice =
                                    productsFiltered.reduce(
                                        (acc, p) => acc + p.price,
                                        0
                                    );

                                const phone =
                                    order.clients?.contacts.phone?.toString();

                                return (
                                    <tr
                                        key={order.id!}
                                        className="w-full h-4 text-center"
                                    >
                                        <td
                                            className={`${tdStyle}text-left h-4 text-sm font-medium p-2`}
                                        >
                                            #
                                            {order.number
                                                .toString()
                                                .padStart(4, '0')}
                                        </td>
                                        <td
                                            className={`${tdStyle}text-left h-4 text-sm font-medium p-2  hidden 3xs:table-cell`}
                                        >
                                            {order?.clients?.name}
                                        </td>
                                        <td
                                            className={`${tdStyle} w-16 hidden sm:table-cell md:hiden 2xl:table-cell`}
                                        >
                                            {productsFiltered.length}
                                        </td>
                                        {/* <td
                                            className={`${tdStyle} hidden 3xs:table-cell`}
                                        >
                                            R$ {totalProductsPrice}
                                        </td> */}
                                        {/* {phone ? (
                                            <td
                                                className={`${tdStyle} w-auto text-ellipsis whitespace-nowrap overflow-hidden hidden sm:table-cell`}
                                            >
                                                {'( ' +
                                                    phone?.slice(0, 2) +
                                                    ' ) ' +
                                                    phone?.slice(2, 7) +
                                                    '-' +
                                                    phone?.slice(
                                                        7,
                                                        phone.length
                                                    )}
                                            </td>
                                        ) : null} */}
                                        <td className={`${tdStyle}`}>
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() =>
                                                        showModal(order.id!)
                                                    }
                                                    className="w-12 h-6 pb-[1px] rounded-full   text-white text-base font-bold bg-gray-400 cursor-pointer flex items-center justify-center"
                                                >
                                                    <AiFillEye className="text-xl text-white" />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        moveToEmProduçãoCard(
                                                            order.id!
                                                        )
                                                    }
                                                    className=" w-10 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center"
                                                >
                                                    <AiOutlineCheck className="w-4 h-4 " />
                                                </button>

                                                <button
                                                    className="bg-red-600 w-12 h-6 pb-[1px] rounded-full   text-white text-base font-bold flex items-center justify-center"
                                                    onClick={() => {
                                                        handleCancelOrder(
                                                            order.id!
                                                        );
                                                    }}
                                                >
                                                    <FiX color="white" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
