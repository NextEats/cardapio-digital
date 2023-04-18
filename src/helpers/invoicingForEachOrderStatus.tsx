import { iOrdersProductsWithFKData } from '../types/types';

interface iInvoicingForEachOrderStatusProps {
  ordersProducts: iOrdersProductsWithFKData[];
}

export const invoicingForEachOrderStatus = ({
  ordersProducts,
}: iInvoicingForEachOrderStatusProps) => {
  return ordersProducts.reduce(
    (
      acc: { name: string; value: number }[],
      item: iOrdersProductsWithFKData
    ) => {
      // If the order status exists in acc, this code only adds the order_product value
      if (acc.some(pm => pm.name === item.orders.order_status.status_name)) {
        const updatedAcc = acc.map(pm => {
          if (pm.name === item.orders.order_status.status_name) {
            return {
              ...pm,
              value: pm.value + item.quantity * item.total_price,
            };
          }
          return pm;
        });
        return (acc = updatedAcc);
      }

      // If the order status doesn't exist in acc, this code adds it and its value
      const newAcc = [
        ...acc,
        {
          name: item.orders.order_status.status_name,
          value: item.quantity * item.total_price,
        },
      ];
      return (acc = newAcc);
    },
    []
  );
};
