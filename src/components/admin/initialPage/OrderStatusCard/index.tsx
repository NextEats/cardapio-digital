import { removeNonAlphaNumeric } from '@/src/components/Cart/SubmitForm';
import { AdminContext } from '@/src/contexts/adminContext';
import { updateOrderFetch } from '@/src/fetch/orders/updateOrder';
import {
    getModalDataAction,
    showModalAction,
} from '@/src/reducers/statusReducer/action';
import { supabase, whatsappRestApi } from '@/src/server/api';
import { Dispatch, useContext } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BiArrowFromLeft } from 'react-icons/bi';
import { FiX } from 'react-icons/fi';
import { iStatusReducer } from '../../../../reducers/statusReducer/reducer';
import {
    iInsertOrdersProducts,
    iInsertProducts,
    iOrdersTablesWithFkData,
    iOrdersWithFKData,
} from '../../../../types/types';

interface IOrderStatusCardProps {
    statusName: string;
    ordersState: iStatusReducer;
    dispatch: Dispatch<any>;
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    ordersProducts: iInsertOrdersProducts['data'];
    products: iInsertProducts['data'];
    ordersTables: iOrdersTablesWithFkData[];
}

export default function OrderStatusCard({
    statusName,
    dispatch,
    ordersGroupedByOrderStatus,
    ordersProducts,
    products,
    ordersTables,
}: IOrderStatusCardProps) {
    const restaurant = useContext(AdminContext).restaurant;

    let orders;
    if (statusName === 'Em produção')
        orders = ordersGroupedByOrderStatus['em produção'];
    else if (statusName === 'A caminho')
        orders = ordersGroupedByOrderStatus['a caminho'];
    else if (statusName === 'Entregue')
        orders = ordersGroupedByOrderStatus['entregue'];

    const tdStyle =
        'border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium';

    const handleCancelOrder = (orderId: any) => {
        updateOrderFetch({
            order_id: orderId,
            order_status_id: 5,
        });
    };

    async function switchStatus(orderId: number) {
        if (statusName === 'Em produção') {
            const { data: orderWithUpdatedStatus } = await supabase
                .from('orders')
                .update({ order_status_id: 4 })
                .eq('id', orderId)
                .select('*, clients ( *, contacts (*) )');

            if (!orderWithUpdatedStatus || !orderWithUpdatedStatus[0]) {
                return;
            }

            const order = orderWithUpdatedStatus[0] as unknown as any;

            const isTakeout = order.order_type_id == 2;

            if (isTakeout) {
                try {
                    await whatsappRestApi({
                        method: 'post',
                        url: '/send-message',
                        data: {
                            id: restaurant!.slug,
                            number: '55' + order.clients.contacts.phone,
                            message:
                                '😊 O seu pedido está pronto para retirada!',
                        },
                    });
                } catch (err) {
                    console.error(err);
                }
            } else {
                try {
                    await whatsappRestApi({
                        method: 'post',
                        url: '/send-message',
                        data: {
                            id: restaurant!.slug,
                            number: '55' + order.clients.contacts.phone,
                            message: '🏍 O seu pedido está a caminho!',
                        },
                    });
                } catch (err) {
                    console.error(err);
                }
            }
        } else if (statusName === 'A caminho') {
            const { data: orderWithUpdatedStatus } = await supabase
                .from('orders')
                .update({ order_status_id: 1 })
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
                        message: '☑ O seu pedido foi entregue com sucesso!',
                    },
                });
            } catch (err) {
                console.error(err);
            }
        }
    }

    function showModal(orderId: number) {
        dispatch(showModalAction());
        dispatch(getModalDataAction(orderId));
    }

    orders?.sort((a, b) => {
        return a.number - b.number;
    });

    return (
        <>
            <div className="flex flex-1 min-h-[150px] max-h-[270px] lg:w-full flex-col shadow-sm px-4 pt-2 pb-10 last:mb-6 scrollbar-custom">
                <div className=" flex items-center justify-between mb-4">
                    <h2 className="text-base font-bold"> {statusName} </h2>
                    <span className="text-md font-medium">{''}</span>
                </div>

                <div className="w-full overflow-auto scrollbar-custom">
                    <table className="w-full  ">
                        <tbody className="w-full border-collapse">
                            {orders?.map((order) => {
                                if (
                                    !order ||
                                    order.order_types.name == 'Mesa'
                                ) {
                                    return;
                                }

                                const ordersTablesFound = ordersTables.find(
                                    (ot) => ot.orders.id === order.id
                                );

                                const ordersProductsFiltered =
                                    ordersProducts.filter(
                                        (op) => op.order_id === order.id!
                                    );

                                const productsFiltered =
                                    ordersProductsFiltered.map((op) => {
                                        return products[
                                            products.findIndex(
                                                (p) => op.product_id === p.id
                                            )
                                        ];
                                    });

                                return (
                                    <tr
                                        key={order.id}
                                        className="w-full h-4 text-center"
                                    >
                                        <td className="text-left text-sm font-medium px-2  max-w-20 truncate 2xs:table-cell  xl:table-cell">
                                            #
                                            {order.number
                                                .toString()
                                                .padStart(4, '0')}
                                        </td>
                                        <td
                                            className={`${tdStyle}  pl-2 text-left text-sm font-medium px-2 max-w-20 truncate xl:table-cell hidden 3xs:table-cell`}
                                        >
                                            {order.clients ? (
                                                <span className="">
                                                    {order.clients.name}
                                                </span>
                                            ) : (
                                                <span className="text-green-400 ">
                                                    {
                                                        ordersTablesFound
                                                            ?.tables.name
                                                    }
                                                </span>
                                            )}
                                        </td>
                                        <td
                                            className={`${tdStyle} px-5 hidden sm:table-cell md:hiden 2xl:table-cell`}
                                        >
                                            {productsFiltered.length}
                                        </td>
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
                                                {statusName !== 'Entregue' &&
                                                order.order_types.name !==
                                                    'Mesa' ? (
                                                    <button
                                                        onClick={() =>
                                                            switchStatus(
                                                                order.id!
                                                            )
                                                        }
                                                        className="w-12 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center"
                                                    >
                                                        <BiArrowFromLeft className="text-xl text-white" />
                                                    </button>
                                                ) : null}

                                                {statusName !== 'Entregue' ? (
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
                                                ) : null}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
