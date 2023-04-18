import { api } from '@/src/server/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from 'react-hook-form';
import * as zod from 'zod';

interface iOpenCashBoxModalProps {
  restaurantId: number;
}

const newCashBoxFormValidationSchema = zod.object({
  initialValue: zod
    .number()
    .min(0, { message: 'Insira um valor válido acima de 0.' }),
});

type NewCashBoxFormData = zod.infer<typeof newCashBoxFormValidationSchema>;

export default function OpenCashBoxModal({
  restaurantId,
}: iOpenCashBoxModalProps) {
  const {
    handleSubmit,
    register,
    formState: { isSubmitting },
  } = useForm<NewCashBoxFormData>({
    resolver: zodResolver(newCashBoxFormValidationSchema),
    defaultValues: {
      initialValue: 0,
    },
  });

  async function handleOpenCashBox(data: NewCashBoxFormData) {
    await api.post('api/cash_boxes/open', {
      restaurant_id: restaurantId,
      initial_value: data.initialValue,
    });
    location.reload();
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="flex items-center gap-1 justify-center text-white leading-5 font-semibold rounded transition-all ease-in-out w-48 h-9 bg-green-500">
          Abrir caixa
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
          <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6">
            <Dialog.Title className="text-base w-full text-center font-semibold mb-6">
              Abrir caixa
            </Dialog.Title>

            <form
              className="w-full flex flex-col gap-6"
              onSubmit={handleSubmit(handleOpenCashBox)}
            >
              <input
                {...register('initialValue', { valueAsNumber: true })}
                type="number"
                className="h-9 w-full px-2 outline-none border focus:border-orange-500 rounded"
              />
              <div className="flex items-center gap-2">
                <Dialog.Close asChild disabled={isSubmitting}>
                  <button
                    type="button"
                    className="flex items-center justify-center rounded text-white text-base cursor-pointer w-[49%] h-9 bg-white-blue"
                    aria-label="Close"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex flex-1 items-center justify-center rounded text-white text-base cursor-pointer w-[49%] h-9
                      transition bg-orange-500  hover:bg-red-orange disabled:bg-gray-400`}
                >
                  Abrir
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
