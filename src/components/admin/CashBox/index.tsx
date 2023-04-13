import Button from '@/src/components/nButton';
import { api } from '@/src/server/api';
import { iCashBox, iOrdersWithFKData } from '@/src/types/types';
import { useState } from 'react';
import CashClosingReportModal from '../initialPage/CashClosingReportModal';

interface iCashBoxButtons {
  ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
  restaurantId: number;
  cashBoxState: iCashBox['data'] | undefined;
  billing: number;
}

export default function CashBoxButtons({
  ordersGroupedByOrderStatus,
  restaurantId,
  cashBoxState,
  billing,
}: iCashBoxButtons) {
  const [openCashBoxState, setOpenCashBoxState] = useState(false);
  const [openCashBoxClosingReportModal, setOpenCashBoxClosingReportModal] =
    useState(false);

  async function handleOpenCashBox() {
    await api.post('api/cash_boxes/open', {
      restaurant_id: restaurantId,
    });
    setOpenCashBoxState(true);
    location.reload();
  }

  function getOrdersWithCashBoxId(arr: any) {
    if (!arr['entregue']) {
      return;
    }

    const res = arr['entregue'].filter(
      (order: any) => order.cash_box_id === cashBoxState?.id
    );

    return res;
  }
  async function openCashBoxReportToCloseCashBox() {
    setOpenCashBoxClosingReportModal(true);
  }

  if (!ordersGroupedByOrderStatus) {
    return null;
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-black w-full">
        <div className="flex items-center col-span-4 md:col-span-3">
          <h1 className="text-2xl font-bold text-black">
            ${' '}
            {cashBoxState !== undefined
              ? 'Caixa Aberto 🟢'
              : 'Caixa Fechado 🔴'}
          </h1>
        </div>
        <div className="col-span-4 md:col-span-1">
          <Button
            OnClick={
              cashBoxState !== undefined
                ? openCashBoxReportToCloseCashBox
                : handleOpenCashBox
            }
            text={cashBoxState !== undefined ? 'Fechar Caixa' : 'Abrir Caixa'}
            bgColor="orange"
            fullWhidth
          />
        </div>
        <div className="flex flex-col col-span-4 md:col-span-1 items-start bg-white border-2 rounded-md border-orange-400 shadow-black shadow-shadow-500 p-4">
          <h2 className="text-gray-900">Saldo Inicial</h2>
          <h3 className="text-base font-medium text-navy-700 text-right w-full">
            R$ 300,00
          </h3>
        </div>
        <div className="flex flex-col col-span-4 md:col-span-1 items-start bg-white border-2 rounded-md border-green-400 shadow-black shadow-shadow-500 p-4">
          <h2 className="text-gray-900">Total Do Delivery</h2>
          <h3 className="text-base font-medium text-navy-700 text-right w-full">
            R$ 300,00
          </h3>
        </div>
        <div className="flex flex-col col-span-4 md:col-span-1 items-start bg-white border-2 rounded-md border-orange-400 shadow-black shadow-shadow-500 p-4">
          <h2 className="text-gray-900">Saldo Total</h2>
          <h3 className="text-base font-medium text-navy-700 text-right w-full">
            R$ 4023,00
          </h3>
        </div>
        <div className="flex flex-col col-span-4 md:col-span-1 items-start bg-white border-2 rounded-md border-green-400 shadow-black shadow-shadow-500 p-4">
          <h2 className="text-gray-900">Total das Mesas</h2>
          <h3 className="text-base font-medium text-navy-700 text-right w-full">
            R$ 4023,00
          </h3>
        </div>

        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <table className="min-w-full">
            <thead className="bg-white border-b">
              <tr>
                <th className="text-gray-900 px-6 py-4 text-left">
                  Forma de Pagamento
                </th>
                <th className="text-gray-900 px-6 py-4 text-center">
                  Valor Saida
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                  Cartão de Crédito
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  R$ 843,50
                </td>
              </tr>
              <tr className="border-b">
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                  Cartão de Crédito
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  R$ 843,50
                </td>
              </tr>
              <tr className="border-b">
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                  Cartão de Crédito
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  R$ 843,50
                </td>
              </tr>
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
              <tr className="border-b">
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  1
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap">
                  Cancelado
                </td>
                <td className="text-gray-500 px-6 py-4 whitespace-nowrap text-center">
                  R$ 843,50
                </td>
              </tr>
              <tr className="border-b">
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
              </tr>
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
