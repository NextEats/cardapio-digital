import { DeliveryPageContext } from '@/src/contexts/DeliveryContextProvider';

import { getOrdersGroupedByStatus } from '@/src/helpers/getOrdersGroupedByStatus';
import { useContext } from 'react';
import { RadixOrderAccordion } from '../../globalComponents/RadixOrderAccordion';

export default function Delivery() {
  const { orders, ordersProducts } = useContext(DeliveryPageContext);

  const ordersGrouoedByStatus = getOrdersGroupedByStatus({ orders });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-start gap-4">
      {ordersGrouoedByStatus.map((ordersGByStatus, index) => {
        if (ordersGByStatus.status_name === 'cancelado') return null;

        // if (ordersGByStatus.status_name === "em análise")
        //   return <OrderDeliveryList title='Novos Pedidos' ordersGByStatus={
        //     ordersGByStatus
        //   } />
        // // else
        // //   return <OrderDeliveryList title='Novos Pedidos' ordersGByStatus={{ orders: [], status_name: ordersGByStatus.status_name }} />
        // if (ordersGByStatus.status_name === "em produção")
        //   return <OrderDeliveryList title='Novos Pedidos' ordersGByStatus={ordersGByStatus} />
        // if (ordersGByStatus.status_name === "a caminho")
        //   return <OrderDeliveryList title='Novos Pedidos' ordersGByStatus={ordersGByStatus} />

        // switch (ordersGByStatus.status_name) {
        //   case "em análise": {
        //     return <OrderDeliveryList title='Novos Pedidos' ordersGByStatus={ordersGByStatus} />
        //   }
        //     break
        //   case "cancelado": {

        //   }
        //     break
        //   case "a caminho": {

        //   }
        //     break
        // }
        const ordersFilterd = ordersGByStatus.orders.filter(
          or => or.order_types.name !== 'Mesa'
        );
        return (
          <div key={index} className="">
            {/* <OrderDeliveryList title='Novos Pedidos' ordersGByStatus={ordersGByStatus} /> */}
            <div className="flex w-full items-center justify-between mb-1">
              <span>
                {ordersGByStatus.status_name === 'em análise'
                  ? 'Novos pedidos'
                  : null}
                {ordersGByStatus.status_name === 'em produção'
                  ? 'Em Produção'
                  : null}
                {ordersGByStatus.status_name === 'a caminho'
                  ? 'A caminho'
                  : null}
                {ordersGByStatus.status_name === 'entregue'
                  ? 'Entregues'
                  : null}
              </span>
              <span>
                {ordersGByStatus.status_name === 'em análise'
                  ? ordersFilterd.length
                  : null}
                {ordersGByStatus.status_name === 'em produção'
                  ? ordersFilterd.length
                  : null}
                {ordersGByStatus.status_name === 'a caminho'
                  ? ordersFilterd.length
                  : null}
                {ordersGByStatus.status_name === 'entregue'
                  ? ordersFilterd.length
                  : null}
              </span>
            </div>
            <RadixOrderAccordion
              isToDelivery
              orders={
                ordersGByStatus.status_name === 'em análise'
                  ? ordersFilterd
                  : ordersGByStatus.status_name === 'em produção'
                  ? ordersFilterd
                  : ordersGByStatus.status_name === 'a caminho'
                  ? ordersFilterd
                  : ordersGByStatus.status_name === 'entregue'
                  ? ordersFilterd
                  : []
              }
              orders_products={ordersProducts || []}
            />
          </div>
        );
      })}
      {/* <RadixOrderAccordion
        isToDelivery
        orders={[]}
        orders_products={ordersProducts || []}
      /> */}
      {/*
      <RadixOrderAccordion isToDelivery orders={orders} orders_products={ordersProducts || []} />
      <RadixOrderAccordion isToDelivery orders={orders} orders_products={ordersProducts || []} />
      <RadixOrderAccordion isToDelivery orders={orders} orders_products={ordersProducts || []} /> */}
      {/* <OrderAccordionStatus />
      <OrderAccordionStatus />
      <OrderAccordionStatus />
      <OrderAccordionStatus /> */}
    </div>
  );
}

// function OrderAccordionStatus() {
//   const { orders, ordersProducts } = useContext(DeliveryPageContext);

//   if (!ordersProducts) return null;

//   return (
//     <div className="bg-white p-4 rounded-md shadow-md">
//       <Accordion.Root
//         className="bg-white w-full rounded-md shadow-md"
//         type="single"
//         defaultValue={`a`}
//         collapsible
//       >
//         {ordersProducts.map((orderProduct, index: number) => {
//           return (
//             <AccordionItem
//               className=""
//               key={index}
//               value={`${orderProduct.o_number}`}
//             >
//               <AccordionTrigger className="flex items-center data-[state=open]:child:hidden">
//                 <span>{orderProduct.o_number}</span>
//                 <div>
//                   <AiFillCaretDown
//                     size={24}
//                     className="data-[state='closed']:hidden"
//                   />
//                   <AiFillCaretRight
//                     size={24}
//                     className="data-[state=closed]:hidden"
//                   />
//                 </div>
//               </AccordionTrigger>
//               <AccordionContent>a</AccordionContent>
//             </AccordionItem>
//           );
//         })}
//       </Accordion.Root>
//       <pre className="mt-4 text-xs text-gray-600 whitespace-pre-wrap break-words">
//         ordersProducts: {JSON.stringify(ordersProducts, null, '\t')}
//       </pre>
//     </div>
//   );
// }
