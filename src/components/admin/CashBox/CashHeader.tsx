import { supabase } from '@/src/server/api';

import { iCashBox } from '@/src/types/iCashBox';
import { iOrdersProductsWithFKData } from '@/src/types/iOrders';
import { iTablePaymentWithPaymentFKData } from '@/src/types/iTable';
import { useRef } from 'react';
import { MdOutlinePrint } from 'react-icons/md';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import PageHeaders from '../../globalComponents/PageHeaders';
import CashBoxReport from './CashBoxReport';
import OpenCashBoxModal from './OpenCashBoxModal';

interface iCashHeaderProps {
  totalMesa: number;
  totalDelivery: number;
  restaurantId: number;
  activeCashBox: iCashBox['data'] | null;
  thereArePendingOrders: boolean;
  ordersProducts: iOrdersProductsWithFKData[];
  tables_payments: iTablePaymentWithPaymentFKData[];
}

export default function CashHeader({
  restaurantId,
  activeCashBox,
  thereArePendingOrders,
  totalDelivery,
  totalMesa,
  ordersProducts,
  tables_payments,
}: iCashHeaderProps) {
  async function closeOpenCashBox() {
    if (thereArePendingOrders) {
      toast.error(
        'O caixa só pode ser fechado quando todos os pedidos tiverem sido entregues.',
        { theme: 'light' }
      );
      return;
    }
    const { data } = await supabase
      .from('cash_boxes')
      .update({
        is_open: false,
        final_value: totalDelivery + totalMesa,
        closed_at: new Date().toISOString(),
      })
      .eq('id', activeCashBox!.id)
      .select('*');
    location.reload();
  }

  const cashBoxReportRef = useRef<HTMLDivElement>(null);

  const printCashBoxReport = useReactToPrint({
    content: () => cashBoxReportRef.current,
  });

  return (
    <div className="">
      <CashBoxReport
        ordersProducts={ordersProducts}
        totalDelivery={totalDelivery}
        activeCashBox={activeCashBox}
        totalMesa={totalMesa}
        cashBoxReportRef={cashBoxReportRef}
        tables_payments={tables_payments}
      />
      <PageHeaders
        title={activeCashBox ? 'Caixa aberto' : 'Caixa fechado'}
        rightContent={
          <div className="col-span-4 md:col-span-1">
            {!activeCashBox ? (
              <OpenCashBoxModal restaurantId={restaurantId} />
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => closeOpenCashBox()}
                  className="flex items-center gap-1 justify-center text-white leading-5 font-semibold rounded transition-all ease-in-out w-20 sm:w-36 lg:w-48 h-9 bg-orange-500 hover:bg-red-orange"
                >
                  Fechar
                </button>
                <button
                  onClick={() => printCashBoxReport()}
                  className="flex items-center gap-1 justify-center text-black leading-5 font-semibold rounded transition-all ease-in-out w-14 sm:w-16 h-9 bg-white-blue hover:bg-slate-300"
                >
                  <MdOutlinePrint size={26} />
                </button>
              </div>
            )}
          </div>
        }
      />
    </div>
  );
}
