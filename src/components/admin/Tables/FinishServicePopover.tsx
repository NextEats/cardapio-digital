import { TableContext } from '@/src/contexts/TableControlContext';
import { api, supabase } from '@/src/server/api';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useContext } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from 'react-icons/fi';
import * as zod from "zod"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const finishServiceValidationSchema = zod.object({
    payment_method: zod.number(),
})

type finishServiceData = zod.infer<typeof finishServiceValidationSchema>

export default function FinishServicePopover() {

    const { register, watch, formState: { errors }, handleSubmit } = useForm<finishServiceData>({
        resolver: zodResolver(finishServiceValidationSchema)
    })

    const {
        openedTableModal,
        updateTable,
        ordersTables,
        paymentMethod,
    } = useContext(TableContext);

    function filterOrdersTablesDelivered() {
        const ordersDelievered = ordersTables.filter(
            (ot) => ot.has_been_paid === false && ot.tables.id === openedTableModal?.id
        );

        let ordersId: number[] = []
        ordersDelievered.forEach((ot) => {
            if (ordersId.some(otId => otId === ot.orders.id)) return
            ordersId = [...ordersId, ot.orders.id]
        });

        return { ordersDelievered, ordersId }
    }

    async function handleFinishService(data: finishServiceData) {
        const { ordersDelievered, ordersId } = filterOrdersTablesDelivered()
        ordersDelievered.forEach(async (o) => {
            const ordersTableData = await api.put(`api/orders_tables/`, {
                order_table_id: o.id,
                has_been_paid: true,
            });
        });
        ordersId.forEach(async oId => {
            const ordersData = await supabase.from("orders").update({
                payment_method_id: data.payment_method,
            }).eq("id", oId);
        })
        await updateTable(false, false, openedTableModal?.id!);
        window.location.reload();
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger asChild>
                <button
                    className={`bg-white shadow-md h-8 w-full rounded-sm font-medium text-base`} >
                    Finalizar atendimento
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow z-30 fixed top-[29vh] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <Dialog.Title className="text-mauve12 mb-4   text-[17px] font-medium">
                        Finalize o atendimento
                    </Dialog.Title>
                    <form onSubmit={handleSubmit(handleFinishService)}>
                        <label
                            className="block text-gray-700 font-bold mb-2"
                            htmlFor="number"
                        >
                            Método de Pagamento
                        </label>
                        <select
                            {...register('payment_method', { required: true, valueAsNumber: true })}
                            defaultValue={undefined}
                            id="payment_method"
                            className={`appearance-none border rounded w-full py-2 mb-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.payment_method && 'border-red-500 mb-0'
                                }`}
                        >
                            <option
                                disabled={true}
                                value={undefined}
                                selected={true}
                            >
                                Selecione um método de pagamento
                            </option>
                            {paymentMethod &&
                                paymentMethod.map(
                                    (elem, index) => {
                                        return (
                                            <option key={index} value={elem.payment_methods.id}>
                                                {elem.payment_methods.name}
                                            </option>
                                        );
                                    }
                                )}
                        </select>
                        {errors.payment_method && (
                            <p className="text-red-500 text-xs italic mb-3">
                                Escolha um método de pagamento
                            </p>
                        )}
                        <CardapioDigitalButton name='Finalizar atendimento' h='h-8' w='w-full' />
                    </form>
                    <Dialog.Close asChild>
                        <button
                            className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
                            aria-label="Close"
                        >
                            <FiX size={22} />
                        </button>
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}
