import { TableContext } from '@/src/contexts/TableContext';
import { filterOptionsSelected } from '@/src/helpers/filterOptionsSelected';
import { removeProductAction } from '@/src/reducers/tableReducer/action';
import { api } from '@/src/server/api';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useContext } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';

export function TableProductListFormModal() {
  const { tableDispatch, tableState, table, order } = useContext(TableContext);

  async function handleFinishOrder() {
    if (table.is_occupied === false || order === null) {
      toast.error(
        'O pedido só pode ser realizado após o início do atendimento.',
        { theme: 'light' }
      );
      return;
    }

    const productsOfTheTable = tableState.productsSelected.filter(
      p => p.table_id === table.id
    );

    productsOfTheTable.forEach(async ps => {
      const additionals_data = ps.quantityAdditionals.reduce(
        (acc: { quantity: number; additional_id: number }[], item) => {
          return (acc = [
            ...acc,
            {
              quantity: item.quantity,
              additional_id: item.additionalId,
            },
          ]);
        },
        []
      );
      const selects_data = filterOptionsSelected({
        productsOptionsSelected: ps.productSelects ? ps.productSelects : [],
      });

      const ordersProductsData = await api.post(`api/orders_products/`, {
        order_id: order!.id,
        table_id: table.id,
        product_id: ps.product?.id,
        selects_data,
        additionals_data,
        observation: ps.observation,
        total_price: ps.totalPrice / ps.quantity,
        quantity: ps.quantity,
      });
    });

    window.location.reload();
  }

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger className="flex items-center gap-2">
          <span className="">
            {tableState.productsSelected.length} Produtos
          </span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out" />
          <Dialog.Content className="fixed top-[7vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[435px] sm:w-[600px] lg:w-[900px] h-[550px] bg-white shadow-md p-6">
            <Dialog.Title className="text-base w-full flex items-center text-center font-semibold mb-3">
              Produtos selecionados
            </Dialog.Title>
            <div className=" flex flex-col ">
              <div className="flex flex-col lg:grid lg:grid-cols-2 gap-2 max-h-[305px] overflow-auto scrollbar-custom p-1 mb-3">
                {tableState.productsSelected.map(ps => {
                  if (!ps.product) return null;
                  return (
                    <div
                      key={ps.product.id}
                      className="bg-white shadow-sm max-h-24 sm:h-24 flex flex-1 items-center rounded-md p-2 hover:shadow-md hover:transition-all ease-in-out cursor-pointer relative"
                    >
                      <Image
                        className="rounded-md h-full"
                        src={ps.product.picture_url}
                        alt=""
                        width={85}
                        height={40}
                      />
                      <div className="flex flex-col h-full items-start justify-start gap-1 overflow-hidden px-3 pt-4">
                        <span className="text-base font-bold text-gray-600 ">
                          {' '}
                          {ps.product.name}{' '}
                        </span>
                        <p className="text-sm font-medium truncate w-full text-gray-500 leading-3 ">
                          {' '}
                          {ps.product.description}{' '}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-green-500 absolute top-2 right-3">
                        {' '}
                        R$ {ps.product.price}{' '}
                      </span>
                      <FaRegTrashAlt
                        onClick={() =>
                          tableDispatch(removeProductAction(ps.product!.id))
                        }
                        className="absolute bottom-2 right-2 text-red-orange hover:scale-110 "
                      />
                    </div>
                  );
                })}
              </div>
              <div className="w-[calc(100%-48px)] flex items-center justify-between gap-3 absolute bottom-6">
                <span>{tableState.productsSelected.length} Produtos</span>
                <div>
                  {tableState.productsSelected.length > 0 ? (
                    <CardapioDigitalButton
                      onClick={() => handleFinishOrder()}
                      name="Confirmar"
                      h="h-9"
                      w="w-44"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <Dialog.Close className="fixed top-3 right-3 text-gray-600">
              <FiX size={22} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
