import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { serverURL } from '@/src/server/api';
import { useRouter } from 'next/router';
import { MdOutlineAttachMoney } from 'react-icons/md';
import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '../../../../globalComponents/BottonNavigationBar';
import { PaymentContent } from './PaymentContent';

interface iPaymentsProps {}

export function Payments({}: iPaymentsProps) {
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
      <PaymentContent />
      <BottonNavigationBar options={BottonNavigationBarOption} />
    </div>
  );
}
