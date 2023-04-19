import { DeliveryPageContext } from '@/src/contexts/DeliveryContextProvider';
import { iOrdersWithStatusFKData } from '@/src/types/types';
import { useContext } from 'react';
import { RadixOrderAccordion } from '../../globalComponents/RadixOrderAccordion';

interface iOrderDeliveryList {
  title: string;
  ordersGByStatus: {
    status_name: string;
    orders: iOrdersWithStatusFKData[];
  };
}

export default function OrderDeliveryList({
  title,
  ordersGByStatus,
}: iOrderDeliveryList) {
  const { orders, ordersProducts } = useContext(DeliveryPageContext);

  // const ordersGrouoedByStatus = getOrdersGroupedByStatus({ orders });

  const ordersFilterd = ordersGByStatus.orders.filter(
    or => or.order_types.name !== 'Mesa'
  );

  return (
    <div className="">
      <div className="flex w-full items-center justify-between mb-1">
        <span>{title}</span>
        <span>{ordersFilterd.length}</span>
      </div>
      <RadixOrderAccordion
        isToDelivery
        orders={ordersFilterd || []}
        orders_products={ordersProducts || []}
      />
    </div>
  );
}
