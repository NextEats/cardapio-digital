import { iCashBox } from '@/src/types/types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PageHeaders from '../../globalComponents/PageHeaders';
import OpenCashBoxModal from './OpenCashBoxModal';

interface iCashHeaderProps {
  restaurantId: number;
  activeCashBox: iCashBox['data'] | null;
  thereArePendingOrders: boolean;
}

export default function CashHeader({
  restaurantId,
  activeCashBox,
  thereArePendingOrders,
}: iCashHeaderProps) {
  const [openCashBoxState, setOpenCashBoxState] = useState(false);

  function closeOpenCashBox() {
    console.log(thereArePendingOrders);
    if (thereArePendingOrders) {
      toast.error(
        'O caixa só pode ser feixado quando todos dos pedidos forem entregues.',
        { theme: 'light' }
      );
      return;
    }
  }

  return (
    <div className="">
      <PageHeaders
        title={activeCashBox ? 'Caixa aberto' : 'Caixa fechado'}
        rightContent={
          <div className="col-span-4 md:col-span-1">
            {!activeCashBox ? (
              <OpenCashBoxModal
                restaurantId={restaurantId}
                activeCashBox={activeCashBox}
              />
            ) : (
              <button
                onClick={() => closeOpenCashBox()}
                className="flex items-center gap-1 justify-center text-white leading-5 font-semibold rounded transition-all ease-in-out w-48 h-9 bg-orange-500"
              >
                Fechar caixa
              </button>
            )}
          </div>
        }
      />
    </div>
  );
}
