import { DeliveryPageContext } from '@/src/contexts/DeliveryContextProvider';

import { getOrdersGroupedByStatus } from '@/src/helpers/getOrdersGroupedByStatus';
import { useContext } from 'react';
import { RadixOrderAccordion } from '../../globalComponents/RadixOrderAccordion';

export default function Delivery() {
  const { orders, ordersProducts } = useContext(DeliveryPageContext);

  const ordersGrouoedByStatus = getOrdersGroupedByStatus({ orders });

  console.log(ordersGrouoedByStatus);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {ordersGrouoedByStatus.map((ordersGByStatus, index) => {
        return (
          <div key={index}>
            <RadixOrderAccordion
              isToDelivery
              orders={ordersGByStatus.orders}
              orders_products={ordersProducts || []}
            />
          </div>
        );
      })}
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
