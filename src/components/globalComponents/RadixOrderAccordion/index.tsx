import { TableContext } from '@/src/contexts/TableContext';
import { iOrders, iOrdersProducts } from '@/src/types/types';
import * as Accordion from '@radix-ui/react-accordion';
import { useContext } from 'react';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionTrigger } from './AccordionTrigger';

interface iRadixAccordionProps {
  orders: iOrders['data'];
  orders_products: iOrdersProducts['data'];
}

export function RadixOrderAccordion({
  orders,
  orders_products,
}: iRadixAccordionProps) {
  const { table } = useContext(TableContext);

  return (
    <div className="">
      <Accordion.Root
        className="bg-white w-full rounded-md shadow-md"
        type="single"
        defaultValue={`${orders[0].id}`}
        collapsible
      >
        {orders.map(order => {
          const ordersProductsFilterdByOrderId = orders_products.filter(
            op => op.order_id === order.id
          );
          return (
            <AccordionItem key={order.id} value={`${order.id}`}>
              <AccordionTrigger># {order.number} </AccordionTrigger>
              <AccordionContent>
                {ordersProductsFilterdByOrderId.map(order_product => {
                  return <div key={order_product.id}>{order_product.id}</div>;
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
