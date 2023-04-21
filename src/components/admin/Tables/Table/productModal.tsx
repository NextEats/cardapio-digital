import useProductSelectsWithOptions from '@/src/hooks/useProductSelectsWithOptions';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import * as zod from 'zod';
import { QuantitySelector } from '../../../QuantitySelector';
import SelectComponent from '../../../home/ProductModal/components/SelectComponent';
import { CardapioDigitalButton } from '../../cardapio-digital/CardapioDigitalButton';
// import TableAdditionals from './TableAdditionals';
import { TableContext } from '@/src/contexts/TableContext';
import { addProductAction } from '@/src/reducers/tableReducer/action';
import TableAdditionals from './TableAdditionals';

const productInformationValidationSchema = zod.object({
  observation: zod.string(),
});

type NewProductInformationFormData = zod.infer<
  typeof productInformationValidationSchema
>;

export default function ProductModal() {
  const { register, reset, getValues } = useForm<NewProductInformationFormData>(
    {
      resolver: zodResolver(productInformationValidationSchema),
      defaultValues: {
        observation: '',
      },
    }
  );

  const {
    table,
    tableState,
    additionalByProductId,
    viewProductState,
    tableDispatch,
  } = useContext(TableContext);

  const [viewProduct, setViewProduct] = viewProductState;

  const { productSelects, selectOption } = useProductSelectsWithOptions(
    viewProduct ? viewProduct?.id!.toString() : ''
  );
  const [quantity, setQuantity] = useState(1);

  function handleConfirmProduct() {
    const observation = getValues('observation');

    tableDispatch(
      addProductAction({
        product: viewProduct!,
        productSelects,
        table_id: table.id,
        quantity,
        observation,
      })
    );
    setViewProduct(null);
    reset();
  }

  return (
    <div>
      <Dialog.Root open={viewProduct !== null}>
        <Dialog.Trigger></Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={() => setViewProduct(null)}
            className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out"
          />
          <Dialog.Content className="fixed top-[7vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[435px] sm:w-[600px] lg:w-[900px] h-[566px] bg-white shadow-md p-6 pt-10">
            <div className=" max-h-[452px] xs:max-h-[452px] overflow-auto mb-3 scrollbar-custom pr-2 py-2">
              <div className="flex flex-col sm:grid sm:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <Image
                    className="rounded-md w-full"
                    alt=""
                    width={200}
                    height={200}
                    src={viewProduct?.picture_url!}
                  />
                  <div className="">
                    <h2 className="flex items-center justify-between text-lg font-bold">
                      <span>{viewProduct?.name}</span>
                      <span className="text-green-500">
                        R$ {viewProduct?.price}{' '}
                      </span>
                    </h2>
                    <p className="mb-2"> {viewProduct?.description} </p>

                    <form className="w-full mt-12 h-24 mb-8 relative">
                      <textarea
                        {...register('observation')}
                        className=" scrollbar-custom w-full h-full resize-none rounded-sm bg-[#f6f6f6] shadow-sm text-base outline-none p-4"
                        placeholder="Observações"
                      ></textarea>
                    </form>
                  </div>
                </div>

                <div className="flex flex-col gap-3 ">
                  <div>
                    {productSelects.map((select, selectIndex) => (
                      <SelectComponent
                        select={select}
                        key={selectIndex}
                        index={selectIndex}
                        handleOptionClick={(optionIndex: number) => {
                          selectOption(selectIndex, optionIndex);
                        }}
                      />
                    ))}
                  </div>

                  {additionalByProductId.length !== 0 ? (
                    <h2> Adicionais </h2>
                  ) : null}

                  <TableAdditionals />
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-end gap-3">
              <span className="text-lg font-semibold text-green-500">
                R$
                {(tableState.totalPrice * quantity).toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <CardapioDigitalButton
                name="Confirmar"
                h="h-9"
                w="w-44"
                onClick={() => {
                  handleConfirmProduct();
                }}
              />
              <QuantitySelector
                value={quantity}
                addValue={() => setQuantity(quantity + 1)}
                subtractValue={() => setQuantity(quantity - 1)}
              />
            </div>
            <Dialog.Close
              className="fixed top-3 right-3 text-gray-600"
              onClick={() => setViewProduct(null)}
            >
              <FiX size={22} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
