import ValueCard from '../feito/ValueCard';
import { PaymentsTable } from './PaymentsTable';

interface iPaymentContentProps {}

export function PaymentContent({}: iPaymentContentProps) {
  return (
    <div className="h-[calc(100%-80px)] px-16 py-4 flex flex-col 2md:flex-row gap-3 lg:gap-10">
      <div className="flex 2md:flex-col gap-3 p-3">
        <ValueCard title="Total gasto" value={'300,00'} />
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
