import { TableContext } from '@/src/contexts/TableContext';
import { iOrders, iOrdersProductsWithFKProducdData } from '@/src/types/types';
import * as Accordion from '@radix-ui/react-accordion';
import { useContext } from 'react';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import { AccordionOrdersActions } from './AccordionOrdersActions';
import { AccordionTrigger } from './AccordionTrigger';

interface iRadixAccordionProps {
  orders: iOrders['data'];
  orders_products: iOrdersProductsWithFKProducdData[];
}

export function RadixOrderAccordion({
  orders,
  orders_products,
}: iRadixAccordionProps) {
  const { table } = useContext(TableContext);

  return (
    <div className="w-full max-w-[900px]">
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
            <AccordionItem className="" key={order.id} value={`${order.id}`}>
              <AccordionTrigger>
                # {order.number.toString().padStart(5, '0')}{' '}
              </AccordionTrigger>
              <AccordionContent>
                {ordersProductsFilterdByOrderId.map(order_product => {
                  return (
                    <div
                      key={order_product.id}
                      className="flex flex-1 flex-col gap-[2px]"
                    >
                      <div className="flex items-center gap-2">
                        <p className="text-md flex flex-1 items-center justify-between">
                          <span>{order_product.products.name}</span>
                          <span className="text-green-400">
                            R${' '}
                            {order_product.products.price.toLocaleString(
                              'pt-BR',
                              {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }
                            )}
                          </span>
                        </p>
                        <AccordionOrdersActions />
                        {/* <BsThreeDotsVertical
                          size={16}
                          className="text-gray-400"
                        /> */}
                      </div>

                      <span className="w-full px-3 text-sm text-brand-light-orange">
                        {order_product.observation}
                      </span>
                      <div className="px-3">
                        {order_product.selectsWithOptions.map(select => {
                          return select.options.map(option => {
                            return (
                              <span key={option.id} className="">
                                {' '}
                                {option.name},{' '}
                              </span>
                            );
                          });
                        })}
                      </div>
                      <div className="flex flex-col items-center text-sm px-6">
                        {order_product.additionals.map(additional => {
                          return (
                            <p
                              key={additional.additional.id}
                              className="text-md flex flex-1 items-center justify-between text-gray-400"
                            >
                              <span className="">
                                {' '}
                                {additional.quantity} X -{' '}
                                {additional.additional.name}{' '}
                              </span>
                              <span>
                                R${' '}
                                {additional.additional.price.toLocaleString(
                                  'pt-BR',
                                  {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  }
                                )}
                              </span>
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion.Root>
    </div>
  );
}
