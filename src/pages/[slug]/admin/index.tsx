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
    iAdditionals,
    iCashBox,
    iCashBoxes,
    iInsertAddresses,
    iInsertClients,
    iInsertContacts,
    iInsertOrderStatuss,
    iOrdersProducts,
    iOrdersWithFKData,
    iProducts,
    iProductSelects,
    iRestaurantWithFKData,
    iSelects,
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
import { getAdditionalsByRestaurantIdFetch } from '@/src/fetch/additionals/getAdditionals';
import { getOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import { addNewUnderReviewAction } from '@/src/reducers/statusReducer/action';
import { api, supabase } from '@/src/server/api';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import 'react-toastify/dist/ReactToastify.css';
import { getProductSelectsFetch } from '@/src/fetch/productSelects/getProductSelects';
import { getSelectsByRestaurantIdFetch } from '@/src/fetch/selects/getSelectsByRestaurantId';

interface iAdminHomePageProps {
    ordersData: iOrdersWithFKData[];
    orderStatuss: iInsertOrderStatuss['data'];
    ordersProductsData: iOrdersProducts['data'];
    products: iProducts['data'];
    clients: iInsertClients['data'];
    contacts: iInsertContacts['data'];
    addresses: iInsertAddresses['data'];
    cashBoxes: iCashBoxes['data'];
    additionals: iAdditionals['data'];
    selects: iSelects["data"];
    restaurant: iRestaurantWithFKData;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const supabaseServer = createServerSupabaseClient(context);

    const {
        data: { session },
    } = await supabaseServer.auth.getSession();

    if (!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    } else {
        const { data: userDetailsData } = await supabase.from('user_details').select(
            `
                    id,
                    restaurant_id,
                    user_id,
                    restaurants (
                        id,
                        name,
                        slug
                    )
            `
        ).eq('user_id', session.user.id);
        if (userDetailsData) {
            const userDetailsTypedData = userDetailsData[0] as unknown as {
                id: number;
                restaurant_id: number;
                user_id: string;
                restaurants: {
                    id: number;
                    name: string;
                    slug: string;
                };
            };
        }
    }

    // const restaurant = await getRestaurantBySlugFetch(context.query.slug);
    const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);
    return {
        props: {
            ordersData: await getOrdersByRestaurantIdFetch(restaurant.id),
            ordersProductsData: await getOrdersProductsFetch(),
            products: await getProductsByRestaurantIdFetch(restaurant.id),
            clients: await getclientsFetch(),
            contacts: await getContactsFetch(),
            addresses: await getAddressesFetch(),
            cashBoxes: await getCashBoxesByRestaurantIdFetch(restaurant.id),
            additionals: await getAdditionalsByRestaurantIdFetch(restaurant.id),
            selects: await getSelectsByRestaurantIdFetch(restaurant.id),
            restaurant,
        },
    };
};

export default function AdminHomepage({
    ordersData,
    ordersProductsData,
    products,
    cashBoxes,
    additionals,
    selects,
    restaurant,
}: iAdminHomePageProps) {
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

            const totalPriceOfDeliveryFee = ordersGroupedByOrderStatus[
                'entregue'
            ].reduce((acc, item) => {
                if (!item.delivery_fees) return acc;
                return acc + item.delivery_fees.fee;
            }, 0);
            const totalAdditionalPrice = getOrdersProductsData({
                ordersProducts: ordersProductFiltered,
                additionals,
                products,
            }).reduce(
                (acc, item) => acc + item.totalAdditionalsPriceByProduct,
                0
            );

            return (
                selectedProduct.reduce(
                    (acc, product) => acc + product?.price!,
                    0
                ) +
                totalPriceOfDeliveryFee +
                totalAdditionalPrice
            );
        } else {
            return 0;
        }
    }

    useEffect(() => {
        const audio = new Audio('/alertAudio.mp3');
        let intervalId: number | undefined | any; // variável para armazenar o id do setInterval

        if (ordersGroupedByOrderStatus['em análise']) {
            intervalId = setInterval(() => {
                if (ordersGroupedByOrderStatus['em análise'] === undefined) {
                    clearInterval(intervalId);
                    return;
                }
                if (audio.paused === true) audio.pause();
                audio.play();
            }, 1000);
        }

        if (ordersGroupedByOrderStatus['em análise'] === undefined) {
            clearInterval(intervalId); // se ordersGroupedByOrderStatus['em análise'] é undefined, pare o setInterval
            audio.pause();
        }

        // limpa o setInterval quando o componente é desmontado
        return () => clearInterval(intervalId);
    }, [ordersGroupedByOrderStatus]);

    useMemo(() => {
        async function newOrder(payload: any) {
            const getNewOrder = await api.get(`/api/orders/${restaurant.id}`);
            // TODO1 Enviar mensagem de "seu pedido foi recebido com sucesso"
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
        const getNewOrdersProducts = await getOrdersProductsFetch();
        setOrdersProducts(getNewOrdersProducts);
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
            <div className="flex flex-col gap-4">
                <CashBoxButtons
                    cashBoxState={cashBoxState}
                    restaurantId={restaurant.id}
                    ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                    cashBoxes={cashBoxes}
                    billing={billing()}
                />

                <NewRequests
                    dispatch={ordersDispatch}
                    ordersState={ordersState}
                    ordersGroupedByOrderStatus={ordersGroupedByOrderStatus}
                    ordersProducts={ordersProducts}
                    products={products}
                />

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

                {ordersState.isOpenOrderModal ? (
                    <OrderModal
                        printComponent={printComponent}
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
        </AdminWrapper>
    );
}
