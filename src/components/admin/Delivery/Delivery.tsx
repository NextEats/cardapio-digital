import { DeliveryPageContext } from '@/src/contexts/DeliveryContextProvider';

import * as Accordion from '@radix-ui/react-accordion';

import { useContext } from 'react';
import { AiFillCaretDown, AiFillCaretRight } from 'react-icons/ai';
import { AccordionContent } from '../../globalComponents/RadixOrderAccordion/AccordionContent';
import { AccordionItem } from '../../globalComponents/RadixOrderAccordion/AccordionItem';
import { AccordionTrigger } from '../../globalComponents/RadixOrderAccordion/AccordionTrigger';

export default function Delivery() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <OrderAccordionStatus />
      <OrderAccordionStatus />
      <OrderAccordionStatus />
      <OrderAccordionStatus />
    </div>
  );
}

function OrderAccordionStatus() {
  const { orders, ordersProducts } = useContext(DeliveryPageContext);

  if (!ordersProducts) return null;

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      <Accordion.Root
        className="bg-white w-full rounded-md shadow-md"
        type="single"
        defaultValue={`a`}
        collapsible
      >
        {ordersProducts.map((orderProduct, index: number) => {
          return (
            <AccordionItem
              className=""
              key={index}
              value={`${orderProduct.o_number}`}
            >
              <AccordionTrigger className="flex items-center data-[state=open]:child:hidden">
                <span>{orderProduct.o_number}</span>
                <div>
                  <AiFillCaretDown
                    size={24}
                    className="data-[state='closed']:hidden"
                  />
                  <AiFillCaretRight
                    size={24}
                    className="data-[state=closed]:hidden"
                  />
                </div>
              </AccordionTrigger>
              <AccordionContent>a</AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion.Root>
      <pre className="mt-4 text-xs text-gray-600 whitespace-pre-wrap break-words">
        ordersProducts: {JSON.stringify(ordersProducts, null, '\t')}
      </pre>
    </div>
  );
}
