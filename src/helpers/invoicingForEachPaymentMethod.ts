import {
  iOrdersProductsWithFKData,
  iTablePaymentWithPaymentFKData,
} from '../types/types';

interface iInvoicingForEachPaymentMethodProps {
  ordersProducts: iOrdersProductsWithFKData[];
  tables_payments: iTablePaymentWithPaymentFKData[];
}

export const invoicingForEachPaymentMethod = ({
  ordersProducts,
  tables_payments,
}: iInvoicingForEachPaymentMethodProps) => {
  const otFormOfPaymnet = tables_payments
    ? tables_payments.reduce(
        (
          acc: { name: string; value: number }[],
          item: iTablePaymentWithPaymentFKData
        ) => {
          // If the payment method exists in acc, this code only adds the order_product value
          if (acc.some(pm => pm.name === item.payment_methods.name)) {
            const updatedAcc = acc.map(pm => {
              if (pm.name === item.payment_methods.name) {
                return {
                  ...pm,
                  value: pm.value + item.value,
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
              name: item.payment_methods.name,
              value: item.value,
            },
          ];
          return (acc = newAcc);
        },
        []
      )
    : [];

  const opFormOfPaymnet = ordersProducts.reduce(
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

  const mergedArray = opFormOfPaymnet.concat(otFormOfPaymnet);

  return mergedArray.reduce(
    (
      accumulator: { name: string; value: number }[],
      currentItem: { name: string; value: number }
    ) => {
      const existingItem = accumulator.find(
        item => item.name === currentItem.name
      );

      if (existingItem) {
        existingItem.value += currentItem.value;
      } else {
        accumulator.push(currentItem);
      }

      return accumulator;
    },
    []
  );
};
