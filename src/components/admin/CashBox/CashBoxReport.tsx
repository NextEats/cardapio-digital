/* eslint-disable react-hooks/rules-of-hooks */
import { invoicingForEachOrderStatus } from '@/src/helpers/invoicingForEachOrderStatus';
import { invoicingForEachPaymentMethod } from '@/src/helpers/invoicingForEachPaymentMethod';
import { supabase } from '@/src/server/api';
import { iCashBox } from '@/src/types/iCashBox';
import { iOrdersProductsWithFKData } from '@/src/types/iOrders';
import { iTablePaymentWithPaymentFKData } from '@/src/types/iTable';
import { iUserDetails } from '@/src/types/iUser';
import { useUser } from '@supabase/auth-helpers-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { RefObject, useEffect, useState } from 'react';

interface iCashBoxReport {
  ordersProducts: iOrdersProductsWithFKData[];
  totalMesa: number;
  totalDelivery: number;
  activeCashBox: iCashBox['data'] | null;
  cashBoxReportRef: RefObject<HTMLDivElement>;
  tables_payments: iTablePaymentWithPaymentFKData[];
}

export default function CashBoxReport({
  cashBoxReportRef,
  ordersProducts,
  activeCashBox,
  totalDelivery,
  totalMesa,
  tables_payments,
}: iCashBoxReport) {
  const textStyles = 'text-[10px]';

  const formatNumber = (number: number | null) => {
    return number
      ? number.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : 0;
  };
  const user = useUser();

  const [usersData, setUsersData] = useState<iUserDetails['data'] | null>(null);

  useEffect(() => {
    async function fetchData() {
      const getUserData = await supabase
        .from('user_details')
        .select()
        .eq('user_id', user?.id);
      if (getUserData.data) setUsersData(getUserData.data[0]);
    }
    fetchData();
  }, [user]);

  const invoiceOrderStatus = invoicingForEachOrderStatus({ ordersProducts });

  const invoicePaymentMethods = invoicingForEachPaymentMethod({
    ordersProducts,
    tables_payments,
  });

  const formatCashBoxDate = (cashBoxDate: Date) => {
    if (cashBoxDate) {
      return `${
        format(cashBoxDate, 'P', { locale: ptBR }) +
        ' ' +
        format(cashBoxDate, 'HH') +
        ':' +
        ' ' +
        format(cashBoxDate, 'mm')
      }`;
    } else {
      return null;
    }
  };

  return (
    <div className="hidden">
      <div
        ref={cashBoxReportRef}
        className="z-40 fixed bg-white ml-auto w-[298px] text-[12px] p-4 centerCompontetToPrint pb-8 uppercase"
      >
        <h1 className="text-base w-full uppercase text-center font-semibold mb-6">
          Extrato de Caixa
        </h1>

        <div className="flex flex-col">
          <span className={`${textStyles}`}>
            Data inicial:{' '}
            <strong>
              {' '}
              {activeCashBox?.opened_at
                ? formatCashBoxDate(new Date(activeCashBox?.opened_at!))
                : null}
            </strong>
          </span>
          <span className={`${textStyles}`}>
            Data final:{' '}
            <strong>
              {' '}
              {activeCashBox?.closed_at
                ? formatCashBoxDate(new Date(activeCashBox?.opened_at!))
                : ''}
            </strong>
          </span>
          <span className={`${textStyles}`}>
            Email: <strong> R$ {user?.email} </strong>
          </span>
          <span className={`${textStyles}`}>
            Nome: <strong> R$ {usersData?.name} </strong>
          </span>

          <hr className="bg-black my-2" />

          <span className={`${textStyles}`}>
            {' '}
            Saldo inicial:{' '}
            <strong> R$ {formatNumber(activeCashBox?.initial_value!)}</strong>
          </span>
          <span className={`${textStyles}`}>
            {' '}
            total do delivery:{' '}
            <strong> R$ {formatNumber(totalDelivery)}</strong>
          </span>
          <span className={`${textStyles}`}>
            {' '}
            total das mesas: <strong> R$ {formatNumber(totalMesa)}</strong>
          </span>
          <span className={`${textStyles}`}>
            {' '}
            Saldo final:{' '}
            <strong>
              {' '}
              R${' '}
              {formatNumber(
                totalMesa + totalDelivery + activeCashBox?.initial_value!
              )}
            </strong>
          </span>

          <hr className="bg-black my-2" />

          {invoiceOrderStatus.map((item: any, index: any) => {
            return (
              <span key={index} className={`${textStyles}`}>
                {' '}
                {item.name}: <strong> R$ {formatNumber(item.value)}</strong>
              </span>
            );
          })}

          <hr className="bg-black my-2" />

          {invoicePaymentMethods.map((item: any, index: any) => {
            if (item.name === 'MESA') return null;
            return (
              <span key={index} className={`${textStyles}`}>
                {' '}
                {item.name}: <strong> R$ {formatNumber(item.value)}</strong>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
