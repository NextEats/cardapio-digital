import { Card } from "../../components/admin/Card";
import NewRequests from "../../components/admin/NewRequests";
import OrderStatusCard from "../../components/admin/OrderStatusCard";
import AdminWrapper from "../../components/admin/AdminWrapper";
import { supabase } from "../../server/api";
import { iInsertOrders, iInsertOrdersProducts, iInsertOrderStatus, iInsertOrderStatuss, iProducts } from "../../types/types";
import { GetServerSideProps } from "next";
import { useState, useEffect, useReducer } from "react";
import { iStatusReducer, statusReducer } from "../../reducers/statusReducer/reducer";

interface iAdminHomePageProps {
  orders: iInsertOrders,
  orderStatuss: iInsertOrderStatuss,
  ordersProducts: iInsertOrdersProducts,
  products: iProducts,
}


export const getServerSideProps: GetServerSideProps = async () => {

  const orders = await supabase.from("orders").select()
  const orderStatuss = await supabase.from("order_status").select()
  const ordersProducts = await supabase.from("orders_products").select()
  const products = await supabase.from("products").select()
  // const loacal =  window.localStorage.setItem("product_categories", JSON.stringify(productCategories.data))

  return {
    props: {
      orders,
      orderStatuss,
      ordersProducts,
      products,
    }
  }
}

export default function AdminHomepage({ orders, orderStatuss, ordersProducts, products }: iAdminHomePageProps) {

  const orderEmAnalise = orderStatuss?.data.find(status => status.status_name === "em análise")
  const orderEmProdução = orderStatuss?.data.find(status => status.status_name === "em produção")
  const orderACaminho = orderStatuss?.data.find(status => status.status_name === "a caminho")
  const orderEntregue = orderStatuss?.data.find(status => status.status_name === "entregue")

  // EM ANÁLISE
  const ordersProductsWithStatusEmAnalise = ordersProducts?.data.filter(op => op.order_status_id === orderEmAnalise?.id)
  const ordersProductsWithStatusEmAnaliseFiltered = ordersProductsWithStatusEmAnalise?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const emAnaliseOrders = ordersProductsWithStatusEmAnaliseFiltered?.map(op => {
    const orderIndex = orders?.data.findIndex(or => or.id === op.order_id)
    return orders.data[orderIndex]
  })

  // EM PRODUÇÃO 
  const ordersProductsWithStatusEmPodução = ordersProducts?.data.filter(op => op.order_status_id === orderEmProdução?.id)
  const ordersProductsWithStatusEmPoduçãoFiltered = ordersProductsWithStatusEmPodução?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const emProduçãoOrders = ordersProductsWithStatusEmPoduçãoFiltered?.map(op => {
    const orderIndex = orders?.data.findIndex(or => or.id === op.order_id)
    return orders.data[orderIndex]
  })

  // A CAMINHO 
  const ordersProductsWithStatusACaminho = ordersProducts?.data.filter(op => op.order_status_id === orderACaminho?.id)
  const ordersProductsWithStatusACaminhoFiltered = ordersProductsWithStatusACaminho?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const aCaminhoOrders = ordersProductsWithStatusACaminhoFiltered?.map(op => {
    const orderIndex = orders?.data.findIndex(or => or.id === op.order_id)
    return orders.data[orderIndex]
  })

  // STATUS ENTREGUE 
  const ordersProductsWithStatusEntregue = ordersProducts?.data.filter(op => op.order_status_id === orderEntregue?.id)
  const ordersProductsWithStatusEntregueFiltered = ordersProductsWithStatusEntregue?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const entregueOrders = ordersProductsWithStatusEntregueFiltered?.map(op => {
    const orderIndex = orders?.data.findIndex(or => or.id === op.order_id)
    return orders.data[orderIndex]
  })

  const [state, dispatch] = useReducer<(state: iStatusReducer, action: any) => iStatusReducer>(statusReducer, {
    orders: orders.data,
    orderStatuss: orderStatuss.data,
    ordersProducts: ordersProducts.data,

    emAnaliseOrders,
    emProduçãoOrders,
    aCaminhoOrders,
    entregueOrders,
    isOpenOrderModal: false
  })

  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <div className="grid 2xs:grid-cols-2 lg:grid-cols-3 gap-3">
          <Card color="red" name="Faturamento" value={"R$ 115,00"} />
          <Card color="green" name="Pedidos" value={"16"} />
          <Card color="yellow" name="Produtos no Cardápio" value={products?.data.length.toString()} />
        </div>

        <NewRequests dispatch={dispatch} state={state} />
        <div className=" md:columns-3 gap-4">
          <OrderStatusCard statusName="Em produção" state={state} dispatch={dispatch} orders={state.emProduçãoOrders} />
          <OrderStatusCard statusName="A caminho" state={state} dispatch={dispatch} orders={state.aCaminhoOrders} />
          <OrderStatusCard statusName="Entregue" state={state} dispatch={dispatch} orders={state.entregueOrders} />
        </div>

        <div>


        </div>

      </div>
    </AdminWrapper>
  );
}
