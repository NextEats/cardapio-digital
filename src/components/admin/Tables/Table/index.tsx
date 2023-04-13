import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { TableContext } from '@/src/contexts/TableContext';
import { getOrdersProductsWithFKProducdDataByOrdersIdsFetch } from '@/src/fetch/ordersProducts/getOrdersProductsWithFKProducdDataByOrdersIds';
import Image from 'next/image';
import { useContext } from 'react';
import BottonNavigationBar from './BottonNavigationBar';
import TableContent from './TableContent';

interface iTableProps {}

export default function Table({}: iTableProps) {
  const { table, orders_tables } = useContext(TableContext);
  getOrdersProductsWithFKProducdDataByOrdersIdsFetch({
    ordersIds: [orders_tables.orders.id],
  });

  return (
    <div className="h-screen w-screen">
      <PageHeaders
        icon={
          <div>
            <Image
              className="h-10 w-10"
              src="/table_icon.jpg"
              alt=""
              height={200}
              width={200}
            />
          </div>
        }
        title={table.name!}
      />
      <TableContent />
      <BottonNavigationBar />
    </div>
  );
}
