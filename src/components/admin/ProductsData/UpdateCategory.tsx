import { ProductContext } from '@/src/contexts/ProductContext';
import { getAscendingCategoriesOrderSequence } from '@/src/helpers/getAscendingCategoriesOrderSequence';
import { supabase } from '@/src/server/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import * as zod from 'zod';
interface iUpdateCategoryProps {
  categoryType: 'product_category' | 'additional_category';
}

const updateCategoryValidationSchema = zod.object({
  name: zod.string().min(1, { message: 'O nome da categoria é obrigatório.' }),
  order: zod
    .number()
    .min(1, { message: 'Escolha uma ordem para a categoria.' }),
});

type updateCategory = zod.infer<typeof updateCategoryValidationSchema>;
const updateCategoryDefaultValue: updateCategory = {
  name: '',
  order: 0,
};

export function UpdateCategory({ categoryType }: iUpdateCategoryProps) {
  const { updateCategoryState, setUpdateCategoryState, categories } =
    useContext(ProductContext);

  const {
    register,
    getValues,
    watch,
    setError,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<updateCategory>({
    resolver: zodResolver(updateCategoryValidationSchema),
    defaultValues: updateCategoryDefaultValue,
  });
  const newOrder = watch('order');

  useEffect(() => {
    setValue('name', updateCategoryState?.name!);
    setValue('order', updateCategoryState?.category_order!);
  }, [updateCategoryState, setValue]);

  const handleUpdateCategory = async () => {
    const name = getValues('name');
    const order = getValues('order');
    if (categoryType === 'additional_category') {
      const category = await supabase
        .from('product_categories')
        .update({
          name,
          category_order: order,
        })
        .eq('id', updateCategoryState?.id)
        .select('*');
    }
    if (categoryType === 'additional_category') {
      const category = await supabase
        .from('additional_categories')
        .update({
          name,
          category_order: order,
        })
        .eq('id', updateCategoryState?.id)
        .select('*');
    }
    reset();
  };

  let sequence = getAscendingCategoriesOrderSequence(categories);

  useMemo(() => {
    const numbersOfCategoryOrder = categories
      .map(category => category.category_order)
      .sort();
    if (
      numbersOfCategoryOrder.some(order => order === newOrder) &&
      newOrder !== updateCategoryState?.category_order
    ) {
      setError('order', {
        message: 'Essa order já está ocupada, escolha uma ordem disponivel.',
      });
    }
  }, [newOrder, setError, categories, updateCategoryState?.category_order]);

  return (
    <Dialog.Root open={updateCategoryState !== null}>
      <Dialog.Trigger />
      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => {
            setUpdateCategoryState(null);
            reset();
          }}
          className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0"
        />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed top-0 right-0 3xs:top-[40%] 3xs:left-[50%] h-screen 3xs:h-[500px] w-screen 3xs:w-[500px]
                    2md:w-[900px] 3xs:translate-x-[-50%] 3xs:translate-y-[-50%] 3xs:rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <form onSubmit={handleSubmit(handleUpdateCategory)}>
            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
              Editar categoria
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-1 rounded-full text-white bg-blue-400 disabled:bg-gray-400 "
              >
                Salvar
              </button>
            </Dialog.Title>

            <div className="flex flex-col flex-1 ">
              <label htmlFor="" className="text-base font-medium">
                Nome
              </label>
              <input
                className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-1"
                type="text"
                {...register('name')}
              />
              {errors.name ? (
                <p className={`text-red-500 text-sm font-light mb-2`}>
                  {errors.name.message}
                </p>
              ) : null}
              <label htmlFor="" className="text-base font-medium">
                {' '}
                Ordem{' '}
              </label>
              <input
                className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-1"
                type="number"
                {...register('order', { valueAsNumber: true })}
                // onChange={() => this}
              />
              {errors.order ? (
                <p className={`text-red-500 text-sm font-light mb-2`}>
                  {errors.order.message}
                </p>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-4 mt-6">
              {sequence.map(seq => {
                const busyoOrder = categories.some(
                  c => c.category_order === seq
                );
                return (
                  <button
                    key={seq}
                    disabled={
                      busyoOrder && updateCategoryState?.category_order !== seq
                    }
                    type="button"
                    onClick={() => setValue('order', seq)}
                    className={`text-base font-semibold text-white w-6 h-6 rounded
                                    ${
                                      updateCategoryState?.category_order ===
                                      seq
                                        ? 'bg-green-500'
                                        : busyoOrder
                                        ? 'bg-gray-300'
                                        : seq === newOrder
                                        ? 'bg-yellow-400'
                                        : 'bg-blue-400'
                                    }
                                    `}
                  >
                    {seq}
                  </button>
                );
              })}
            </div>
          </form>

          <Dialog.Close
            onClick={() => {
              setUpdateCategoryState(null);
              reset();
            }}
            asChild
            className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
  );
}
