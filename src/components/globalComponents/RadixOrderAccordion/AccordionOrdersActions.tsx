import { supabase } from '@/src/server/api';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';

type iAccordionOrdersActionsProps = {
  order_prodcut_id: number;
};

export default function AccordionOrdersActions({
  order_prodcut_id,
}: iAccordionOrdersActionsProps) {
  const handleDeleteOrderProdcut = async () => {
    const { data } = await supabase
      .from('orders_products')
      .delete()
      .eq('id', order_prodcut_id);
    // window.location.reload()
  };

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <BsThreeDotsVertical size={16} className="text-gray-400" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <DropdownMenu.Item
              onClick={() => handleDeleteOrderProdcut()}
              className="group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center gap-3 hover:bg-white-blue cursor-pointer h-9 px-[5px]
                                                            relative pl-[25px]"
            >
              <FaRegTrashAlt size={16} />
              <span className="text-base">Excluir produto</span>
            </DropdownMenu.Item>
            <DropdownMenu.Arrow className="fill-white" />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
