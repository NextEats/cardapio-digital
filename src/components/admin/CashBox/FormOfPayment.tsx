import { invoicingForEachPaymentMethod } from '@/src/helpers/invoicingForEachPaymentMethod';
import {
  iOrdersProductsWithFKData,
  iTablePaymentWithPaymentFKData,
} from '@/src/types/types';

interface iFormOfPaymentProps {
  ordersProducts: iOrdersProductsWithFKData[];
  tables_payments: iTablePaymentWithPaymentFKData[];
}

export default function FormOfPayment({
  ordersProducts,
  tables_payments,
}: iFormOfPaymentProps) {
  const invoicePaymentMethods = invoicingForEachPaymentMethod({
    ordersProducts,
    tables_payments,
  });

  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          <th className="text-gray-900 px-3 md:px-6 py-4 text-left">
            Forma de Pagamento
          </th>
          <th className="text-gray-900 px-3 md:px-6 py-4 text-center">
            Valor Entrada
          </th>
        </tr>
      </thead>
      <tbody className="uppercase max-w-full">
        {invoicePaymentMethods.map((item, index) => {
          if (item.name === 'MESA') return null;
          return (
            <tr key={index} className="border-b max-w-full">
              <td className="text-gray-500 px-3 md:px-6 py-4 w-full">
                <div className="">{item.name}</div>
              </td>
              <td className="text-gray-500 px-3 md:px-6 py-4 whitespace-nowrap text-center">
                R$ {item.value}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
