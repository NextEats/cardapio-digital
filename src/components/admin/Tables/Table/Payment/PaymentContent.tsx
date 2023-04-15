import { iTablePaymentMethodsWithPaymentFKData } from '@/src/types/types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ValueCard from '../feito/ValueCard';
import { PaymentsTable } from './PaymentsTable';

interface iPaymentContentProps {
  total_orders_products_price: number;
  table_payments: iTablePaymentMethodsWithPaymentFKData[];
}

export function PaymentContent({
  total_orders_products_price,
  table_payments,
}: iPaymentContentProps) {
  const tablePaymentsState = useState(table_payments);

  const totalPayd = table_payments.reduce((acc, item) => {
    return (acc = item.value * item.value);
  }, 0);

  const router = useRouter();

  return (
    <div className="h-[calc(100%-80px)] px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
      <div className="flex 2md:flex-col gap-3 p-3">
        <ValueCard
          title="Falta"
          value={`${total_orders_products_price - totalPayd}`}
        />
        <ValueCard
          title="Total pago"
          value={`${totalPayd}`}
          borderColor="border-blue-500"
        />
        <div className="flex flex-1 gap-2">
          <button className="flex items-center justify-center rounded text-white text-base cursor-pointer w-32 h-9 bg-white-blue">
            {' '}
            Cancelar{' '}
          </button>
          <Link
            href={``}
            className="flex flex-1 items-center justify-center rounded text-white text-base cursor-pointer w-32 h-9 bg-orange-500 hover:bg-red-orange transition"
          >
            Pagar{' '}
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[900px]">
        <PaymentsTable tablePaymentsState={tablePaymentsState} />
      </div>
    </div>
  );
}
