/* eslint-disable react-hooks/rules-of-hooks */
import { invoicingForEachOrderStatus } from '@/src/helpers/invoicingForEachOrderStatus';
import { invoicingForEachPaymentMethod } from '@/src/helpers/invoicingForEachPaymentMethod';
import { iCashBox, iOrdersProductsWithFKData } from '@/src/types/types';
import { RefObject } from 'react';

interface iCashBoxReport {
  ordersProducts: iOrdersProductsWithFKData[];
  totalMesa: number;
  totalDelivery: number;
  activeCashBox: iCashBox['data'] | null;
  cashBoxReportRef: RefObject<HTMLDivElement>;
}

export default function CashBoxReport({
  cashBoxReportRef,
  ordersProducts,
  activeCashBox,
  totalDelivery,
  totalMesa,
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

  const invoiceOrderStatus = invoicingForEachOrderStatus({ ordersProducts });

  const invoicePaymentMethods = invoicingForEachPaymentMethod({
    ordersProducts,
  });

  return (
    <div className="hidden">
      <div
        ref={cashBoxReportRef}
        className="z-40 fixed bg-white ml-auto w-[298px] text-[12px] p-4 centerCompontetToPrint pb-8"
      >
        <h1 className="text-base w-full uppercase text-center font-semibold mb-6">
          Extrato de Caixa
        </h1>

        <div className="flex flex-col">
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
            <strong> R$ {formatNumber(totalMesa + totalDelivery)}</strong>
          </span>

          <hr className="bg-black my-2" />

          {invoiceOrderStatus.map((item, index) => {
            return (
              <span key={index} className={`${textStyles}`}>
                {' '}
                {item.name}: <strong> R$ {formatNumber(item.value)}</strong>
              </span>
            );
          })}

          <hr className="bg-black my-2" />

          {invoicePaymentMethods.map((item, index) => {
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
