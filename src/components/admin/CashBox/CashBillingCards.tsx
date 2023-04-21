import ValueCard from '../../globalComponents/ValueCard';

interface iCashBillingCardsProps {
  totalMesa: number;
  totalDelivery: number;
  cashBoxInitialValue: number;
}

export default function CashBillingCards({
  totalDelivery,
  totalMesa,
  cashBoxInitialValue,
}: iCashBillingCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      <ValueCard title="Saldo Inicial" value={cashBoxInitialValue} />

      <ValueCard
        title="Total Do Delivery"
        value={totalDelivery}
        borderColor="border-green-500"
      />

      <ValueCard
        borderColor="border-green-500"
        title="Total das Mesas"
        value={totalMesa}
      />

      <ValueCard
        title="Saldo Total"
        value={totalDelivery + totalMesa + cashBoxInitialValue}
      />
    </div>
  );
}
