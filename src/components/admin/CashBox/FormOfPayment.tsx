import { iOrdersProductsWithFKData } from '@/src/types/types';

interface iFormOfPaymentProps {
  ordersProducts: iOrdersProductsWithFKData[];
}

export default function FormOfPayment({ ordersProducts }: iFormOfPaymentProps) {
  const invoicingForEachPaymentMethod = () => {
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
  const invoicePaymentMethods = invoicingForEachPaymentMethod();
  console.log(invoicePaymentMethods);

  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          <th className="text-gray-900 px-6 py-4 text-left">
            Forma de Pagamento
          </th>
          <th className="text-gray-900 px-6 py-4 text-center">Valor Entrada</th>
        </tr>
      </thead>
      <tbody>
        {invoicePaymentMethods.map((item, index) => {
          if (item.name === 'MESA') return null;
          return (
            <tr key={index} className="border-b">
              <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                {item.name}
              </td>
              <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                R$ {item.value}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
