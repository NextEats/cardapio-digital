import { TableContext } from '@/src/contexts/TableContext';
import { iTablePayments } from '@/src/types/types';
import { useContext } from 'react';
import ValueCard from '../feito/ValueCard';
import { PaymentsTable } from './PaymentsTable';

interface iPaymentContentProps {
  total_orders_products_price: number;
  table_payments: iTablePayments['data'];
}

export function PaymentContent({
  total_orders_products_price,
  table_payments,
}: iPaymentContentProps) {
  const { orders_products } = useContext(TableContext);
  const totalPayd = table_payments.reduce((acc, item) => {
    return (acc = item.value * item.value);
  }, 0);

  return (
    <div className="h-[calc(100%-80px)] px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
      <div className="flex 2md:flex-col gap-3 p-3">
        <ValueCard title="Falta" value={`${total_orders_products_price}`} />
        <ValueCard
          title="Total pago"
          value={`${totalPayd}`}
          borderColor="border-blue-500"
        />
      </div>
      <div className="w-full max-w-[900px]">
        <PaymentsTable table_payments={table_payments} />
      </div>
    </div>
  );
}
