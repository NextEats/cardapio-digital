import { ProductContext } from '@/src/contexts/ProductContext';
import { getAscendingCategoriesOrderSequence } from '@/src/helpers/getAscendingCategoriesOrderSequence';
import { supabase } from '@/src/server/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusLg } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import * as zod from 'zod';
interface iCreateCategoryProps {
  categoryType: 'product_category' | 'additional_category';
}

const newCategoryValidationSchema = zod.object({
  name: zod.string().min(1, { message: 'O nome da categoria é obrigatório.' }),
  order: zod
    .number()
    .min(1, { message: 'Escolha uma ordem para a categoria.' }),
});

type newCategory = zod.infer<typeof newCategoryValidationSchema>;
const newCategoryDefaultValue: newCategory = {
  name: '',
  order: 0,
};

export function CreateCategory({ categoryType }: iCreateCategoryProps) {
  const { restaurant, categories } = useContext(ProductContext);

  const {
    register,
    getValues,
    watch,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<newCategory>({
    resolver: zodResolver(newCategoryValidationSchema),
    defaultValues: newCategoryDefaultValue,
  });

  const newOrder = watch('order');

  const handleCreateCategory = async () => {
    const name = getValues('name');
    const order = getValues('order');
    if (categoryType === 'product_category') {
      await supabase.from('product_categories').insert({
        name,
        category_order: order!,
        restaurant_id: restaurant.id,
      });
    }
    if (categoryType === 'additional_category') {
      await supabase.from('additional_categories').insert({
        name,
        category_order: order,
        restaurant_id: restaurant.id,
      });
    }

    location.reload();
  };

  let sequence = getAscendingCategoriesOrderSequence(categories);

  useMemo(() => {
    const numbersOfCategoryOrder = categories
      .map(category => category.category_order)
      .sort();
    if (numbersOfCategoryOrder.some(order => order === newOrder)) {
      setError('order', {
        message: 'Essa order já está ocupada, escolha uma ordem disponivel.',
      });
    }
  }, [newOrder, setError, categories]);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-6 py-2 rounded-full bg-blue-400 ">
          <BsPlusLg size={16} className="text-white" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content
          className="data-[state=open]:animate-contentShow fixed top-0 right-0 3xs:top-[40%] 3xs:left-[50%] h-screen 3xs:h-[500px] w-screen 3xs:w-[500px]
                    2md:w-[900px] 3xs:translate-x-[-50%] 3xs:translate-y-[-50%] 3xs:rounded-[6px] bg-white p-[25px]
                    shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        >
          <form onSubmit={handleSubmit(handleCreateCategory)}>
            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium">
              Criar categoria
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
                {' '}
                Nome{' '}
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
              {sequence.map(sequence => {
                const busyoOrder = categories.some(
                  c => c.category_order === sequence
                );
                return (
                  <button
                    key={sequence}
                    disabled={busyoOrder}
                    type="button"
                    onClick={() => setValue('order', sequence)}
                    className={`text-base font-semibold text-white w-6 h-6 rounded
                                    ${
                                      busyoOrder
                                        ? 'bg-gray-300'
                                        : sequence === newOrder
                                        ? 'bg-yellow-400'
                                        : 'bg-blue-400'
                                    }
                                    `}
                  >
                    {sequence}
                  </button>
                );
              })}
            </div>
          </form>

          <Dialog.Close
            asChild
            className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7  inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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
