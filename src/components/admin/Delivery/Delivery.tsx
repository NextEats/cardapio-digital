import { DeliveryPageContext } from '@/src/contexts/DeliveryContext';

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

        const ordersFilterd = ordersGByStatus.orders.filter(
          or => or.order_types.name !== 'Mesa'
        );
        return (
          <div key={index} className="">
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
              orders={ordersFilterd || []}
              orders_products={ordersProducts || []}
            />
          </div>
        );
      })}
    </div>
  );
}
