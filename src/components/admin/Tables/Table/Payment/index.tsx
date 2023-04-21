import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { serverURL } from '@/src/server/api';
import { iTablePaymentWithPaymentFKData } from '@/src/types/types';
import { useRouter } from 'next/router';
import { AiOutlinePlus } from 'react-icons/ai';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { RiArrowLeftSLine } from 'react-icons/ri';
import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '../../../../globalComponents/BottonNavigationBar';
import { PaymentContent } from './PaymentContent';

interface iPaymentsProps {
  total_orders_products_price: number;
  table_payments: iTablePaymentWithPaymentFKData[];
}

export function Payments({
  table_payments,
  total_orders_products_price,
}: iPaymentsProps) {
  const { query } = useRouter();

  const BottonNavigationBarOption: iBottonNavigationBarProps['options'] = [
    {
      prefetch: false,
      title: 'Adicionar pagamento',
      url: `${serverURL}${query.slug}/admin/table-control/${query.table_slug}/payments/process`,
      icon: <AiOutlinePlus size={28} />,
    },
    {
      prefetch: false,
      title: 'voltar',
      url: `${serverURL}${query.slug}/admin/table-control/${query.table_slug}`,
      icon: <RiArrowLeftSLine size={28} />,
    },
  ];

  return (
    <div className="h-screen w-screen  pb-20">
      <PageHeaders
        title="Pagar conta"
        icon={<MdOutlineAttachMoney size={32} />}
      />
      <PaymentContent
        table_payments={table_payments}
        total_orders_products_price={total_orders_products_price}
      />
      <BottonNavigationBar options={BottonNavigationBarOption} />
    </div>
  );
}
