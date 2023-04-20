import { iOrdersWithStatusFKData } from '../types/types';

interface iGetOrdersGroupedByStatusProps {
  orders: iOrdersWithStatusFKData[];
}

const requiredStatusNames = [
  'em análise',
  'em produção',
  'a caminho',
  'entregue',
  'cancelado',
];

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

  // Add missing status names with empty orders arrays
  for (const statusName of requiredStatusNames) {
    if (!ordersGrouped.some(o => o.status_name === statusName)) {
      ordersGrouped.push({ status_name: statusName, orders: [] });
    }
  }

  // Sort the ordersGrouped array based on the required order of status names
  ordersGrouped.sort(
    (a, b) => getStatusOrder(a.status_name) - getStatusOrder(b.status_name)
  );

  return ordersGrouped;
}

function getStatusOrder(statusName: string): number {
  return requiredStatusNames.indexOf(statusName);
}
