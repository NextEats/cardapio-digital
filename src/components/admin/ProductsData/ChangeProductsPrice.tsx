import { ProductContext } from '@/src/contexts/ProductContext';
import { updateProductPriceByChangeType } from '@/src/helpers/ChangeProductPrice';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { Dispatch, SetStateAction, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import * as zod from 'zod';

interface iChangeProductsPriceProps {
  isChangingProductPrice: boolean;
  setIsChangingProductPrice: Dispatch<SetStateAction<boolean>>;
}

const newChangeProductsPriceValidationSchema = zod.object({
  changeType: zod.union([
    zod.literal('increaseByAmount'),
    zod.literal('reduceByAmount'),
    zod.literal('setANewPrice'),
    zod.literal('increaseByPercentage'),
    zod.literal('reduceByPercentage'),
    zod.literal(''),
  ]),
  changeAmount: zod.number(),
});

type newChangeProductPrice = zod.infer<
  typeof newChangeProductsPriceValidationSchema
>;
const defaultNewChangeProductPrice: newChangeProductPrice = {
  changeType: '',
  changeAmount: 0,
};

export function ChangeProductsPrice({
  isChangingProductPrice,
  setIsChangingProductPrice,
}: iChangeProductsPriceProps) {
  const { products, productSelected } = useContext(ProductContext);

  const { register, handleSubmit, watch, getValues } =
    useForm<newChangeProductPrice>({
      resolver: zodResolver(newChangeProductsPriceValidationSchema),
      defaultValues: defaultNewChangeProductPrice,
    });

  const changeType = watch('changeType');

  const moneySymbol =
    changeType === 'increaseByAmount' ||
    changeType === 'reduceByAmount' ||
    changeType === 'setANewPrice';
  const percentageSymbol =
    changeType === 'increaseByPercentage' ||
    changeType === 'reduceByPercentage';

  const handleChangeProductPrice = () => {
    updateProductPriceByChangeType({
      changeAmount: getValues('changeAmount'),
      changeType: getValues('changeType'),
      products: productSelected,
    });
  };

  return (
    <form className="">
      <Dialog.Root open={isChangingProductPrice}>
        <Dialog.Trigger />
        <Dialog.Portal>
          <Dialog.Overlay
            onClick={() => setIsChangingProductPrice(false)}
            className="bg-black data-[state=open]:animate-overlayShow z-10 fixed inset-0"
          />
          <Dialog.Content className="data-[state=open]:animate-contentShow z-20 bg-white fixed top-[40%] left-[50%] w-[90vw] max-w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
            <Dialog.Title className="text-mauve12 text-[17px] mb-[20px] font-medium">
              Alterar o preço de {productSelected.length} produto(s)
            </Dialog.Title>
            {/* <form > */}
            <div className="flex item-center gap-2">
              <div className="mb-[15px] w-[200px] flex items-center gap-5">
                <select
                  id=""
                  {...register('changeType')}
                  // {...register("changeType")},
                  className="inline-flex h-[40px] w-full flex-1 items-center justify-center rounded px-[10px] text-[15px] leading-none outline-none max-w-[200px] border-solid border-2"
                >
                  {/* className="h-8 px-4 border border-blue-400 rounded-full"> */}
                  <option
                    value=""
                    className="cursor-pointer w-[200px] text-gray-400"
                  >
                    Selecione
                  </option>
                  <option value="increaseByAmount" className="cursor-pointer">
                    Aumento por valor
                  </option>
                  <option value="reduceByAmount" className="cursor-pointer">
                    Reduzir por valor
                  </option>
                  <option value="setANewPrice" className="cursor-pointer">
                    Definir preço
                  </option>
                  <option
                    value="increaseByPercentage"
                    className="cursor-pointer"
                  >
                    Aumentar por percentual
                  </option>
                  <option value="reduceByPercentage" className="cursor-pointer">
                    Reduzir por percentual
                  </option>
                </select>
              </div>
              <div className="mb-[15px] flex items-center border-2">
                <span
                  className={`border-r-2 inline-flex h-[35px] w-[40px] items-center justify-center rounded-[4px] px-[6px] ${
                    !moneySymbol && 'hidden'
                  }`}
                >
                  R$
                </span>

                <input
                  type="number"
                  {...register('changeAmount')}
                  className=" h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none outline-none max-w-[100px]"
                />

                <span
                  className={`border-l-2 inline-flex h-[35px] w-[40px] items-center justify-center rounded-[4px] px-[6px] ${
                    !percentageSymbol && 'hidden'
                  }`}
                >
                  %
                </span>
              </div>
            </div>

            <div className="flex justify-end">
              <Dialog.Close asChild>
                <button
                  type="submit"
                  onClick={() => handleChangeProductPrice()}
                  className="text-white bg-blue-400 focus:shadow-green inline-flex h-[35px] max-w-[100px] w-full items-center justify-center rounded-[8px] px-[15px] font-medium focus:outline-none "
                >
                  Alterar
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close
              onClick={() => setIsChangingProductPrice(false)}
              asChild
              className="text-violet11 cursor-pointer hover:bg-violet4  inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
            >
              <button
                className={`absolute top-[8px] right-[8px]`}
                aria-label="Close"
              >
                <FiX className="w-6 h-6" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </form>
  );
}
