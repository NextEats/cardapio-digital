import { invoicingForEachPaymentMethod } from '@/src/helpers/invoicingForEachPaymentMethod';
import { iOrdersProductsWithFKData } from '@/src/types/types';

interface iFormOfPaymentProps {
  ordersProducts: iOrdersProductsWithFKData[];
}

export default function FormOfPayment({ ordersProducts }: iFormOfPaymentProps) {
  const invoicePaymentMethods = invoicingForEachPaymentMethod({
    ordersProducts,
  });

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
