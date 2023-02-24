import { GetServerSideProps } from 'next';
import { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import AdminWrapper from '../../../components/admin/AdminWrapper';
import { Card } from '../../../components/admin/Card';
import NewRequests from '../../../components/admin/initialPage/NewRequests';
import OrderStatusCard from '../../../components/admin/initialPage/OrderStatusCard';
import {
    iStatusReducer,
    statusReducer,
} from '../../../reducers/statusReducer/reducer';
import {
    iCashBox,
    iCashBoxes,
    iInsertAddresses,
    iInsertClients,
    iInsertContacts,
    iInsertOrdersProducts,
    iInsertOrderStatuss,
    iInsertProducts,
    iOrdersWithFKData,
    iRestaurantWithFKData,
} from '../../../types/types';

import { getAddressesFetch } from 'src/fetch/addresses/getAddresses';
import { getCashBoxesByRestaurantIdFetch } from 'src/fetch/cashBoxes/getCashBoxesByRestaurantId';
import { getclientsFetch } from 'src/fetch/clients/getClients';
import { getContactsFetch } from 'src/fetch/contacts/getContacts';
import { getOrdersProductsFetch } from 'src/fetch/ordersProducts/getOrdersProducts';
import { getOrdersByRestaurantIdFetch } from '../../../fetch/orders/getOrdersByRestaurantId';
import { getProductsByRestaurantIdFetch } from '../../../fetch/products/getProductsByRestaurantId';
import { getRestaurantBySlugFetch } from '../../../fetch/restaurant/getRestaurantBySlug';

import CashBoxButtons from '@/src/components/admin/initialPage/CashBoxButtons';
import { OrderModal } from '@/src/components/admin/initialPage/OrderModal';
import LoadingSpinner from '@/src/components/LoadingSpinner';
import { api, supabase } from '@/src/server/api';
import 'react-toastify/dist/ReactToastify.css';

interface iAdminHomePageProps {
    ordersData: iOrdersWithFKData[];
    orderStatuss: iInsertOrderStatuss['data'];
    ordersProducts: iInsertOrdersProducts['data'];
    products: iInsertProducts['data'];
    clients: iInsertClients['data'];
    contacts: iInsertContacts['data'];
    addresses: iInsertAddresses['data'];
    cashBoxes: iCashBoxes['data'];
    restaurant: iRestaurantWithFKData;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    // const restaurant = await getRestaurantBySlugFetch(context.query.slug);
    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);
    return {
        props: {
            ordersData: await getOrdersByRestaurantIdFetch(restaurant.id),
            ordersProducts: await getOrdersProductsFetch(),
            products: await getProductsByRestaurantIdFetch(restaurant.id),
            clients: await getclientsFetch(),
            contacts: await getContactsFetch(),
            addresses: await getAddressesFetch(),
            cashBoxes: await getCashBoxesByRestaurantIdFetch(restaurant.id),
            restaurant,
        },
    };
};

export default function AdminHomepage({
    ordersData,
    ordersProducts,
    products,
    cashBoxes,
    restaurant,
}: iAdminHomePageProps) {
    const [orders, setOrders] = useState<iOrdersWithFKData[]>(ordersData);
    const cashBoxOpened = cashBoxes.find((cb) => cb.is_open === true);
    const [cashBoxState, setCashBoxState] = useState<
        iCashBox['data'] | undefined
    >(cashBoxOpened);

    const printComponent = useRef<HTMLDivElement>(null)

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

    function billing() {
        let ordersProductFiltered;
        if (ordersGroupedByOrderStatus['entregue']) {
            ordersProductFiltered = ordersProducts.filter((op) =>
                ordersGroupedByOrderStatus['entregue'].some(
                    (o) => o.id === op.order_id
                )
            );

            const productIds = ordersProductFiltered.map(
                (ordersProduct) => ordersProduct.product_id
            );
            const selectedProduct = productIds.map(
                (productId) =>
                    products[
                    products.findIndex(
                        (product) => productId === product.id
                    )
                    ]
            );
            return selectedProduct.reduce(
                (acc, product) => acc + product?.price!,
                0
            );
        } else {
            return 0;
        }
    }

    useMemo(() => {
        async function newOrder() {
            const getNewOrder = await api.get(`/api/orders/${restaurant.id}`);
            setOrders(getNewOrder.data);
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
                    console.log('entrou');
                    newOrder();
                }
            )
            .subscribe();
    }, [restaurant]);

    const channel = supabase
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
                    alert('Caixa fechado!');
                }
                if (payload.eventType === 'INSERT') {
                    setCashBoxState(payload.new);
                    alert('Caixa aberto!');
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
        <AdminWrapper>
            <div className="flex flex-col gap-8">
                <CashBoxButtons
                    cashBoxState={cashBoxState}
                    restaurantId={restaurant.id}
                    ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                    cashBoxes={cashBoxes}
                />

                <div className="grid 2xs:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Card
                        color="red"
                        name="Faturamento"
                        value={`R$ ${billing()}`}
                    />
                    <Card
                        color="green"
                        name="Pedidos"
                        value={
                            ordersGroupedByOrderStatus['entregue']
                                ? `${ordersGroupedByOrderStatus['entregue'].length}`
                                : '0'
                        }
                    />
                    <Card
                        color="yellow"
                        name="Produtos no Cardápio"
                        value={products.length.toString()}
                    />
                </div>

                <NewRequests
                    dispatch={ordersDispatch}
                    ordersState={ordersState}
                    ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                    ordersProducts={ordersProducts}
                    products={products}
                />

                <div className=" md:columns-3 gap-4">
                    <OrderStatusCard
                        statusName="Em produção"
                        dispatch={ordersDispatch}
                        ordersState={ordersState}
                        ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                        ordersProducts={ordersProducts}
                        products={products}
                    />
                    <OrderStatusCard
                        statusName="A caminho"
                        dispatch={ordersDispatch}
                        ordersState={ordersState}
                        ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                        ordersProducts={ordersProducts}
                        products={products}
                    />
                    <OrderStatusCard
                        statusName="Entregue"
                        dispatch={ordersDispatch}
                        ordersState={ordersState}
                        ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                        ordersProducts={ordersProducts}
                        products={products}
                    />
                </div>

                {ordersState.isOpenOrderModal ? (
                    <OrderModal
                        printComponent={printComponent}
                        ordersState={ordersState}
                        restaurant={restaurant}
                        ordersProducts={ordersProducts}
                        products={products}
                        ordersDispatch={ordersDispatch}
                    />
                ) : null}
            </div>
        </AdminWrapper>
    );
}
