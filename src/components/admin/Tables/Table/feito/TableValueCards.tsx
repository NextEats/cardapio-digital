import { TableContext } from '@/src/contexts/TableContext';
import { useContext } from 'react';
import ValueCard from '../../../../globalComponents/ValueCard';

export default function TableValueCards() {
  const { orders_products, table_paymants_values } = useContext(TableContext);

  const totalSpent = orders_products.reduce((acc, item) => {
    return (acc = acc + item.total_price * item.quantity);
  }, 0);

  return (
    <div className="flex flex-col 3xs:flex-row 2md:flex-col 2md:w-64 xl:w-80 gap-3 3xs:p-3">
      <ValueCard title="Total gasto" value={`${totalSpent}`} />
      <ValueCard
        title="Total pago"
        value={`${table_paymants_values}`}
        borderColor="border-blue-500"
      />
    </div>
  );
}
