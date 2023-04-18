import { invoicingForEachOrderStatus } from '@/src/helpers/invoicingForEachOrderStatus';
import { iOrdersProductsWithFKData } from '@/src/types/types';

interface iOrderStatusRevenueProps {
  ordersProducts: iOrdersProductsWithFKData[];
}

export default function OrderStatusRevenue({
  ordersProducts,
}: iOrderStatusRevenueProps) {
  const invoiceOrderStatus = invoicingForEachOrderStatus({ ordersProducts });
  console.log(invoiceOrderStatus);

  return (
    <table className="min-w-full">
      <thead className="bg-white border-b">
        <tr>
          <th className="text-gray-900 px-6 py-4 text-left">
            Status dos Pedidos
          </th>
          <th className="text-gray-900 px-6 py-4 text-center">
            Total dos Produtos
          </th>
        </tr>
      </thead>
      <tbody>
        {invoiceOrderStatus.map((item, index) => {
          // if (item.orders.payment_methods.name === 'MESA') return null;
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
