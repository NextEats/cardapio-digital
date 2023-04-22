import { supabase } from '@/src/server/api';
import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersProductsWithFKProducdData,
  iOrdersWithStatusFKData,
} from '@/src/types/types';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useRef } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useReactToPrint } from 'react-to-print';
import AccordionPrintOrderForDelivery from './AccordionPrintOrderForDelivery';
import AccordionPrintOrderForProduction from './AccordionPrintOrderForProduction';

type iAccordionOrderActionsProps = {
  orders_products:
    | iOrdersProductsWithFKProducdData[]
    | iOrdersProductsWithFKDataToDelivery[];
  order: iOrdersWithStatusFKData;
};

export default function AccordionOrderActions({
  orders_products,
  order,
}: iAccordionOrderActionsProps) {
  const handleCancelOrder = async () => {
    const { data } = await supabase
      .from('orders')
      .update({
        order_status_id: 5,
      })
      .eq('id', orders_products[0].order_id);
  };

  const printOrderComponent = useRef<HTMLDivElement>(null);

  const printOrderForProductionComponent = useRef<HTMLDivElement>(null);

  const handlePrintForProduction = useReactToPrint({
    content: () => printOrderForProductionComponent.current,
  });

  const handlePrint = useReactToPrint({
    content: () => printOrderComponent.current,
  });

  const handlePrintAndAcceptOrder = useReactToPrint({
    content: () => printOrderForProductionComponent.current,
    onAfterPrint: () => handlePrint(),
  });

  const handleSwitchToProduction = async () => {
    const { data } = await supabase
      .from('orders')
      .update({
        order_status_id: 3,
      })
      .eq('id', order.id);
  };

  // const handlePrintAndAcceptOrder = async () => {
  //   handleSwitchToProduction();
  //   handlePrintForProduction();
  //   handlePrint();
  // };

  return (
    <div>
      <AccordionPrintOrderForDelivery
        order={order}
        orders_products={orders_products}
        printOrderForProductionComponent={printOrderForProductionComponent}
      />
      <AccordionPrintOrderForProduction
        orders_products={orders_products}
        printOrderComponent={printOrderComponent}
      />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="p-1">
          <BsThreeDotsVertical size={20} className="text-gray-400" />
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
              <span className="text-base">Comanda p/ produção</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => handlePrintForProduction()}
              className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
            >
              <span className="text-base">Comanda p/ entrega</span>
            </DropdownMenu.Item>
            {order.order_status.status_name === 'em análise' ? (
              <DropdownMenu.Item
                onClick={() => {
                  handlePrintAndAcceptOrder();
                  handleSwitchToProduction();
                }}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
              >
                <span className="text-base">Imprimir e aceitar</span>
              </DropdownMenu.Item>
            ) : null}
            {(orders_products[0] as iOrdersProductsWithFKDataToDelivery).orders
              .order_status.status_name !== 'entregue' ? (
              <DropdownMenu.Item
                onClick={() => handleCancelOrder()}
                className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px] relative pl-[25px]"
              >
                <span className="text-base">Cancelar pedido</span>
              </DropdownMenu.Item>
            ) : null}
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
