import { TableContext } from '@/src/contexts/TableContext';
import { useContext } from 'react';
import ValueCard from '../feito/ValueCard';
import { PaymentsTable } from './PaymentsTable';

interface iPaymentContentProps {}

export function PaymentContent({}: iPaymentContentProps) {
  const { orders_products } = useContext(TableContext);
  const totalSpent = orders_products.reduce((acc, item) => {
    return (acc = item.total_price * item.quantity);
  }, 0);
  return (
    <div className="h-[calc(100%-80px)] px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
      <div className="flex 2md:flex-col gap-3 p-3">
        <ValueCard title="Falta" value={`${totalSpent}`} />
        <ValueCard
          title="Total pago"
          value={'300,00'}
          borderColor="border-blue-500"
        />
      </div>
      <div className="w-full max-w-[900px]">
        <PaymentsTable />
      </div>
    </div>
  );
}
