import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { TableContext } from '@/src/contexts/TableContext';
import { serverURL } from '@/src/server/api';
import Image from 'next/image';
import { useContext, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '../../../globalComponents/BottonNavigationBar';
import ProductsTableModal from './feito/ProductsTableModal';
import TableConfigModal from './feito/TableConfigModal';
import TableContent from './feito/TableContent';
import OrderTableDetails from './OrderTableDetails';

interface iTableProps {}

export default function Table({}: iTableProps) {
  const { table, restaurant } = useContext(TableContext);
  const printOrderTableComponent = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printOrderTableComponent.current,
  });

  const BottonNavigationBarOptionTable: iBottonNavigationBarProps['options'] = [
    {
      prefetch: false,
      title: (
        <button onClick={() => console.log('edu')} className="relative px-3">
          <span>Finalizar atendimento</span>
          <div className="absolute top-1 right-0 bg-red-orange h-3 w-3 rounded-full"></div>
        </button>
      ),
      url: '',
    },
    {
      prefetch: false,
      title: (
        <button onClick={() => handlePrint()} className="relative px-3">
          <span>Imprimir</span>
        </button>
      ),
      url: ``,
    },
    {
      prefetch: false,
      title: 'Pagamentos',
      url: `${serverURL}${restaurant.slug}/admin/table-control/${table.table_slug}/payments`,
    },
    {
      title: 'Configurações',
      openDialogTrigger: <TableConfigModal />,
    },
    {
      title: 'Produtos',
      openDialogTrigger: <ProductsTableModal />,
    },
    {
      prefetch: false,
      title: 'voltar',
      url: `${serverURL}${restaurant.slug}/admin/table-control`,
    },
  ];

  return (
    <div className="h-screen w-screen">
      <OrderTableDetails printOrderTableComponent={printOrderTableComponent} />
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
