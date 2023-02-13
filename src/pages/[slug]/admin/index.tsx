import { Card } from "../../../components/admin/Card";
import NewRequests from "../../../components/admin/initialPage/NewRequests";
import OrderStatusCard from "../../../components/admin/initialPage/OrderStatusCard";
import AdminWrapper from "../../../components/admin/AdminWrapper";
import { api, supabase } from "../../../server/api";
import {
  iCashBoxes,
  iInsertAddresses,
  iInsertClients,
  iInsertContacts,
  iInsertOrder,
  iInsertOrders,
  iInsertOrdersProducts,
  iInsertOrderStatuss,
  iInsertProducts,
  iRestaurants,
} from "../../../types/types";
import { GetServerSideProps } from "next";
import { useState, useReducer, useEffect, useMemo } from "react";
import {
  iStatusReducer,
  statusReducer,
} from "../../../reducers/statusReducer/reducer";
import { OrderModal } from "../../../components/admin/initialPage/OrderModal";
import { CardapioDigitalButton } from "../../../components/admin/cardapio-digital/CardapioDigitalButton";

import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";
import { getOrdersByRestaurantIdFetch } from "../../../fetch/orders/getOrdersByRestaurantId";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";
import { getOrderStatusFetch } from "src/fetch/orderStatus/getOrdersStatus";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";
import { getclientsFetch } from "src/fetch/clients/getClients";
import { getContactsFetch } from "src/fetch/contacts/getContacts";
import { getAddressesFetch } from "src/fetch/addresses/getAddresses";
import { getCashBoxesByRestaurantIdFetch } from "src/fetch/cashBoxes/getCashBoxesByRestaurantId";

import "react-toastify/dist/ReactToastify.css";
import { addNewUnderReviewAtion } from "src/reducers/statusReducer/action";

interface iAdminHomePageProps {
  ordersData: iInsertOrders["data"];
  orderStatuss: iInsertOrderStatuss["data"];
  ordersProducts: iInsertOrdersProducts["data"];
  addresses: iInsertAddresses["data"];
  products: iInsertProducts["data"];
  contacts: iInsertContacts["data"];
  clients: iInsertClients["data"];
  restaurant: iRestaurants["data"];
  cashBoxes: iCashBoxes["data"];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);
  const ordersData = await getOrdersByRestaurantIdFetch(restaurant.id);
  const products = await getProductsByRestaurantIdFetch(restaurant.id);
  const orderStatuss = await getOrderStatusFetch();
  const ordersProducts = await getOrdersProductsFetch();
  const clients = await getclientsFetch();
  const contacts = await getContactsFetch();
  const addresses = await getAddressesFetch();
  const cashBoxes = await getCashBoxesByRestaurantIdFetch(restaurant.id);

  return {
    props: {
      ordersData,
      orderStatuss,
      ordersProducts,
      products,
      clients,
      contacts,
      addresses,
      restaurant,
      cashBoxes,
    },
  };
};

