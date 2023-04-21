import { DeliveryPageContext } from '@/src/contexts/DeliveryContext';

import { AdminContext } from '@/src/contexts/adminContext';
import { getOrdersGroupedByStatus } from '@/src/helpers/getOrdersGroupedByStatus';
import { useAudioAlert } from '@/src/hooks/useAudioAlert';
import { useWhatsAppStatus } from '@/src/hooks/useWhatsAppStatus';
import Link from 'next/link';
import { useContext } from 'react';
import { RadixOrderAccordion } from '../../globalComponents/RadixOrderAccordion';

export default function Delivery() {
  const { restaurant } = useContext(AdminContext);
  const { orders, ordersProducts } = useContext(DeliveryPageContext);
  const ordersGroupedByStatus = getOrdersGroupedByStatus({ orders });

  useAudioAlert(ordersGroupedByStatus);
  const whatsappStatus = useWhatsAppStatus(restaurant?.slug);

  return (
    <div className="h-full max-h-full overflow-y-auto ">
      {whatsappStatus && whatsappStatus != 'successChat' ? (
        <div className="p-8 border-2 border-red-500 rounded-md bg-red-50 mb-12">
          <h3>Servidor do WhatsApp não conectado!</h3>
          <Link
            className="underline italic text-blue-400"
            href={`/admin/${restaurant?.slug}/configuracoes`}
          >
            Clique aqui para abrir a aba de configurações.
          </Link>
        </div>
      ) : null}
      <div className="flex max-w-full overflow-x-auto h-full">
        {ordersGroupedByStatus.map((ordersGByStatus, index) => {
          if (ordersGByStatus.status_name === 'cancelado') return null;

          const ordersFilterd = ordersGByStatus.orders.filter(
            or => or.order_types.name !== 'Mesa'
          );
          return (
            <div key={index} className="px-2 min-w-[380px]">
              <div className="flex w-full items-center justify-between mb-1">
                <span>
                  {ordersGByStatus.status_name === 'em análise'
                    ? 'Novos Pedidos'
                    : null}
                  {ordersGByStatus.status_name === 'em produção'
                    ? 'Em Produção'
                    : null}
                  {ordersGByStatus.status_name === 'a caminho'
                    ? 'A Caminho'
                    : null}
                  {ordersGByStatus.status_name === 'entregue'
                    ? 'Entregues'
                    : null}
                </span>
                <span>
                  {ordersGByStatus.status_name === 'em análise'
                    ? ordersFilterd.length
                    : null}
                  {ordersGByStatus.status_name === 'em produção'
                    ? ordersFilterd.length
                    : null}
                  {ordersGByStatus.status_name === 'a caminho'
                    ? ordersFilterd.length
                    : null}
                  {ordersGByStatus.status_name === 'entregue'
                    ? ordersFilterd.length
                    : null}
                </span>
              </div>
              <RadixOrderAccordion
                isToDelivery
                orders={ordersFilterd || []}
                orders_products={ordersProducts || []}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
