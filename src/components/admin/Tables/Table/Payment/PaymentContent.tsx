import { iTablePaymentWithPaymentFKData } from '@/src/types/iTable';
import { useRouter } from 'next/router';
import { useState } from 'react';
import ValueCard from '../../../../globalComponents/ValueCard';
import { PaymentsTable } from './PaymentsTable';

interface iPaymentContentProps {
  total_orders_products_price: number;
  table_payments: iTablePaymentWithPaymentFKData[];
}

export function PaymentContent({
  total_orders_products_price,
  table_payments,
}: iPaymentContentProps) {
  const tablePaymentsState = useState(table_payments);

  const totalPayd = table_payments.reduce((acc, item) => {
    return (acc = acc + item.value);
  }, 0);

  const router = useRouter();

  const amountDue =
    total_orders_products_price - totalPayd >= 0
      ? total_orders_products_price - totalPayd
      : 0;

  return (
    <div className="h-[calc(100%-80px)] px-6 3xs:px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
      <div className="flex flex-col 3xs:flex-row 2md:flex-col 2md:w-64 xl:w-80 gap-3 3xs:p-3">
        <ValueCard title="Falta" value={`${amountDue}`} />
        <ValueCard
          title="Total pago"
          value={`${totalPayd}`}
          borderColor="border-blue-500"
        />
      </div>
      <div className="w-full max-w-[900px]">
        <PaymentsTable tablePaymentsState={tablePaymentsState} />
      </div>
    </div>
  );
}
