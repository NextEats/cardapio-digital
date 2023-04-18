import { TableContext } from '@/src/contexts/TableContext';
import { supabase } from '@/src/server/api';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext } from 'react';
interface iConfirmFinishServiceModalProps {}

export function ConfirmFinishServiceModal({}: iConfirmFinishServiceModalProps) {
  const { restaurant, orders_tables, orders_products, table_paymants_values } =
    useContext(TableContext);

  const totalSpent = orders_products.reduce((acc, item) => {
    return (acc = acc + item.total_price * item.quantity);
  }, 0);

  const isUnableToFinishService = table_paymants_values >= totalSpent;

  const handleFinishService = async () => {
    const { data: orderData } = await supabase
      .from('orders')
      .update({
        order_status_id: 1,
      })
      .eq('id', orders_tables.orders.id);
    const { data: orderTableData } = await supabase
      .from('orders_tables')
      .update({
        has_been_paid: true,
      })
      .eq('id', orders_tables.id);
    window.location.reload();
  };

  console.log(isUnableToFinishService);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <span>Finalizar atendimento</span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[34%] left-[50%] z-40 h-auto w-[350px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
              Finalizar atendimento
            </Dialog.Title>

            <div className="h-32 flex flex-col justify-between pt-4">
              {isUnableToFinishService ? (
                <p>Deseja finalizar o tentendimento?</p>
              ) : (
                <p>
                  O atendimento só poderá ser concluído após o pagamento do
                  valor total.
                </p>
              )}

              <div className="flex items-center gap-2">
                <Dialog.Close asChild>
                  <button
                    className="flex items-center justify-center rounded text-white text-base cursor-pointer w-[49%] h-9 bg-white-blue"
                    aria-label="Close"
                  >
                    Cancelar
                  </button>
                </Dialog.Close>
                <Dialog.Close asChild disabled={!isUnableToFinishService}>
                  <button
                    type="button"
                    disabled={!isUnableToFinishService}
                    onClick={() =>
                      isUnableToFinishService ? handleFinishService() : null
                    }
                    className={`flex flex-1 items-center justify-center rounded text-white text-base cursor-pointer w-[49%] h-9
                      transition ${
                        isUnableToFinishService
                          ? ' bg-orange-500 hover:bg-red-orange'
                          : ' bg-gray-400'
                      }`}
                  >
                    Finalizar
                  </button>
                </Dialog.Close>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
