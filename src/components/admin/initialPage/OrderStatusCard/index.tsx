import {
    getModalDataAction,
    showModalAction,
} from '@/src/reducers/statusReducer/action';
import { supabase } from '@/src/server/api';
import Image from 'next/image';
import { Dispatch } from 'react';
import { AiFillEye } from 'react-icons/ai';
import { BiArrowFromLeft } from 'react-icons/bi';
import { iStatusReducer } from '../../../../reducers/statusReducer/reducer';
import {
    iInsertOrdersProducts,
    iInsertProducts,
    iOrdersWithFKData,
} from '../../../../types/types';

interface IOrderStatusCardProps {
    statusName: string;
    ordersState: iStatusReducer;
    dispatch: Dispatch<any>;
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    ordersProducts: iInsertOrdersProducts['data'];
    products: iInsertProducts['data'];
}

export default function OrderStatusCard({
    statusName,
    dispatch,
    ordersGroupedByOrderStatus,
    ordersProducts,
    products,
}: IOrderStatusCardProps) {
    let orders;
    if (statusName === 'Em produção')
        orders = ordersGroupedByOrderStatus['em produção'];
    else if (statusName === 'A caminho')
        orders = ordersGroupedByOrderStatus['a caminho'];
    else if (statusName === 'Entregue')
        orders = ordersGroupedByOrderStatus['entregue'];

    const tdStyle =
        'border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium';

    async function switchStatus(orderId: number) {
        if (statusName === 'Em produção') {
            await supabase
                .from('orders')
                .update({ order_status_id: 4 })
                .eq('id', orderId);
        } else if (statusName === 'A caminho') {
            await supabase
                .from('orders')
                .update({ order_status_id: 1 })
                .eq('id', orderId);
        }
    }

    function showModal(orderId: number) {
        dispatch(showModalAction());
        dispatch(getModalDataAction(orderId));
    }

    return (
        <div className="flex flex-1 max-h-[240px]  lg:w-full flex-col shadow-sm px-4 pt-2 pb-4 scrollbar-custom">
            <div className=" flex items-center justify-between mb-4">
                <h2 className="text-base font-bold"> {statusName} </h2>
                <span className="text-md font-medium">{''}</span>
            </div>

            <div className='w-full overflow-auto  scrollbar-custom'>


                <table className="w-full  ">
                    <tbody className="w-full border-collapse">
                        {orders?.map((order) => {
                            if (!order) {
                                return;
                            }
                            const ordersProductsFiltered = ordersProducts.filter(
                                (op) => op.order_id === order.id!
                            );
                            const productsFiltered = ordersProductsFiltered.map(
                                (op) => {
                                    return products[
                                        products.findIndex(
                                            (p) => op.product_id === p.id
                                        )
                                    ];
                                }
                            );

                            return (
                                <tr
                                    key={order.id}
                                    className="w-full h-4 text-center "
                                >
                                    <td className=" min-w-8 mx-2">
                                        <Image
                                            src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
                                            alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                                            className="rounded-full "
                                            width={26}
                                            height={26}
                                        />
                                    </td>
                                    <td className="text-left text-sm font-medium px-2  max-w-20 truncate 2xs:table-cell md:hidden xl:table-cell">
                                        {order.clients ? <span className=""> {order.clients.name} </span>
                                            : <span className="text-green-400 "> Mesa </span>
                                        }
                                    </td>
                                    <td
                                        className={`${tdStyle} px-5  hidden sm:table-cell md:hiden 2xl:table-cell`}
                                    >
                                        {productsFiltered.length}
                                    </td>
                                    <td className={`${tdStyle}`}>
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => showModal(order.id!)}
                                                className="rounded-full pl-[1px] w-8 h-6 bg-gray-400 cursor-pointer flex items-center justify-center"
                                            >
                                                <AiFillEye className="text-xl text-white" />
                                            </button>
                                            {statusName !== 'Entregue' ? (
                                                <button
                                                    onClick={() =>
                                                        switchStatus(order.id!)
                                                    }
                                                    className=" w-12 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center"
                                                >
                                                    <BiArrowFromLeft className="text-xl text-white" />
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
    );
}