export default function AdminHomepage({
  ordersData,
  orderStatuss,
  ordersProducts,
  products,
  contacts,
  addresses,
  clients,
  restaurant,
  cashBoxes,
}: iAdminHomePageProps) {
  const [orders, setOrders] = useState<iInsertOrders["data"]>(ordersData);

  const cashBoxOpened = cashBoxes.find((cb) => cb.is_open === true);
  useEffect(() => {
    if (cashBoxOpened === undefined) {
      setOrders([]);
    } else {
      const filterOrdersData = ordersData.filter(
        (o) => o.cash_box_id === cashBoxOpened!.id
      );
      setOrders(filterOrdersData);
    }
  }, [ordersData, cashBoxOpened]);

  const statusEmAnalise = orderStatuss.find(
    (status) => status.status_name === "em análise"
  );
  const statusEmProdução = orderStatuss.find(
    (status) => status.status_name === "em produção"
  );
  const statusACaminho = orderStatuss.find(
    (status) => status.status_name === "a caminho"
  );
  const statusEntregue = orderStatuss.find(
    (status) => status.status_name === "entregue"
  );

  // EM ANÁLISE
  const emAnaliseOrders = orders?.filter(
    (or) => or.order_status_id === statusEmAnalise?.id
  );

  // EM PRODUÇÃO
  const emProduçãoOrders = orders?.filter(
    (or) => or.order_status_id === statusEmProdução?.id
  );

  // A CAMINHO
  const aCaminhoOrders = orders?.filter(
    (or) => or.order_status_id === statusACaminho?.id
  );

  // STATUS ENTREGUE
  const entregueOrders = orders?.filter(
    (or) => or.order_status_id === statusEntregue?.id
  );

  const [state, dispatch] = useReducer<
    (state: iStatusReducer, action: any) => iStatusReducer
  >(statusReducer, {
    orders: orders,
    orderStatuss: orderStatuss,
    ordersProducts: ordersProducts,
    addresses: addresses,
    products: products,
    contacts: contacts,
    clients: clients,

    emAnaliseOrders,
    emProduçãoOrders,
    aCaminhoOrders,
    entregueOrders,
    isOpenOrderModal: false,
    orderId: 0,
  });

  const ordersProductFiltered = ordersProducts.filter((op) =>
    entregueOrders.some((o) => o.id === op.order_id)
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

  const [openCashBoxState, setOpenCashBoxState] = useState(false);

  async function handleOpenCashBox() {
    // const cashBox = await api.post("api/cash_boxes/open", {
    //   restaurant_id: restaurant.id,
    // });
    setOpenCashBoxState(true);
  }

  async function handleCloseCashBox() {
    if (
      state.emAnaliseOrders.length > 0 ||
      state.aCaminhoOrders.length > 0 ||
      state.emProduçãoOrders.length > 0
    ) {
      alert(
        "Ei vagabundo, crie um toast para avisar para algum desorientado que só pode fechar o caixa se todos os pedidos forem entregue!"
      );
      return;
    }
    // const cashBox = await api.post("api/cash_boxes/close", {
    //   restaurant_id: restaurant.id,
    // });
    setOpenCashBoxState(false);
  }

  useMemo(() => {
    function newOrder(order: iInsertOrder["data"]) {
      if (order.order_status_id === statusEmAnalise?.id)
        dispatch(addNewUnderReviewAtion(order));
    }
    const channel = supabase
      .channel("db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
        },
        (payload: any) => {
          newOrder(payload.new);
        }
      )
      .subscribe();
  }, [statusEmAnalise]);

  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <CardapioDigitalButton
            name="Abrir caixa"
            h="h-10"
            w="w-40"
            disabled={
              openCashBoxState || cashBoxes.some((cb) => cb.is_open === true)
            }
            onClick={() => handleOpenCashBox()}
          />
          <CardapioDigitalButton
            name="Fechar caixa"
            h="h-10"
            w="w-40"
            disabled={!cashBoxes.some((cb) => cb.is_open === true)}
            onClick={() => handleCloseCashBox()}
          />
        </div>
        <div className="grid 2xs:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card color="red" name="Faturamento" value={`R$ ${billing()}`} />
          <Card
            color="green"
            name="Pedidos"
            value={`${entregueOrders.length}`}
          />
          <Card
            color="yellow"
            name="Produtos no Cardápio"
            value={products.length.toString()}
          />
        </div>

        <NewRequests dispatch={dispatch} state={state} />
        <div className=" md:columns-3 gap-4">
          <OrderStatusCard
            statusName="Em produção"
            state={state}
            dispatch={dispatch}
            orders={state.emProduçãoOrders}
          />
          <OrderStatusCard
            statusName="A caminho"
            state={state}
            dispatch={dispatch}
            orders={state.aCaminhoOrders}
          />
          <OrderStatusCard
            statusName="Entregue"
            state={state}
            dispatch={dispatch}
            orders={state.entregueOrders}
          />
        </div>

        {state.isOpenOrderModal ? (
          <OrderModal state={state} dispatch={dispatch} />
        ) : null}
      </div>
    </AdminWrapper>
  );
}
