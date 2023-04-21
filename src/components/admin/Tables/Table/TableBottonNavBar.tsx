import { TableContext } from '@/src/contexts/TableContext';
import { serverURL, supabase } from '@/src/server/api';
import { useContext, useRef } from 'react';
import { HiOutlinePlay } from 'react-icons/hi';
import { MdOutlineAttachMoney, MdOutlinePrint } from 'react-icons/md';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '../../../globalComponents/BottonNavigationBar';
import { ConfirmFinishServiceModal } from './ConfirmFinishServiceModal';
import OrderTableDetails from './OrderTableDetails';
import ProductsTableModal from './ProductsTableModal';
import TableConfigModal from './TableConfigModal';

interface iTableBottonNavBarProps {}

export default function TableBottonNavBar({}: iTableBottonNavBarProps) {
  const {
    table,
    restaurant,
    orders_tables,
    table_paymants_values,
    orders_products,
  } = useContext(TableContext);
  const printOrderTableComponent = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printOrderTableComponent.current,
  });

  const totalSpent = orders_products.reduce((acc, item) => {
    return (acc = acc + item.total_price * item.quantity);
  }, 0);

  const isUnableToFinishService = table_paymants_values >= totalSpent;

  const handleStartSrvice = async () => {
    console.log('3');
    if (table.is_active) {
      toast.error(
        'O atendimento só pode ser iniciado se a mesa estiver ativa.',
        { theme: 'light' }
      );
      return;
    }
    const { data: cashBoxData } = await supabase
      .from('cash_boxes')
      .select('id')
      .match({
        restaurant_id: restaurant.id,
        is_open: true,
      });

    if (!cashBoxData) {
      toast.error(
        'O atendimento só pode ser iniciado se o caixa estiver aberto',
        { theme: 'light' }
      );
      return;
    }

    console.log('1');
    const { data: orders } = await supabase
      .from('orders')
      .select('number')
      .match({
        restaurant_id: restaurant.id,
        cash_box_id: cashBoxData[0].id,
      });
    // Mapeie a matriz de objetos para uma matriz de números de pedidos
    const orderNumbers = orders ? orders.map(order => order.number) : [0];

    // Encontre o maior número de pedido
    const maxOrderNumber =
      orderNumbers.length > 0 ? Math.max(...orderNumbers) : 0;
    const nextOrderNumber = maxOrderNumber + 1;

    const { data: orderData } = await supabase
      .from('orders')
      .insert({
        payment_method_id: 7,
        number: nextOrderNumber,
        order_type_id: 3,
        restaurant_id: restaurant.id,
        order_status_id: 3,
        cash_box_id: cashBoxData[0].id,
      })
      .select('*');

    if (!orderData) {
      toast.error(
        'Ocorreu um problema ao iniciar o atendimento. Se esse problema persistir, entre em contato com o suporte NextEats!',
        { theme: 'light' }
      );
      return;
    }

    const [] = await Promise.all([
      supabase.from('orders_tables').insert({
        order_id: orderData[0].id,
        table_id: table.id,
        has_been_paid: false,
      }),
      supabase.from('tables').update({ is_occupied: true }).eq('id', table.id),
    ]);

    window.location.reload();
  };

  const BottonNavigationBarOptionTable: iBottonNavigationBarProps['options'] = [
    {
      prefetch: false,
      openDialogTrigger: (
        <div className="relative px-3">
          {orders_tables ? (
            <>
              <ConfirmFinishServiceModal />
              <div
                className={`absolute top-1 right-0 h-3 w-3 rounded-full ${
                  isUnableToFinishService ? 'bg-green-500' : 'bg-red-orange'
                }`}
              ></div>
            </>
          ) : (
            <button
              onClick={() => handleStartSrvice()}
              className="flex items-center gap-2"
            >
              <HiOutlinePlay size={24} />
              <span className="hidden lg:flex">Iniciar atendimento</span>
            </button>
          )}
        </div>
      ),
    },
    {
      prefetch: false,
      openDialogTrigger: (
        <button onClick={() => handlePrint()} className="relative px-3">
          <span>Imprimir</span>
        </button>
      ),
      icon: (
        <MdOutlinePrint
          size={26}
          className="cursor-pointer"
          onClick={() => handlePrint()}
        />
      ),
    },
    {
      prefetch: false,
      title: 'Pagamentos',
      url: `${serverURL}${restaurant.slug}/admin/table-control/${table.table_slug}/payments`,
      icon: <MdOutlineAttachMoney size={28} />,
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
      title: 'Voltar',
      url: `${serverURL}${restaurant.slug}/admin/table-control`,
      icon: <RiArrowLeftSLine size={28} />,
    },
  ];

  return (
    <>
      <OrderTableDetails printOrderTableComponent={printOrderTableComponent} />
      <BottonNavigationBar options={BottonNavigationBarOptionTable} />
    </>
  );
}
