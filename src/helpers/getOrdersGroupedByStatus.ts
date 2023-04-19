import { iOrdersWithStatusFKData } from '../types/types';

interface iGetOrdersGroupedByStatusProps {
  orders: iOrdersWithStatusFKData[];
}

export function getOrdersGroupedByStatus({
  orders,
}: iGetOrdersGroupedByStatusProps) {
  const ordersGrouped = orders.reduce(
    (
      acc: { status_name: string; orders: iOrdersWithStatusFKData[] }[],
      item: iOrdersWithStatusFKData
    ) => {
      if (acc.some(o => o.status_name === item.order_status.status_name)) {
        const updatedAcc = acc.map(os => {
          if (os.status_name === item.order_status.status_name) {
            return { ...os, orders: [...os.orders, item] };
          }
          return os;
        });
        return (acc = updatedAcc);
      }

      return (acc = [
        ...acc,
        { status_name: item.order_status.status_name, orders: [item] },
      ]);
    },
    []
  );
  return ordersGrouped;
}
