import {
  iOrders,
  iOrdersProductsWithFKDataToDelivery,
  iOrdersProductsWithFKProducdData,
  iOrdersWithStatusFKData,
} from '@/src/types/types';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionContent } from './AccordionContent';
import { AccordionItem } from './AccordionItem';
import AccordionOrderActions from './AccordionOrderActions';
import AccordionOrderProductActions from './AccordionOrderProductActions';
import { AccordionTrigger } from './AccordionTrigger';

interface iRadixAccordionProps {
  orders: iOrders['data'] | iOrdersWithStatusFKData[];
  orders_products:
    | iOrdersProductsWithFKProducdData[]
    | iOrdersProductsWithFKDataToDelivery[];
  isToDelivery?: boolean;
}

export function RadixOrderAccordion({
  orders,
  orders_products,
  isToDelivery = false,
}: iRadixAccordionProps) {
  const items = [
    {
      id: 'item1',
      label: 'Item 1',
      onClick: () => console.log('Item 1 clicked'),
    },
    {
      id: 'item2',
      label: 'Item 2',
      onClick: () => console.log('Item 2 clicked'),
    },
  ];

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
              {isToDelivery
                ? 'Sem pedido '
                : 'O Atendimento ainda não foi iniciado!'}
            </AccordionTrigger>
            <AccordionContent> Sem predido </AccordionContent>
          </AccordionItem>
        ) : (
          orders.map(order => {
            if (
              isToDelivery &&
              (order as iOrdersWithStatusFKData).order_types.name === 'Mesa'
            )
              return null;
            const ordersProductsFilterdByOrderId = orders_products.filter(
              op => op.order_id === order.id
            );

            return (
              <div key={order.id} className="">
                <AccordionItem value={`${order.id}`}>
                  <div className="relative">
                    <div className=" flex items-center gap-2 absolute top-[.45rem] right-3">
                      <AccordionOrderActions
                        orders_products={ordersProductsFilterdByOrderId}
                      />
                      <AccordionOrderActions
                        orders_products={ordersProductsFilterdByOrderId}
                      />
                    </div>
                    <AccordionTrigger className="flex items-center ">
                      <span> # {order.number.toString().padStart(5, '0')}</span>
                    </AccordionTrigger>
                    <AccordionContent>
                      {ordersProductsFilterdByOrderId.map(order_product => {
                        if (isToDelivery) console.log(order_product);
                        return (
                          <div
                            key={order_product.id}
                            className="flex flex-1 flex-col gap-[2px]"
                          >
                            {isToDelivery ? (
                              <div className="text-xs flex flex-col">
                                <span>
                                  {(
                                    ordersProductsFilterdByOrderId[0] as iOrdersProductsWithFKDataToDelivery
                                  ).orders.clients.addresses
                                    ? (
                                        ordersProductsFilterdByOrderId[0] as iOrdersProductsWithFKDataToDelivery
                                      ).orders.clients.addresses.cep
                                    : null}
                                </span>
                                <div className="flex items-center justify-between">
                                  <span>
                                    {
                                      (order as iOrdersWithStatusFKData)
                                        .order_types.name
                                    }{' '}
                                    -{' '}
                                    {
                                      (
                                        ordersProductsFilterdByOrderId[0] as iOrdersProductsWithFKDataToDelivery
                                      ).orders.payment_methods.name
                                    }
                                  </span>
                                </div>
                                <span>
                                  {
                                    (
                                      ordersProductsFilterdByOrderId[0] as iOrdersProductsWithFKDataToDelivery
                                    ).orders.clients.name
                                  }{' '}
                                  -{' '}
                                  {
                                    (
                                      ordersProductsFilterdByOrderId[0] as iOrdersProductsWithFKDataToDelivery
                                    ).orders.clients.contacts.phone
                                  }
                                </span>
                              </div>
                            ) : null}
                            <div className="flex items-center gap-2">
                              <div className="text-md flex flex-1 gap-2  items-center justify-between">
                                <div className="flex flex-1 items-center">
                                  <span className="text-sm ">
                                    {order_product.quantity} X{' '}
                                  </span>
                                  <span className="w-24 xs:w-auto truncate">
                                    {' '}
                                    - {order_product.products.name}
                                  </span>
                                </div>
                                <span className="text-green-400 truncate">
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
                              {!isToDelivery ? (
                                <AccordionOrderProductActions
                                  order_prodcut_id={order_product.id}
                                />
                              ) : null}
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
                            <div className="flex flex-col justify-center text-sm px-6">
                              {order_product.additionals.map(additional => {
                                return (
                                  <div
                                    key={additional.additional.id}
                                    className="text-md flex flex-1 gap-2 items-center justify-between text-gray-400"
                                  >
                                    <span className="truncate">
                                      {' '}
                                      {additional.quantity} X -{' '}
                                      {additional.additional.name}{' '}
                                    </span>
                                    <span className="">
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
                  </div>
                </AccordionItem>
              </div>
            );
          })
        )}
      </Accordion.Root>
    </div>
  );
}
