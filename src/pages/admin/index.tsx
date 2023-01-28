import { Card } from "../../components/admin/Card";
import NewRequests from "../../components/admin/NewRequests";
import OrderStatusCard from "../../components/admin/OrderStatusCard";
import AdminWrapper from "../../components/admin/AdminWrapper";
import { supabase } from "../../server/api";
import { iInsertOrders, iInsertOrdersProducts, iInsertOrderStatus, iInsertOrderStatuss } from "../../types/types";
import { GetServerSideProps } from "next";

interface iAdminHomePageProps {
  orders: iInsertOrders
  orderStatuss: iInsertOrderStatuss
  ordersProducts: iInsertOrdersProducts
}


export const getServerSideProps: GetServerSideProps = async () => {

  const orders = await supabase.from("orders").select()
  const orderStatuss = await supabase.from("order_status").select()
  const ordersProducts = await supabase.from("orders_products").select()
  // const loacal =  window.localStorage.setItem("product_categories", JSON.stringify(productCategories.data))

  return {
    props: {
      orders,
      orderStatuss,
      ordersProducts,
    }
  }
}

export default function AdminHomepage({ orders, orderStatuss, ordersProducts }: iAdminHomePageProps) {

  const orderEmAnalise = orderStatuss?.data.find(status => status.status_name === "em análise")
  const orderEmProdução = orderStatuss?.data.find(status => status.status_name === "em produção")
  const orderACaminho = orderStatuss?.data.find(status => status.status_name === "a caminho")
  const orderEntregue = orderStatuss?.data.find(status => status.status_name === "entregue")

  // EM ANÁLISE
  const ordersProductsWithStatusEmAnalise = ordersProducts?.data.filter(op => op.order_status_id === orderEmAnalise?.id)
  const ordersProductsWithStatusEmAnaliseFiltered = ordersProductsWithStatusEmAnalise?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const newRequestOrders = ordersProductsWithStatusEmAnaliseFiltered?.map(op => {
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


  return (
    <AdminWrapper>
      <div className="flex flex-col gap-8">
        <div className="grid 2xs:grid-cols-2 xl:grid-cols-4 gap-3">
          <Card color="red" name="Faturamento" value={"R$ 115,00"} />
          <Card color="green" name="Pedidos" value={"16"} />
          <Card color="yellow" name="Produtos no Cardápio" value={"54"} />
          <Card color="blue" name="Ingredientes em Falta" value={"2"} />
        </div>

        <NewRequests newRequestOrders={newRequestOrders} />
        <div className=" md:columns-3 gap-4">
          <OrderStatusCard statusName="Em produção" emProduçãoOrders={emProduçãoOrders} />
          <OrderStatusCard statusName="A caminho" emProduçãoOrders={aCaminhoOrders} />
          <OrderStatusCard statusName="Entrege" emProduçãoOrders={entregueOrders} />
        </div>
      </div>
    </AdminWrapper>
  );
}
