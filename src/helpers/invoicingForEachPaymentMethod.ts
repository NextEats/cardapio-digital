import { iOrdersProductsWithFKData } from '../types/types';

interface iInvoicingForEachPaymentMethodProps {
  ordersProducts: iOrdersProductsWithFKData[];
}

export const invoicingForEachPaymentMethod = ({
  ordersProducts,
}: iInvoicingForEachPaymentMethodProps) => {
  return ordersProducts.reduce(
    (
      acc: { name: string; value: number }[],
      item: iOrdersProductsWithFKData
    ) => {
      if (item.orders.order_status.status_name !== 'entregue') return acc;

      // If the payment method exists in acc, this code only adds the order_product value
      if (acc.some(pm => pm.name === item.orders.payment_methods.name)) {
        const updatedAcc = acc.map(pm => {
          if (pm.name === item.orders.payment_methods.name) {
            return {
              ...pm,
              value: pm.value + item.quantity * item.total_price,
            };
          }
          return pm;
        });
        return (acc = updatedAcc);
      }

      // If the payment method doesn't exist in acc, this code adds it and its value
      const newAcc = [
        ...acc,
        {
          name: item.orders.payment_methods.name,
          value: item.quantity * item.total_price,
        },
      ];
      return (acc = newAcc);
    },
    []
  );
};
