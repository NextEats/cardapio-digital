import { iOrders, iOrdersProductsWithFKProducdData } from '@/src/types/types';
import * as Accordion from '@radix-ui/react-accordion';
import { MdOutlinePrint } from 'react-icons/md';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import AccordionOrdersActions from './AccordionOrdersActions';
import { AccordionTrigger } from './AccordionTrigger';

interface iRadixAccordionProps {
  orders: iOrders['data'];
  orders_products: iOrdersProductsWithFKProducdData[];
}

export function RadixOrderAccordion({
  orders,
  orders_products,
}: iRadixAccordionProps) {
  return (
    <div className="w-full max-w-[900px]">
      <Accordion.Root
        className="bg-white w-full rounded-md shadow-md"
        type="single"
        defaultValue={`${orders && orders.length !== 0 ? orders[0].id : '1'}`}
        collapsible
      >
        {!orders || orders.length === 0 ? (
          <AccordionItem className="" value="1">
            <AccordionTrigger>
              <span> O Atendimento ainda não foi iniciado!</span>
            </AccordionTrigger>
            <AccordionContent>
              <span>Sem predido</span>
            </AccordionContent>
          </AccordionItem>
        ) : (
          orders.map(order => {
            const ordersProductsFilterdByOrderId = orders_products.filter(
              op => op.order_id === order.id
            );
            return (
              <AccordionItem className="" key={order.id} value={`${order.id}`}>
                <AccordionTrigger className="flex items-center ">
                  <span> # {order.number.toString().padStart(5, '0')}</span>
                  <div>
                    <MdOutlinePrint size={24} />
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {ordersProductsFilterdByOrderId.map(order_product => {
                    return (
                      <div
                        key={order_product.id}
                        className="flex flex-1 flex-col gap-[2px]"
                      >
                        <div className="flex items-center gap-2">
                          <div className="text-md flex flex-1 items-center justify-between">
                            <div>
                              <span className="text-sm">
                                {order_product.quantity} X{' '}
                              </span>
                              <span> - {order_product.products.name}</span>
                            </div>
                            <span className="text-green-400">
                              R${' '}
                              {(
                                order_product.total_price *
                                order_product.quantity
                              ).toLocaleString('pt-BR', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          </div>
                          <AccordionOrdersActions
                            order_prodcut_id={order_product.id}
                          />
                        </div>

                        <span className="w-full px-3 text-sm text-brand-light-orange">
                          {order_product.observation}
                        </span>
                        <div className="px-3">
                          {order_product.selectsWithOptions.map(select => {
                            return select.options.map(option => {
                              return (
                                <span key={option.id} className="">
                                  {option.name},
                                </span>
                              );
                            });
                          })}
                        </div>
                        <div className="flex flex-col items-center text-sm px-6">
                          {order_product.additionals.map(additional => {
                            return (
                              <div
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
                                  {(
                                    additional.additional.price *
                                    additional.quantity
                                  ).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                  })}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })
        )}
      </Accordion.Root>
    </div>
  );
}
