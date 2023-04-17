import { TableContext } from '@/src/contexts/TableContext';
import { useContext } from 'react';
import ValueCard from './ValueCard';

export default function TableValueCards() {
  const { orders_products, table_paymants_values } = useContext(TableContext);

  const totalSpent = orders_products.reduce((acc, item) => {
    return (acc = acc + item.total_price * item.quantity);
  }, 0);
  console.log(orders_products);
  return (
    <div className="flex 2md:flex-col gap-3 p-3">
      <ValueCard title="Total gasto" value={`${totalSpent}`} />
      <ValueCard
        title="Total pago"
        value={`${totalSpent - table_paymants_values}`}
        borderColor="border-blue-500"
      />
    </div>
  );
}
