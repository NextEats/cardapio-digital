import BottonNavigationBar, {
  iBottonNavigationBarProps,
} from '@/src/components/globalComponents/BottonNavigationBar';
import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { serverURL, supabase } from '@/src/server/api';
import { iPaymentMethodsRestaurantsWithFKData } from '@/src/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AiOutlineClear } from 'react-icons/ai';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { RiArrowLeftSLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import * as zod from 'zod';
interface iProcessProps {
  payment_method_restaurant: iPaymentMethodsRestaurantsWithFKData[];
  order_table_id: number | null;
}

const newPaymentFormValidationSchema = zod.object({
  value: zod.number().min(0, { message: 'Insira um valor válido acima de 0.' }),
  paymentMethodsId: zod
    .number()
    .min(1, { message: 'Selecione um método de pagamento.' }),
});

type NewPaymentFormData = zod.infer<typeof newPaymentFormValidationSchema>;

export default function Process({
  payment_method_restaurant,
  order_table_id,
}: iProcessProps) {
  const { register, handleSubmit, reset, setValue, watch } =
    useForm<NewPaymentFormData>({
      resolver: zodResolver(newPaymentFormValidationSchema),
      defaultValues: {
        paymentMethodsId: 0,
        value: 0,
      },
    });

  const paymentMethodId = watch('paymentMethodsId');
  const { query } = useRouter();

  const handleSubmitPayment = async (data: NewPaymentFormData) => {
    if (order_table_id === null) {
      toast.error('O pagamendo só é possivel após iniciar o atendimento.', {
        theme: 'light',
      });
      return;
    }
    const { data: table_payment_data } = await supabase
      .from('table_payments')
      .insert({
        value: data.value,
        order_table_id: order_table_id,
        payment_mathod_id: data.paymentMethodsId,
      });
    toast.success('Pagamento realizado com sucesso.', { theme: 'light' });
    reset();
  };

  const BottonNavigationBarOption: iBottonNavigationBarProps['options'] = [
    {
      prefetch: false,
      title: (
        <button onClick={() => reset()} className="flex items-center gap-2">
          <AiOutlineClear size={28} />
          <span className="hidden lg:flex">Limpar</span>
        </button>
      ),
    },
    {
      prefetch: false,
      title: 'Voltar',
      url: `${serverURL}${query.slug}/admin/table-control/${query.table_slug}/payments`,
      icon: <RiArrowLeftSLine size={28} />,
    },
  ];

  return (
    <div className={`h-screen w-screen  pb-20`}>
      <PageHeaders
        title="Novo pagamento"
        icon={<MdOutlineAttachMoney size={32} />}
      />
      <form
        onSubmit={handleSubmit(handleSubmitPayment)}
        className="grid grid-cols-1 2md:grid-cols-2 gap-10 2md:gap-20 justify-center px-8 md:px-16 py-4"
      >
        <div className="flex flex-col gap-6">
          <label htmlFor="" className="flex flex-col gap-1 ">
            Valor
            <input
              {...register('value', { valueAsNumber: true })}
              type="number"
              className="w-full px-2 py-1 rounded bg-white border border-white-blue outline-none focus:border-orange-500"
            />
          </label>
          <div className="flex items-center gap-2">
            <Link
              href={`${serverURL}${query.slug}/admin/table-control/${query.table_slug}/payments`}
              className="flex flex-1 items-center justify-center rounded text-white text-base cursor-pointer h-9 bg-white-blue"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={!order_table_id}
              className="flex flex-1 items-center justify-center rounded text-white text-base cursor-pointer h-9 disabled:bg-gray-400 disabled:cursor-not-allowed bg-orange-500 hover:bg-red-orange transition-all"
            >
              Adicionar
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          {!order_table_id
            ? 'O atendimento ainda não foi iniciado'
            : payment_method_restaurant.map(payment_method => {
                if (payment_method.payment_methods.name === 'MESA') return null;
                return (
                  <div key={payment_method.id} className="w-full">
                    <button
                      type="button"
                      onClick={() =>
                        setValue(
                          'paymentMethodsId',
                          payment_method.payment_methods.id
                        )
                      }
                      className={`flex w-full items-center rounded py-[6px] px-3 shadow-sm ${
                        paymentMethodId == payment_method.payment_methods.id
                          ? '  bg-orange-500'
                          : ' bg-white'
                      } `}
                    >
                      {payment_method.payment_methods.name}
                    </button>
                  </div>
                );
              })}
        </div>
      </form>
      <BottonNavigationBar options={BottonNavigationBarOption} />
    </div>
  );
}
