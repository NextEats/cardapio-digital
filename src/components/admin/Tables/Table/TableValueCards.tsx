import ValueCard from './ValueCard';

export default function TableValueCards() {
  return (
    <div className="flex 2md:flex-col gap-3 p-3">
      <ValueCard title="Total gasto" value={'300,00'} />
      <ValueCard
        title="Total pago"
        value={'300,00'}
        borderColor="border-blue-500"
      />
    </div>
  );
}
