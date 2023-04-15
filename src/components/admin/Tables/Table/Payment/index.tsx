import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { serverURL } from '@/src/server/api';
import { iTablePayments } from '@/src/types/types';
import { useRouter } from 'next/router';
import { MdOutlineAttachMoney } from 'react-icons/md';
import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '../../../../globalComponents/BottonNavigationBar';
import { PaymentContent } from './PaymentContent';

interface iPaymentsProps {
  total_orders_products_price: number;
  table_payments: iTablePayments['data'];
}

export function Payments({
  table_payments,
  total_orders_products_price,
}: iPaymentsProps) {
  const { query } = useRouter();

  const BottonNavigationBarOption: iBottonNavigationBarProps['options'] = [
    {
      prefetch: false,
      title: 'voltar',
      url: `${serverURL}${query.slug}/admin/table-control/${query.table_slug}`,
    },
  ];

  return (
    <div className="h-screen w-screen">
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
