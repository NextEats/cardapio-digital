import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { TableContext } from '@/src/contexts/TableContext';
import { serverURL } from '@/src/server/api';
import Image from 'next/image';
import { useContext } from 'react';
import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '../../../globalComponents/BottonNavigationBar';
import TableConfigModal from './TableConfigModal';
import TableContent from './TableContent';

interface iTableProps {}

export default function Table({}: iTableProps) {
  const { table, restaurant } = useContext(TableContext);

  const BottonNavigationBarOptionTable: iBottonNavigationBarProps['options'] = [
    {
      prefetch: false,
      title: 'voltar',
      url: `${serverURL}${restaurant.slug}/admin/table-control`,
    },
    {
      prefetch: false,
      title: 'Pagamentos',
      url: `${serverURL}${restaurant.slug}/admin/table-control/${table.table_slug}/payments`,
    },
    {
      prefetch: false,
      title: 'voltar',
      url: `${serverURL}${restaurant.slug}/admin/table-control/${table.table_slug}/payments`,
    },
    {
      title: 'Configurações',
      openDialogTrigger: <TableConfigModal />,
    },
    // {
    //   title: "Produtos",
    //   openDialogTrigger:  <ProductsTableModal />
    // },
  ];

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
      <BottonNavigationBar options={BottonNavigationBarOptionTable} />
    </div>
  );
}
