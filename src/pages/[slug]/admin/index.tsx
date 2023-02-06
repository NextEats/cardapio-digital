import { Card } from "../../../components/admin/Card";
import NewRequests from "../../../components/admin/initialPage/NewRequests";
import OrderStatusCard from "../../../components/admin/initialPage/OrderStatusCard";
import AdminWrapper from "../../../components/admin/AdminWrapper";
import { supabase } from "../../../server/api";
import { iCashBoxes, iInsertAddresses, iInsertClients, iInsertContacts, iInsertOrders, iInsertOrdersProducts, iInsertOrderStatus, iInsertOrderStatuss, iInsertProducts, iProducts, iRestaurant, iRestaurants } from "../../../types/types";
import { GetServerSideProps } from "next";
import { useState, useEffect, useReducer } from "react";
import { iStatusReducer, statusReducer } from "../../../reducers/statusReducer/reducer";
import { OrderModal } from "../../../components/admin/initialPage/OrderModal";
import { CardapioDigitalButton } from "../../../components/admin/cardapio-digital/CardapioDigitalButton";

interface iAdminHomePageProps {
  ordersData: iInsertOrders,
  orderStatuss: iInsertOrderStatuss,
  ordersProducts: iInsertOrdersProducts,
  addresses: iInsertAddresses,
  products: iInsertProducts,
  contacts: iInsertContacts,
  clients: iInsertClients,
  restaurant: iRestaurants
  cashBoxes: iCashBoxes
}


export const getServerSideProps: GetServerSideProps = async (context) => {

  const ordersData = await supabase.from("orders").select()
  const orderStatuss = await supabase.from("order_status").select()
  const ordersProducts = await supabase.from("orders_products").select()
  const products = await supabase.from("products").select()
  const clients = await supabase.from("clients").select()
  const contacts = await supabase.from("contacts").select()
  const addresses = await supabase.from("addresses").select()
  const restaurant = await supabase.from("restaurants").select().eq("slug", context.query.slug)
  const cashBoxes = await supabase.from("cash_boxes").select().eq("restaurant_id", restaurant.data![0].id)
  console.log('cashBoxes')
  console.log(cashBoxes)
  // const channel = supabase
  //   .channel('')
  //   .on(
  //     'postgres_changes',
  //     {
  //       event: '*',
  //       schema: 'public',
  //       table: 'orders',
  //     },
  //     (payload) => console.log(payload)
  //   )
  //   .subscribe()
  // console.log(channel, orders)

  // const SupabaseWebSocket = () => {
  //   const [data, setData] = useState([]);

  //   useEffect(() => {
  //     const socket = new WebSocket('wss://api.supabase.co/realtime/<SUA_CHAVE_API>');

  //     socket.addEventListener('open', (event) => {
  //       socket.send(JSON.stringify({
  //         type: 'subscribe',
  //         payload: {
  //           channel: '<NOME_DA_TABELA>',
  //           event: 'update',
  //         },
  //       }));
  //     });

  //     socket.addEventListener('message', (event) => {
  //       setData((prevData) => [...prevData, event.data]);
  //     });

  //     return () => {
  //       socket.close();
  //     };
  //   }, []);

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
  console.log(ordersData)
  let orders = ordersData.data!

  if (cashBoxOpened === undefined) {
    console.log("1")
    orders = []
  } else {
    console.log("2")
    orders = ordersData.data.filter(o => o.cash_box_id === cashBoxOpened.id!)
  }
  console.log(orders)

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
    const orderIndex = orders.findIndex(or => or.id === op.order_id)
    return orders[orderIndex]
  })

  // EM PRODUÇÃO 
  const ordersProductsWithStatusEmPodução = ordersProducts?.data.filter(op => op.order_status_id === orderEmProdução?.id)
  const ordersProductsWithStatusEmPoduçãoFiltered = ordersProductsWithStatusEmPodução?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const emProduçãoOrders = ordersProductsWithStatusEmPoduçãoFiltered?.map(op => {
    const orderIndex = orders?.findIndex(or => or.id === op.order_id)
    return orders[orderIndex]
  })

  // A CAMINHO 
  const ordersProductsWithStatusACaminho = ordersProducts?.data.filter(op => op.order_status_id === orderACaminho?.id)
  const ordersProductsWithStatusACaminhoFiltered = ordersProductsWithStatusACaminho?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const aCaminhoOrders = ordersProductsWithStatusACaminhoFiltered?.map(op => {
    const orderIndex = orders?.findIndex(or => or.id === op.order_id)
    return orders[orderIndex]
  })

  // STATUS ENTREGUE 
  const ordersProductsWithStatusEntregue = ordersProducts?.data.filter(op => op.order_status_id === orderEntregue?.id)
  const ordersProductsWithStatusEntregueFiltered = ordersProductsWithStatusEntregue?.filter((op, index, self) => {
    return self.findIndex(os => os.order_id === op.order_id) === index
  })
  const entregueOrders = ordersProductsWithStatusEntregueFiltered?.map(op => {
    const orderIndex = orders?.findIndex(or => or.id === op.order_id)
    return orders[orderIndex]
  })

  const [state, dispatch] = useReducer<(state: iStatusReducer, action: any) => iStatusReducer>(statusReducer, {
    orders: orders,
    orderStatuss: orderStatuss.data,
    ordersProducts: ordersProducts.data,
    addresses: addresses?.data,
    products: products.data,
    contacts: contacts?.data,
    clients: clients?.data,

    emAnaliseOrders,
    emProduçãoOrders,
    aCaminhoOrders,
    entregueOrders,
    isOpenOrderModal: false,
    orderId: 0,
  })

  const statusId = orderStatuss.data.find(s => s.status_name === 'entregue')
  const ordersProductFiltered = ordersProducts.data.filter(ordersProduct => statusId?.id === ordersProduct.order_status_id)
  function billing() {
    const ordersProductId = ordersProductFiltered.map(ordersProduct => ordersProduct.product_id)
    const selectedProduct = ordersProductId.map(productId => products.data[products.data.findIndex(product => productId === product.id)])
    return selectedProduct.reduce((acc, product) => acc + product.price, 0)
  }
  const ordersAmount = Array.from(new Set(ordersProductFiltered.map(order => order.order_id))).length;
  // const [count, setCount] = useState(0);

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
          <Card color="green" name="Pedidos" value={`${ordersAmount}`} />
          <Card color="yellow" name="Produtos no Cardápio" value={products?.data.length.toString()} />
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
