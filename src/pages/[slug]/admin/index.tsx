import { Card } from "../../../components/admin/Card";
import NewRequests from "../../../components/admin/initialPage/NewRequests";
import OrderStatusCard from "../../../components/admin/initialPage/OrderStatusCard";
import AdminWrapper from "../../../components/admin/AdminWrapper";
import {
  iCashBox,
  iCashBoxes,
  iInsertAddresses,
  iInsertClients,
  iInsertContacts,
  iInsertOrder,
  iInsertOrdersProducts,
  iInsertOrderStatuss,
  iInsertProducts,
  iOrdersWithFKData,
  iRestaurants,
  iRestaurantWithFKData,
} from "../../../types/types";
import { GetServerSideProps } from "next";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  iStatusReducer,
  statusReducer,
} from "../../../reducers/statusReducer/reducer";

import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";
import { getOrdersByRestaurantIdFetch } from "../../../fetch/orders/getOrdersByRestaurantId";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";
import { getclientsFetch } from "src/fetch/clients/getClients";
import { getContactsFetch } from "src/fetch/contacts/getContacts";
import { getAddressesFetch } from "src/fetch/addresses/getAddresses";
import { getCashBoxesByRestaurantIdFetch } from "src/fetch/cashBoxes/getCashBoxesByRestaurantId";

import "react-toastify/dist/ReactToastify.css";
import CashBoxButtons from "@/src/components/admin/initialPage/CashBoxButtons";
import { OrderModal } from "@/src/components/admin/initialPage/OrderModal";
import { api, supabase } from "@/src/server/api";

interface iAdminHomePageProps {
  ordersData: iOrdersWithFKData[];
  orderStatuss: iInsertOrderStatuss["data"];
  ordersProducts: iInsertOrdersProducts["data"];
  products: iInsertProducts["data"];
  clients: iInsertClients["data"];
  contacts: iInsertContacts["data"];
  addresses: iInsertAddresses["data"];
  cashBoxes: iCashBoxes["data"];
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
    iCashBox["data"] | undefined
  >(cashBoxOpened);

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
    if (ordersGroupedByOrderStatus["entregue"]) {
      ordersProductFiltered = ordersProducts.filter((op) =>
        ordersGroupedByOrderStatus["entregue"].some((o) => o.id === op.order_id)
      );

      const productIds = ordersProductFiltered.map(
        (ordersProduct) => ordersProduct.product_id
      );
      const selectedProduct = productIds.map(
        (productId) =>
          products[products.findIndex((product) => productId === product.id)]
      );
      return selectedProduct.reduce((acc, product) => acc + product?.price!, 0);
    } else {
      return 0;
    }
  }

  console.log(ordersGroupedByOrderStatus);
  useMemo(() => {
    async function newOrder() {
      const getNewOrder = await api.get(`/api/orders/${restaurant.id}`);
      console.log(getNewOrder.data);
      setOrders(getNewOrder.data);
      // if (order.order_status_id === ordersGroupedByOrderStatus['em análise'][0]?.id)
      //   setOrders([])
    }
    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "orders",
        },
        (payload: any) => {
          console.log("entrou");
          newOrder();
        }
      )
      .subscribe();
  }, [restaurant]);
  // useMemo(() => {
  const channel = supabase
    .channel("db-cash")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "cash_boxes",
      },
      (payload: any) => {
        if (payload.eventType === "UPDATE") {
          setOrders([]);
          setCashBoxState(undefined);
          alert("Caixa fechado!");
        }
        if (payload.eventType === "INSERT") {
          setCashBoxState(payload.new);
          alert("Caixa aberto!");
        }
      }
    )
    .subscribe();
  // }, []);

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
          <Card color="red" name="Faturamento" value={`R$ ${billing()}`} />
          <Card
            color="green"
            name="Pedidos"
            value={
              ordersGroupedByOrderStatus["entregue"]
                ? `${ordersGroupedByOrderStatus["entregue"].length}`
                : "0"
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
