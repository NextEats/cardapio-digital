import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import NewRequests from '../../../components/admin/initialPage/NewRequests';
import OrderStatusCard from '../../../components/admin/initialPage/OrderStatusCard';
import {
    iStatusReducer,
    statusReducer,
} from '../../../reducers/statusReducer/reducer';

import {
    iAdditionals,
    iCashBox,
    iCashBoxes,
    iInsertAddresses,
    iInsertClients,
    iInsertContacts,
    iInsertOrderStatuss,
    iOrdersProducts,
    iOrdersTablesWithFkData,
    iOrdersWithFKData,
    iProducts,
    iRestaurantWithFKData,
    iSelects,
} from '../../../types/types';

import { OrderModal } from '@/src/components/admin/initialPage/OrderModal';
import LoadingSpinner from '@/src/components/LoadingSpinner';
import { getOrdersTablesFetch } from '@/src/fetch/ordersTables/getOrdersTables';
import { useAudioAlert } from '@/src/hooks/useAudioAlert';
import { addNewUnderReviewAction } from '@/src/reducers/statusReducer/action';
import { api, supabase } from '@/src/server/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export interface iAdminHomePageProps {
    ordersData: iOrdersWithFKData[];
    orderStatuss: iInsertOrderStatuss['data'];
    ordersProductsData: iOrdersProducts['data'];
    products: iProducts['data'];
    clients: iInsertClients['data'];
    contacts: iInsertContacts['data'];
    addresses: iInsertAddresses['data'];
    cashBoxes: iCashBoxes['data'];
    additionals: iAdditionals['data'];
    selects: iSelects['data'];
    ordersTablesData: iOrdersTablesWithFkData[];
    restaurant: iRestaurantWithFKData;
}

export default function Delivery({
    ordersData,
    ordersProductsData,
    products,
    cashBoxes,
    additionals,
    selects,
    ordersTablesData,
    restaurant,
}: iAdminHomePageProps) {
    const [ordersTables, setOrdersTables] =
        useState<iOrdersTablesWithFkData[]>(ordersTablesData);
    const [ordersProducts, setOrdersProducts] =
        useState<iOrdersProducts['data']>(ordersProductsData);
    const [orders, setOrders] = useState<iOrdersWithFKData[]>(ordersData);
    const cashBoxOpened = cashBoxes.find((cb) => cb.is_open === true);
    const [cashBoxState, setCashBoxState] = useState<
        iCashBox['data'] | undefined
    >(cashBoxOpened);

    const printComponent = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (cashBoxState === undefined) {
            setOrders([]);
        } else {
            const filterOrdersData = ordersData.filter(
                (o) => o.cash_box_id === cashBoxState!.id
            );
            setOrders(filterOrdersData);
        }
    }, [ordersData, cashBoxState]);

    const ordersGroupedByOrderStatus = orders.reduce(
        (acc: { [key: string]: iOrdersWithFKData[] }, obj) => {
            const status_name = obj.order_status.status_name;
            if (!acc[status_name]) {
                acc[status_name] = [];
            }
            acc[status_name].push(obj);
            return acc;
        },
        {}
    );

    const [ordersState, ordersDispatch] = useReducer<
        (state: iStatusReducer, action: any) => iStatusReducer
    >(statusReducer, {
        orders: orders,
        isOpenOrderModal: false,
        orderId: 0,
    });

    useAudioAlert(ordersGroupedByOrderStatus, '/alertAudio.mp3');

    useMemo(() => {
        async function newOrder(payload: any) {
            const getNewOrder = await api.get(`/api/orders/${restaurant.id}`);

            const orderData: iOrdersWithFKData[] = getNewOrder.data;
            const ordersFilterend = orderData.filter(
                (o) => o.cash_box_id === cashBoxState?.id
            );
            setOrders(ordersFilterend);

            const findNewOrder = ordersFilterend.find(
                (o) => o.id === payload.new.id
            );
            if (findNewOrder)
                ordersDispatch(addNewUnderReviewAction(findNewOrder!));
        }
        const channel = supabase
            .channel('db-changes')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                },
                (payload: any) => {
                    newOrder(payload);
                }
            )
            .subscribe();
    }, [restaurant, cashBoxState]);

    async function newOrdersProducts() {
        const { data: getNewOrdersProducts } = await supabase
            .from('orders_products')
            .select('*')
            .order('created_at', { ascending: false });

        const getNewOrdersTables = await getOrdersTablesFetch();

        if (!getNewOrdersProducts) {
            return;
        }

        setOrdersProducts(getNewOrdersProducts);
        setOrdersTables(getNewOrdersTables);
    }
    const channel = supabase
        .channel('db-orders_products')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'orders_products',
            },
            (payload: any) => {
                newOrdersProducts();
            }
        )
        .subscribe();

    supabase
        .channel('db-cash')
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'cash_boxes',
            },
            (payload: any) => {
                if (payload.eventType === 'UPDATE') {
                    setOrders([]);
                    setCashBoxState(undefined);
                    toast.success('Caixa fechado!', {
                        theme: 'light',
                    });
                }
                if (payload.eventType === 'INSERT') {
                    setCashBoxState(payload.new);
                    toast.success('Caixa aberto!', {
                        theme: 'light',
                    });
                }
            }
        )
        .subscribe();

    if (
        !ordersData ||
        !ordersProducts ||
        !products ||
        !cashBoxes ||
        !restaurant
    ) {
        return <LoadingSpinner />;
    }

    return (
        <div className="flex flex-col gap-4 pb-24">
            <NewRequests
                dispatch={ordersDispatch}
                ordersState={ordersState}
                ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                ordersProducts={ordersProducts}
                products={products}
            />

            <OrderStatusCard
                ordersTables={ordersTables}
                statusName="Em produção"
                dispatch={ordersDispatch}
                ordersState={ordersState}
                ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                ordersProducts={ordersProducts}
                products={products}
            />
            <OrderStatusCard
                statusName="A caminho"
                ordersTables={ordersTables}
                dispatch={ordersDispatch}
                ordersState={ordersState}
                ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                ordersProducts={ordersProducts}
                products={products}
            />
            <OrderStatusCard
                statusName="Entregue"
                ordersTables={ordersTables}
                dispatch={ordersDispatch}
                ordersState={ordersState}
                ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                ordersProducts={ordersProducts}
                products={products}
            />

            {ordersState.isOpenOrderModal ? (
                <OrderModal
                    printComponent={printComponent}
                    ordersTables={ordersTables}
                    ordersState={ordersState}
                    ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                    restaurant={restaurant}
                    ordersProducts={ordersProducts}
                    products={products}
                    additionals={additionals}
                    selects={selects}
                    ordersDispatch={ordersDispatch}
                />
            ) : null}
        </div>
    );
}
