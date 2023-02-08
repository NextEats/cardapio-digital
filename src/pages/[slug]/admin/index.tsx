import { Card } from "../../../components/admin/Card";
import NewRequests from "../../../components/admin/initialPage/NewRequests";
import OrderStatusCard from "../../../components/admin/initialPage/OrderStatusCard";
import AdminWrapper from "../../../components/admin/AdminWrapper";
import { supabase } from "../../../server/api";
import { iCashBoxes, iInsertAddresses, iInsertClients, iInsertContacts, iInsertOrders, iInsertOrdersProducts, iInsertOrderStatuss, iInsertProducts, iRestaurants } from "../../../types/types";
import { GetServerSideProps } from "next";
import { useState, useReducer } from "react";
import { iStatusReducer, statusReducer } from "../../../reducers/statusReducer/reducer";
import { OrderModal } from "../../../components/admin/initialPage/OrderModal";
import { CardapioDigitalButton } from "../../../components/admin/cardapio-digital/CardapioDigitalButton";

import "react-toastify/dist/ReactToastify.css";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";
import { getOrdersByRestaurantIdFetch } from "../../../fetch/orders/getOrdersByRestaurantId";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";
import { getOrderStatusFetch } from "src/fetch/orderStatus/getOrdersStatus";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";

interface iAdminHomePageProps {
  ordersData: iInsertOrders["data"],
  orderStatuss: iInsertOrderStatuss["data"],
  ordersProducts: iInsertOrdersProducts["data"],
  addresses: iInsertAddresses,
  products: iInsertProducts["data"],
  contacts: iInsertContacts,
  clients: iInsertClients,
  restaurant: iRestaurants
  cashBoxes: iCashBoxes
}

export const getServerSideProps: GetServerSideProps = async (context) => {

  //Refatorada
  const restaurant = await getRestaurantBySlugFetch(context.query.slug)
  const ordersData = await getOrdersByRestaurantIdFetch(restaurant[0].id)
  const products = await getProductsByRestaurantIdFetch(restaurant[0].id)
  const orderStatuss = await getOrderStatusFetch()
  const ordersProducts = await getOrdersProductsFetch()


  // A Refatorar
  // const products = await supabase.from("products").select()
  const clients = await supabase.from("clients").select()
  const contacts = await supabase.from("contacts").select()
  const addresses = await supabase.from("addresses").select()
  const cashBoxes = await supabase.from("cash_boxes").select().eq("restaurant_id", restaurant![0].id)


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
    }
  }
}

export default function AdminHomepage({ ordersData, orderStatuss, ordersProducts, products, contacts, addresses, clients, restaurant, cashBoxes }: iAdminHomePageProps) {

  const cashBoxOpened = cashBoxes.data.find(cb => cb.is_open === true)
  let orders = ordersData!

  if (cashBoxOpened === undefined) {
    orders = []
  } else {
    orders = ordersData.filter(o => o.cash_box_id === cashBoxOpened.id!)
  }

  const statusEmAnalise = orderStatuss.find(status => status.status_name === "em análise")
  const statusEmProdução = orderStatuss.find(status => status.status_name === "em produção")
  const statusACaminho = orderStatuss.find(status => status.status_name === "a caminho")
  const statusEntregue = orderStatuss.find(status => status.status_name === "entregue")

  // EM ANÁLISE
  const emAnaliseOrders = orders?.filter(or => or.order_status_id === statusEmAnalise?.id)

  // EM PRODUÇÃO 
  const emProduçãoOrders = orders?.filter(or => or.order_status_id === statusEmProdução?.id)

  // A CAMINHO 
  const aCaminhoOrders = orders?.filter(or => or.order_status_id === statusACaminho?.id)

  // STATUS ENTREGUE 
  const entregueOrders = orders?.filter(or => or.order_status_id === statusEntregue?.id)

  const [state, dispatch] = useReducer<(state: iStatusReducer, action: any) => iStatusReducer>(statusReducer, {
    orders: orders,
    orderStatuss: orderStatuss,
    ordersProducts: ordersProducts,
    addresses: addresses?.data,
    products: products,
    contacts: contacts?.data,
    clients: clients?.data,

    emAnaliseOrders,
    emProduçãoOrders,
    aCaminhoOrders,
    entregueOrders,
    isOpenOrderModal: false,
    orderId: 0,
  })

  const ordersProductFiltered = ordersProducts.filter(op => entregueOrders.some(o => o.id === op.order_id))
  function billing() {
    const productIds = ordersProductFiltered.map(ordersProduct => ordersProduct.product_id)
    const selectedProduct = productIds.map(productId => products[products.findIndex(product => productId === product.id)])
    return selectedProduct.reduce((acc, product) => acc + product?.price!, 0)
  }

  // useEffect(() => {
  //   console.log(count >= billing())
  //   const revenue = billing() - Math.floor(billing() * 0.9)
  //   // setCount(revenue)
  //   let intervalId = setInterval(() => {
  //     if (count + revenue >= billing()) {
  //       clearInterval(intervalId);
  //       return
  //     }
  //     setCount(count + 1);
  //   }, 5);

  //   return () => clearInterval(intervalId);
  // }, [count, orderStatuss, products, ordersProducts]);

  const [openCashBoxState, setOpenCashBoxState] = useState(false)

  async function handleOpenCashBox() {
    const cashBoxe = await supabase.from("cash_boxes").insert({
      is_open: true,
      opened_at: new Date().toISOString(),
      restaurant_id: restaurant?.data[0].id
    }).select("*")
    setOpenCashBoxState(true)
  }

  async function handleCloseCashBox() {
    if (state.emAnaliseOrders.length > 0 || state.aCaminhoOrders.length > 0 || state.emProduçãoOrders.length > 0) {
      alert("Ei vagabundo, crie um toast para avisar para algum desorientado que só pode fechar o caixa se todos os pedidos forem entregue!")
      return
    }
    const cashBoxe = await supabase.from("cash_boxes").update({
      is_open: false,
      closed_at: new Date().toISOString(),
    }).eq("is_open", true).select("*")
    setOpenCashBoxState(false)
  }

  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-3">
          <CardapioDigitalButton name="Abrir caixa" h="h-10" w="w-40" disabled={openCashBoxState || cashBoxes.data.some(cb => cb.is_open === true)} onClick={() => handleOpenCashBox()} />
          <CardapioDigitalButton name="Fechar caixa" h="h-10" w="w-40" disabled={!cashBoxes.data.some(cb => cb.is_open === true)} onClick={() => handleCloseCashBox()} />
        </div>
        <div className="grid 2xs:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card color="red" name="Faturamento" value={`R$ ${billing()}`} />
          <Card color="green" name="Pedidos" value={`${entregueOrders.length}`} />
          <Card color="yellow" name="Produtos no Cardápio" value={products.length.toString()} />
        </div>

        <NewRequests dispatch={dispatch} state={state} />
        <div className=" md:columns-3 gap-4">
          <OrderStatusCard statusName="Em produção" state={state} dispatch={dispatch} orders={state.emProduçãoOrders} />
          <OrderStatusCard statusName="A caminho" state={state} dispatch={dispatch} orders={state.aCaminhoOrders} />
          <OrderStatusCard statusName="Entregue" state={state} dispatch={dispatch} orders={state.entregueOrders} />
        </div>

        {
          state.isOpenOrderModal ? <OrderModal state={state} dispatch={dispatch} /> : null
        }
      </div>
    </AdminWrapper>
  );
}
