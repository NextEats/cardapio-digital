import { Card } from "../../../components/admin/Card";
import NewRequests from "../../../components/admin/initialPage/NewRequests";
import OrderStatusCard from "../../../components/admin/initialPage/OrderStatusCard";
import AdminWrapper from "../../../components/admin/AdminWrapper";
import {
  iCashBoxes,
  iInsertAddresses,
  iInsertClients,
  iInsertContacts,
  iInsertOrdersProducts,
  iInsertOrderStatuss,
  iInsertProducts,
  iOrdersWithFKData,
} from "../../../types/types";
import { GetServerSideProps } from "next";
import { useReducer } from "react";
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

interface iAdminHomePageProps {
  ordersData: iOrdersWithFKData[];
  orderStatuss: iInsertOrderStatuss["data"];
  ordersProducts: iInsertOrdersProducts["data"];
  products: iInsertProducts["data"];
  clients: iInsertClients["data"];
  contacts: iInsertContacts["data"];
  addresses: iInsertAddresses["data"];
  cashBoxes: iCashBoxes["data"];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);

  return {
    props: {
      ordersData: await getOrdersByRestaurantIdFetch(restaurant.id),
      ordersProducts: await getOrdersProductsFetch(),
      products: await getProductsByRestaurantIdFetch(restaurant.id),
      clients: await getclientsFetch(),
      contacts: await getContactsFetch(),
      addresses: await getAddressesFetch(),
      cashBoxes: await getCashBoxesByRestaurantIdFetch(restaurant.id),
    },
  };
};

export default function AdminHomepage({
  ordersData,
  ordersProducts,
  products,
  cashBoxes,
}: iAdminHomePageProps) {
  const ordersGroupedByOrderStatus = ordersData.reduce(
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

  console.log(ordersGroupedByOrderStatus);

  const cashBoxOpened = cashBoxes.find((cb) => cb.is_open === true);
  // useEffect(() => {
  //   if (cashBoxOpened === undefined) {
  //     setOrders([]);
  //   } else {
  //     const filterOrdersData = ordersData.filter(
  //       (o) => o.cash_box_id === cashBoxOpened!.id
  //     );
  //     setOrders(filterOrdersData);
  //   }
  // }, [ordersData, cashBoxOpened]);

  //   const statusEmAnalise = orderStatuss.find(
  //     (status) => status.status_name === "em análise"
  //   );
  //   const statusEmProdução = orderStatuss.find(
  //     (status) => status.status_name === "em produção"
  //   );
  //   const statusACaminho = orderStatuss.find(
  //     (status) => status.status_name === "a caminho"
  //   );
  //   const statusEntregue = orderStatuss.find(
  //     (status) => status.status_name === "entregue"
  //   );

  // EM ANÁLISE
  //   const emAnaliseOrders = orders?.filter(
  //     (or) => or.order_status_id === statusEmAnalise?.id
  //   );

  //   // EM PRODUÇÃO
  //   const emProduçãoOrders = orders?.filter(
  //     (or) => or.order_status_id === statusEmProdução?.id
  //   );

  //   // A CAMINHO
  //   const aCaminhoOrders = orders?.filter(
  //     (or) => or.order_status_id === statusACaminho?.id
  //   );

  //   // STATUS ENTREGUE
  //   const entregueOrders = orders?.filter(
  //     (or) => or.order_status_id === statusEntregue?.id
  //   );

  const [ordersState, ordersDispatch] = useReducer<
    (state: iStatusReducer, action: any) => iStatusReducer
  >(statusReducer, {
    orders: ordersData,
    isOpenOrderModal: false,
    orderId: 0,
  });

  const ordersProductFiltered = ordersProducts.filter((op) =>
    ordersGroupedByOrderStatus["entregue"].some((o) => o.id === op.order_id)
  );
  function billing() {
    const productIds = ordersProductFiltered.map(
      (ordersProduct) => ordersProduct.product_id
    );
    const selectedProduct = productIds.map(
      (productId) =>
        products[products.findIndex((product) => productId === product.id)]
    );
    return selectedProduct.reduce((acc, product) => acc + product?.price!, 0);
  }

  //   useMemo(() => {
  //     function newOrder(order: iInsertOrder["data"]) {
  //       if (order.order_status_id === statusEmAnalise?.id)
  //         dispatch(addNewUnderReviewAction(order));
  //     }
  //     const channel = supabase
  //       .channel("db-changes")
  //       .on(
  //         "postgres_changes",
  //         {
  //           event: "INSERT",
  //           schema: "public",
  //           table: "orders",
  //         },
  //         (payload: any) => {
  //           newOrder(payload.new);
  //         }
  //       )
  //       .subscribe();
  //   }, [statusEmAnalise]);

  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <CashBoxButtons cashBoxes={cashBoxes} />

        <div className="grid 2xs:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card color="red" name="Faturamento" value={`R$ ${billing()}`} />
          <Card
            color="green"
            name="Pedidos"
            value={`${ordersGroupedByOrderStatus["entregue"].length}`}
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

        {/* {state.isOpenOrderModal ? (
          <OrderModal state={state} dispatch={dispatch} />
        ) : null} */}
      </div>
    </AdminWrapper>
  );
}
