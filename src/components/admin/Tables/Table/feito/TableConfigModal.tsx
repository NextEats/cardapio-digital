import { TableContext } from '@/src/contexts/TableContext';
import { api } from '@/src/server/api';
import * as Dialog from '@radix-ui/react-dialog';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { useContext, useState } from 'react';
import { BsGear } from 'react-icons/bs';
import { FaHome } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { CardapioDigitalButton } from '../../../cardapio-digital/CardapioDigitalButton';
import RadioGroupItem from './RadioGroupItem';

interface iTableConfigModalProps {}

export default function TableConfigModal({}: iTableConfigModalProps) {
  const {
    table,
    orders_tables,
    orders_products,
    restaurant,
    table_paymants_values,
  } = useContext(TableContext);
  const [tableStatus, setTableStatus] = useState('');
  const statusDefaultValue = table.is_active
    ? 'is_active'
    : table.is_occupied
    ? 'is_occupied'
    : 'free';

  async function updateTable({
    is_active,
    is_occupied,
  }: {
    is_active: boolean;
    is_occupied: boolean;
  }) {
    const tableUpdated = await api.put(`api/table_control/${restaurant.id!}`, {
      chair_ammount: table.chair_ammount,
      is_active,
      is_occupied,
      table_id: table.id!,
    });
  }

  const totalSpent = orders_products.reduce((acc, item) => {
    return (acc = acc + item.total_price * item.quantity);
  }, 0);
  async function handleUpdateTable() {
    if (table_paymants_values < totalSpent) {
      toast.error(
        'A mesa só pode ser fechada ou inativada quando o atendimento for finalizado.',
        {
          theme: 'light',
        }
      );
      return;
    }

    if ('is_active')
      await updateTable({ is_active: !table.is_active, is_occupied: false });
    else if ('is_occupied')
      await updateTable({ is_active: true, is_occupied: true });
    else if ('free') await updateTable({ is_active: true, is_occupied: false });

    window.location.reload();
  }

  async function deleteTable() {
    await api.delete(`api/table_control/${restaurant.id!}`, {
      data: { table_id: table.id },
    });
  }

  async function handleDeleteTable() {
    if (!orders_tables.has_been_paid) {
      toast.error(
        'A exclusão da mesa só é possível ao finalizar o atendimento.',
        { theme: 'light' }
      );
      return;
    }
    await deleteTable();
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="flex items-center gap-2">
          <BsGear size={24} />
          <div className="hidden lg:flex">Configurações</div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-20 opacity-40 transition-all duration-300 ease-in-out" />
          <Dialog.Content
            className={
              'fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[600px] h-[] bg-white shadow-md p-6'
            }
          >
            <Dialog.Title className="flex items-center justify-between text-base w-full text-center font-semibold mb-5 mt-4">
              <div className="flex items-center justify-start gap-3">
                <FaHome className="text-gray-350" size={32} />{' '}
                <span className="text-lg font-bold "> {table.name} </span>
              </div>
              <CardapioDigitalButton
                name="Excluir"
                h="h-9"
                w="w-28"
                onClick={() => handleDeleteTable()}
              />
            </Dialog.Title>

            <div className=" flex flex-col pl-10 gap-4 ">
              <h2 className="text-lg font-semibold"> Status da Mesa </h2>
              <RadioGroup.Root
                className="flex flex-col sm:flex-row gap-3 sm:gap-10 "
                defaultValue={statusDefaultValue}
                aria-label="View density"
                onValueChange={value => setTableStatus(value)}
              >
                <RadioGroupItem
                  value="free"
                  id="free"
                  label="Livre"
                  lableClassName="text-gray-400"
                />
                <RadioGroupItem
                  value="is_occupied"
                  id="is_occupied"
                  label="Ocupada"
                  lableClassName="text-blue-500"
                />
                <RadioGroupItem
                  value="is_active"
                  id="is_active"
                  label="Inativa"
                />
              </RadioGroup.Root>
            </div>

            <div className="flex items-center justify-end mt-6">
              <CardapioDigitalButton
                name="Confirmar"
                h="h-9"
                w="w-44"
                onClick={() => handleUpdateTable()}
              />
            </div>

            <Dialog.Close className="fixed top-3 right-3 text-gray-600">
              <FiX size={22} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
