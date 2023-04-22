import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersProductsWithFKProducdData,
  iOrdersWithStatusFKData,
} from '@/src/types/types';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RefObject } from 'react';

type iAccordionPrintOrderForDeliveryProps = {
  orders_products:
    | iOrdersProductsWithFKProducdData[]
    | iOrdersProductsWithFKDataToDelivery[];
  printOrderForProductionComponent: RefObject<HTMLDivElement>;
  order: iOrdersWithStatusFKData;
};

export default function AccordionPrintOrderForDelivery({
  orders_products,
  printOrderForProductionComponent,
  order,
}: iAccordionPrintOrderForDeliveryProps) {
  const formatCashBoxDate = (cashBoxDate: Date) => {
    return `${
      format(cashBoxDate, 'P', { locale: ptBR }) +
      ' ' +
      format(cashBoxDate, 'HH') +
      ':' +
      ' ' +
      format(cashBoxDate, 'mm')
    }`;
  };

  const totalOrderPrice = (
    orders_products as (
      | iOrdersProductsWithFKProducdData
      | iOrdersProductsWithFKDataToDelivery
    )[]
  ).reduce((acc, item) => {
    return (acc = acc + item.total_price * item.quantity);
  }, 0);

  const formatNumber = (number: number | null) => {
    return number
      ? number.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 0;
  };

  return (
    <div className="hidden">
      <div
        ref={printOrderForProductionComponent}
        className="z-[-2000] fixed bg-white ml-auto shadow-bd w-[298px] text-[12px] shadow-md p-4 hideShadowToPrint centerCompontetToPrint pb-8"
      >
        <h2 className="text-center uppercase text-black font-semibold">
          ENTREGA
        </h2>
        <h2 className="text-center uppercase text-black font-semibold">
          COMANDA -
          {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
            .order_type_id === 1
            ? 'Delivery'
            : null}
          {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
            .order_type_id === 2
            ? 'Retirada'
            : null}
        </h2>

        <div className="flex flex-col">
          <span className="mb-1 flex items-center justify-between">
            <strong>
              {(order as iOrdersWithStatusFKData).order_types.name !==
              'Retirada'
                ? (orders_products[0] as iOrdersProductsWithFKDataToDelivery)
                    .orders.clients.addresses.fullstring
                  ? (orders_products[0] as iOrdersProductsWithFKDataToDelivery)
                      .orders.clients.addresses.fullstring
                  : null
                : null}
            </strong>
          </span>
          <span className="mb-1 flex items-center gap-2">
            Nome:
            <strong>
              {
                (orders_products[0] as iOrdersProductsWithFKDataToDelivery)
                  .orders.clients.name
              }
            </strong>
          </span>
          <span className="mb-1 flex items-center gap-2">
            Telefone:
            <strong>
              {
                (orders_products[0] as iOrdersProductsWithFKDataToDelivery)
                  .orders.clients.contacts.phone
              }{' '}
            </strong>
          </span>
          <span className="mb-1 flex items-center gap-2">
            N°:
            <strong>
              {(
                orders_products[0] as iOrdersProductsWithFKDataToDelivery
              ).orders.number
                .toString()
                .padStart(5, '0')}{' '}
            </strong>
          </span>
          <span className="mb-1 flex items-center gap-2">
            Data:
            <strong> {formatCashBoxDate(new Date(order.created_at!))} </strong>
          </span>
        </div>

        <span className="mb-1 flex items-center gap-2">
          Subtotal: <strong>R$ {formatNumber(totalOrderPrice)} </strong>
        </span>
        <span className="mb-1 flex items-center gap-2">
          Taxa de entrega:{' '}
          <strong>
            R$ {formatNumber(order.delivery_fees ? order.delivery_fees.fee : 0)}{' '}
          </strong>
        </span>
        <span className="mb-1 flex items-center gap-2">
          Total:{' '}
          <strong>
            R${' '}
            {formatNumber(
              totalOrderPrice +
                (order.delivery_fees ? order.delivery_fees.fee : 0)
            )}{' '}
          </strong>
        </span>

        <hr className="my-2 h-[2px] bg-gray-400" />

        <div className="flex flex-col gap-2 uppercase">
          {orders_products.map((order_product, pIndex) => {
            return (
              <div key={pIndex} className="flex flex-col">
                <strong className="mb-1 flex items-center justify-between">
                  <span>
                    {order_product.quantity}X - {order_product.products.name}
                  </span>
                  <span>
                    R$ {order_product.total_price * order_product.quantity}
                  </span>
                </strong>
                {order_product.selectsWithOptions.length > 0 ? (
                  <div className="flex">
                    <div>
                      |&nbsp;
                      <span>
                        {order_product.selectsWithOptions.map(
                          (productSelects, psIndex) => {
                            return productSelects.options.map(
                              (option, index) => option.name + ' | '
                            );
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ) : null}

                {order_product.additionals.map((additional, aIndex) => {
                  return (
                    <span key={aIndex}>
                      {additional.quantity} - {additional.additional.name} -
                      <span className="font-semibold ml-auto">
                        R$ {additional.additional.price * additional.quantity}
                      </span>
                    </span>
                  );
                })}

                {order_product.observation ? (
                  <p>
                    <strong>Obs.:</strong> {order_product.observation}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        {/* <div>
          <p className="grid grid-cols-2 items-center gap-10">
            <span className={`${textStyles}`}>Total a pagar: </span>
            <span className={`${textStyles} w-`}>
              <strong>R$ {totalOrderPrice}</strong>
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
}