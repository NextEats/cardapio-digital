import { RadixOrderAccordion } from '@/src/components/globalComponents/RadixOrderAccordion';
import { TableContext } from '@/src/contexts/TableContext';
import { useContext } from 'react';

interface iTableOrderProps {}

export default function TableOrder({}: iTableOrderProps) {
  const { table, order, orders_products } = useContext(TableContext);

  return (
    <div className="flex flex-1">
      <RadixOrderAccordion orders={[order]} orders_products={orders_products} />
    </div>
  );
}
