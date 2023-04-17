import PageHeaders from '@/src/components/globalComponents/PageHeaders';
import { serverURL, supabase } from '@/src/server/api';
import { iPaymentMethodsRestaurantsWithFKData } from '@/src/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { MdOutlineAttachMoney } from 'react-icons/md';
import * as zod from 'zod';

interface iProcessProps {
  payment_method_restaurant: iPaymentMethodsRestaurantsWithFKData[];
  order_table_id: number;
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
  const router = useRouter();

  console.log(paymentMethodId);

  const handleSubmitPayment = async (data: NewPaymentFormData) => {
    console.log(data);
    const { data: table_payment_data } = await supabase
      .from('table_paymants')
      .insert({
        value: data.value,
        order_table_id: order_table_id,
        payment_mathod_id: data.paymentMethodsId,
      });

    // window.location.href = `${serverURL}${router.query.slug}/admin/table-control/${router.query.table_slug}/payments`
  };

  return (
    <div className={`h-screen w-screen `}>
      <PageHeaders
        title="Novo pagamento"
        icon={<MdOutlineAttachMoney size={32} />}
      />
      <form
        onSubmit={handleSubmit(handleSubmitPayment)}
        className="grid grid-cols-2 gap-20 justify-center px-16 py-4"
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
              href={`${serverURL}${router.query.slug}/admin/table-control/${router.query.table_slug}/payments`}
              className="flex items-center justify-center rounded text-white text-base cursor-pointer w-40 h-9 bg-white-blue"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center rounded text-white text-base cursor-pointer w-32 h-9 bg-orange-500 hover:bg-red-orange transition"
            >
              Adicionar pagamento
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full">
          {payment_method_restaurant.map(payment_method => {
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
                  className={`flex w-full items-center rounded h-9 px-3 shadow-sm ${
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
    </div>
  );
}
