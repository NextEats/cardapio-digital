import { TableControlContext } from '@/src/contexts/TableControlContext';
import { api } from '@/src/server/api';
import { iTables } from '@/src/types/types';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from 'react';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import InputWithLabel from '../../InputWithLabel';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
interface iCreateTableModalProps {}

export default function CreateTableModal({}: iCreateTableModalProps) {
  const { restaurant, tables } = useContext(TableControlContext);
  const [tableName, setTableName] = useState('');
  const [cheirAmount, setCheirAmount] = useState('4');

  async function createNewtable(cheirAmount: string, tableName: string) {
    if (tableName === '') {
      toast.error('O nome da mesa é obrigatório.', {
        theme: 'light',
      });
      return;
    }

    const tableAlreadyExists = tables.find(
      table =>
        table.name!.toLowerCase().replace(/\s/g, '') ===
        tableName.toLowerCase().replace(/\s/g, '')
    );

    if (tableAlreadyExists) {
      toast.error('Essa mesa já existe. Por favor escolha outro nome.', {
        theme: 'light',
      });
      return;
    }

    const novaMesa: iTables['data'] = await api.post(
      'api/table_control/' + restaurant.id,
      {
        chair_ammount: cheirAmount,
        name: tableName,
      }
    );

    window.location.reload();
  }

  async function handleCreateTable() {
    await createNewtable(cheirAmount, tableName);
  }

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className="flex items-center gap-1 justify-center text-white leading-5 font-semibold rounded disabled:bg-gray-600 transition-all ease-in-out w-36 h-9 bg-green-500">
          {/* <button> */}
          Nova Mesa
          {/* </button> */}
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
          <Dialog.Content className="fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6">
            <Dialog.Title className="text-base w-full text-center font-semibold mb-6">
              Criar nova mesa
            </Dialog.Title>

            <form
              className="w-full flex flex-col gap-6"
              onSubmit={e => {
                e.preventDefault();
                handleCreateTable();
              }}
            >
              <InputWithLabel
                label="Nome da mesa"
                type="text"
                placeholder="Ex.: Mesa 12"
                setState={setTableName}
              />
              <InputWithLabel
                defaultValue={4}
                label="Quantidade de lugares"
                type="number"
                placeholder="ex.: 4"
                setState={setCheirAmount}
              />
              <div className="flex flex-1 items-center justify-end">
                <CardapioDigitalButton h="h-9" w="w-32" />
              </div>
            </form>

            <Dialog.Close className="fixed top-3 right-3 text-gray-600">
              <FiX size={22} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
