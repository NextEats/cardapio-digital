import ValueCard from '../../globalComponents/ValueCard';

interface iCashBillingCardsProps {
  totalMesa: number;
  totalDeli: number;
}

export default function CashBillingCards({
  totalDeli,
  totalMesa,
}: iCashBillingCardsProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <ValueCard title="Saldo Inicial" value={300} />
      <ValueCard
        title="Total Do Delivery"
        value={totalDeli}
        borderColor="border-green-500"
      />
      <ValueCard title="Saldo Total" value={totalDeli + totalMesa} />
      <ValueCard
        title="Total das Mesas"
        value={totalMesa}
        borderColor="border-green-500"
      />
    </div>
  );
}
