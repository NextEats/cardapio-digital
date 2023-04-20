import { supabase } from '@/src/server/api';
import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersProductsWithFKProducdData,
} from '@/src/types/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import AccordionPrintOrder from './AccordionPrintOrder';

type iAccordionOrderActionsProps = {
  orders_products:
    | iOrdersProductsWithFKProducdData[]
    | iOrdersProductsWithFKDataToDelivery[];
};

export default function AccordionOrderActions({
  orders_products,
}: iAccordionOrderActionsProps) {
  const handleCancelOrder = async () => {
    const { data } = await supabase
      .from('orders')
      .update({
        order_status_id: 5,
      })
      .eq('id', orders_products[0].order_id);
  };

  const handleSwitchToProduction = async () => {
    const { data } = await supabase
      .from('orders')
      .update({
        order_status_id: 3,
      })
      .eq('id', orders_products[0].order_id);
  };

  const handleSwitchToDelivery = async () => {
    const { data } = await supabase
      .from('orders')
      .update({
        order_status_id: 4,
      })
      .eq('id', orders_products[0].order_id);
  };

  const handleSwitchToDelivered = async () => {
    const { data } = await supabase
      .from('orders')
      .update({
        order_status_id: 1,
      })
      .eq('id', orders_products[0].order_id);
  };

  const printOrderComponent = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printOrderComponent.current,
  });

  return (
    <div>
      <AccordionPrintOrder
        orders_products={orders_products}
        printOrderComponent={printOrderComponent}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="p-2">
          <BsThreeDotsVertical size={16} className="text-gray-400" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item
              onClick={() => handlePrint()}
              className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
            >
              <span className="text-base">Imprimir comanda</span>
            </DropdownMenu.Item>
            {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
              .order_status.status_name !== 'entregue' ? (
              <DropdownMenu.Item
                onClick={() => handleCancelOrder()}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
              >
                <span className="text-base">Cancelar pedido</span>
              </DropdownMenu.Item>
            ) : null}
            {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
              .order_status.status_name === 'em análise' ? (
              <DropdownMenu.Item
                onClick={() => handleSwitchToProduction()}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
              >
                <span className="text-base">Aceitar pedido</span>
              </DropdownMenu.Item>
            ) : null}
            {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
              .order_status.status_name === 'em produção' ? (
              <DropdownMenu.Item
                onClick={() => handleSwitchToDelivery()}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
              >
                <span className="text-base"> Mandar p/ entrega</span>
              </DropdownMenu.Item>
            ) : null}
            {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
              .order_status.status_name === 'a caminho' ? (
              <DropdownMenu.Item
                onClick={() => handleSwitchToDelivered()}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
              >
                <span className="text-base">Pedido entregue</span>
              </DropdownMenu.Item>
            ) : null}
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
