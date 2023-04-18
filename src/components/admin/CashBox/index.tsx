/* eslint-disable react-hooks/rules-of-hooks */
import {
  iCashBox,
  iOrdersProductsWithFKData,
  iOrdersWithFKData,
} from '@/src/types/types';
import { useState } from 'react';
import CashClosingReportModal from '../initialPage/CashClosingReportModal';

interface iCashBoxButtons {
  ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
  restaurantId: number;
  cashBoxState: iCashBox['data'] | undefined | null;
  billing: number;
  ordersProducts: iOrdersProductsWithFKData[];
}

export function CashBox({
  ordersGroupedByOrderStatus,
  restaurantId,
  cashBoxState,
  billing,
  ordersProducts,
}: iCashBoxButtons) {
  const [openCashBoxState, setOpenCashBoxState] = useState(false);
  const [openCashBoxClosingReportModal, setOpenCashBoxClosingReportModal] =
    useState(false);

  function getOrdersWithCashBoxId(arr: any) {
    if (!arr['entregue']) {
      return;
    }

    const res = arr['entregue'].filter(
      (order: any) => order.cash_box_id === cashBoxState?.id
    );

    return res;
  }

  if (!ordersGroupedByOrderStatus) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-black w-full">
        <div className="flex items-center col-span-4 md:col-span-3">
          <h1 className="text-2xl font-bold text-black">
            $ {cashBoxState !== null ? 'Caixa Aberto 🟢' : 'Caixa Fechado 🔴'}
          </h1>
        </div>

        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th className="text-gray-900 px-6 py-4 text-left">
                  Forma de Pagamento
                </th>
                <th className="text-gray-900 px-6 py-4 text-center">
                  Valor Entrada
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersProducts.map(item => {
                if (item.orders.payment_methods.name === 'MESA') return null;
                return (
                  <tr key={item.id} className="border-b">
                    <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                      {item.orders.payment_methods.name}
                    </td>
                    <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                      R$ {item.total_price * item.quantity}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th className="text-gray-900 px-6 py-4 text-center">#</th>
                <th className="text-gray-900 px-6 py-4 text-left">
                  Status dos Pedidos
                </th>
                <th className="text-gray-900 px-6 py-4 text-center">
                  Total dos Produtos
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersProducts.map(item => {
                if (item.orders.payment_methods.name === 'MESA') return null;
                return (
                  <tr key={item.id} className="border-b">
                    <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                      {item.id}
                    </td>
                    <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                      {item.orders.order_status.status_name}
                    </td>
                    <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                      R$ {item.total_price * item.quantity}
                    </td>
                  </tr>
                );
              })}
              {/* <tr className="border-b">
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  2
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                  Entregue
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  R$ 843,50
                </td>
              </tr>
              <tr className="border-b">
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  3
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                  Cancelado
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  R$ 843,50
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
      <CashClosingReportModal
        cashBoxState={cashBoxState}
        ordersGroupedByOrderStatus={getOrdersWithCashBoxId(
          ordersGroupedByOrderStatus
        )}
        restaurantId={restaurantId}
        openCashBoxClosingReportModal={openCashBoxClosingReportModal}
        setOpenCashBoxClosingReportModal={setOpenCashBoxClosingReportModal}
        billing={billing}
      />
    </>
  );
}
