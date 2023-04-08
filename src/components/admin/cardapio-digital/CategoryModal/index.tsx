import { supabase } from '@/src/server/api';
import {
  iInsertProductCategory,
  iProductCategories,
  iProducts,
  iRestaurantWithFKData,
} from '@/src/types/types';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Dispatch, FormEvent, SetStateAction, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as zod from 'zod';

const newCategoryFormValidationSchema = zod.object({
  productCategory: zod.string(),
  categoryOrder: zod.number(),
});

type NewCategoryFormData = zod.infer<typeof newCategoryFormValidationSchema>;

interface iCategoryModalProps {
  productCategories: iProductCategories['data'];
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
  editCategory: {
    isEditing: boolean;
    categoryData: iInsertProductCategory['data'];
  };
  setEditCategory: Dispatch<
    SetStateAction<{
      isEditing: boolean;
      categoryData: iInsertProductCategory['data'];
    }>
  >;
  products: iProducts['data'];
  viewCategory: {
    isViewing: boolean;
    categoryId: number;
    categoryName: string;
  };
  setViewCategory: Dispatch<
    SetStateAction<{
      isViewing: boolean;
      categoryId: number;
      categoryName: string;
    }>
  >;
  restaurant: iRestaurantWithFKData;
}

export function CategoryModal({
  modalIsOpen,
  productCategories,
  setModalIsOpen,
  editCategory,
  setEditCategory,
  products,
  viewCategory,
  setViewCategory,
  restaurant,
}: iCategoryModalProps) {
  const { register, reset, getValues, setValue, watch } =
    useForm<NewCategoryFormData>({
      resolver: zodResolver(newCategoryFormValidationSchema),
      defaultValues: {
        productCategory: '',
        categoryOrder: 0,
      },
    });
  const categoryOrdervalue = watch('categoryOrder');

  async function handleNewCategory() {
    const productCategory = getValues('productCategory');
    if (!productCategory) {
      // alert('O nome da categoria não pode ser vazio.');
      toast.error('O nome da categoria não pode ser vazio.', {
        theme: 'light',
      });
      return;
    }
    if (categoryOrdervalue <= 0) {
      // alert(
      //     'Insira somente valores acima de 0 para a ordem da categoria.'
      // );
      toast.error(
        'Insira somente valores acima de 0 para a ordem da categoria.',
        {
          theme: 'light',
        }
      );
      return;
    }
    if (productCategories.some(c => c.category_order === categoryOrdervalue)) {
      // alert(
      //     'Já existe uma categoria nessa posição, por favor escolha outro número.'
      // );
      toast.error(
        'Já existe uma categoria nessa posição, por favor escolha outro número.',
        {
          theme: 'light',
        }
      );
      return;
    }
    await supabase.from('product_categories').insert({
      name: productCategory,
      category_order: categoryOrdervalue,
      restaurant_id: restaurant.id,
    });
    reset();
    setModalIsOpen(false);
    window.location.reload();
  }

  async function updateCategory() {
    const productCategory = getValues('productCategory');
    if (!productCategory) {
      // alert('O nome da categoria não pode ser vazio.');
      toast.error('O nome da categoria não pode ser vazio.', {
        theme: 'light',
      });
      return;
    }
    if (categoryOrdervalue <= 0) {
      // alert(
      //     'Insira somente valores acima de 0 para a ordem da categoria.'
      // );
      toast.error(
        'Insira somente valores acima de 0 para a ordem da categoria.',
        {
          theme: 'light',
        }
      );
      return;
    }
    if (productCategories.some(c => c.category_order === categoryOrdervalue)) {
      toast.error(
        'Já existe uma categoria nessa posição, por favor escolha outro número.',
        {
          theme: 'light',
        }
      );
      return;
    }
    await supabase
      .from('product_categories')
      .update({
        name: productCategory,
        category_order: categoryOrdervalue,
        restaurant_id: restaurant.id,
      })
      .eq('id', editCategory.categoryData.id);
    reset();
    setModalIsOpen(false);
    setEditCategory({
      isEditing: false,
      categoryData: { category_order: 0, name: '', restaurant_id: 0 },
    });
    window.location.reload();
  }

  function cancel(e: FormEvent) {
    e.preventDefault();
    reset();
    setModalIsOpen(false);
    setEditCategory({
      isEditing: false,
      categoryData: { category_order: 0, name: '', restaurant_id: 0 },
    });
  }

  useEffect(() => {
    if (editCategory.isEditing)
      setValue('productCategory', editCategory.categoryData.name);
    setValue('categoryOrder', editCategory.categoryData.category_order);
  }, [editCategory.isEditing, setValue, editCategory.categoryData]);

  const numbersOfCategoryOrder = productCategories
    .map(category => category.category_order)
    .sort((a, b) => {
      if (a > b) return 1;
      if (a < b) return -1;
      return 0;
    });

  const ascendingSequence = useMemo(() => {
    const maximo = numbersOfCategoryOrder[productCategories.length - 1] + 3;
    const sequencia = [];
    for (let i = 1; i <= maximo; i++) {
      sequencia.push(i);
    }
    return sequencia;
  }, [productCategories, numbersOfCategoryOrder]);

  return (
    <>
      {!viewCategory.isViewing ? (
        <>
          <div
            className={`w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10
                    ${
                      modalIsOpen || editCategory.isEditing
                        ? 'opacity-40 transition-all duration-300 ease-in-out'
                        : ' opacity-0 pointer-events-none duration-[0s]'
                    }
                    `}
          ></div>
          <div
            className={`fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6
                    ${
                      modalIsOpen || editCategory.isEditing
                        ? 'opacity-100 transition-all duration-300 ease-in-out'
                        : ' opacity-0 pointer-events-none duration-[0s]'
                    }
                    `}
          >
            <form className="w-full">
              <h2 className="text-base w-full text-center font-semibold mb-6">
                Nova categoria
              </h2>

              <input
                type="text"
                {...register('productCategory')}
                placeholder="Dê um nome para a categoria"
                className="w-full h-9 rounded text-base font-medium text-gray-600 placeholder:text-gray-400 outline-none border border-gray-400 px-2 mb-4 "
              />
              <input
                type="number"
                {...register('categoryOrder', {
                  valueAsNumber: true,
                })}
                placeholder="Ordem da categoria Ex.: 2"
                className="w-full h-9 rounded text-base font-medium text-gray-600 placeholder:text-gray-400 outline-none border border-gray-400 px-2 "
              />
              {productCategories.some(
                c => c.category_order === categoryOrdervalue
              ) &&
              editCategory.categoryData.category_order !==
                categoryOrdervalue ? (
                <span className="text-red-500 text-sm font-normal leading-1">
                  Já existe uma categoria nessa posição, por favor escolha outro
                  número.
                </span>
              ) : null}

              <div className="flex flex-wrap items-center gap-3 mb-4 mt-6">
                {ascendingSequence.map(sequence => {
                  if (
                    productCategories.some(pc => pc.category_order === sequence)
                  ) {
                    return (
                      <button
                        key={sequence}
                        className={`text-base font-semibold text-gray-700 w-6 h-6 rounded cursor-not-allowed  ${
                          editCategory.categoryData.category_order === sequence
                            ? 'bg-green-400'
                            : 'bg-gray-400'
                        }`}
                      >
                        {' '}
                        {sequence}
                      </button>
                    );
                  }
                  return (
                    <button
                      key={sequence}
                      onClick={e => {
                        e.preventDefault();
                        setValue('categoryOrder', sequence);
                      }}
                      className="text-base font-semibold text-gray-800 w-6 h-6 rounded bg-blue-500"
                    >
                      {sequence}
                    </button>
                  );
                })}{' '}
                <span className="text-2xl font-semibold text-gray-700 leading-4">
                  ...
                </span>
              </div>

              <div className="flex flex-1 items-center gap-3">
                <button
                  onClick={e => cancel(e)}
                  className="h-9 flex flex-1 items-center justify-center hover:bg-yellow-500 bg-yellow-400 text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out"
                >
                  Cancelar
                </button>
                <button
                  onClick={e => {
                    e.preventDefault();
                    editCategory.isEditing
                      ? updateCategory()
                      : handleNewCategory();
                  }}
                  className={`h-9 flex flex-1 items-center justify-center
                            text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out
                            ${
                              editCategory.isEditing
                                ? 'hover:bg-blue-700 bg-blue-500'
                                : ' hover:bg-green-600 bg-green-300'
                            }
                            `}
                >
                  {editCategory.isEditing
                    ? 'Editar categoria'
                    : 'Criar nova categoria'}
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <CategoryView
            products={products}
            viewCategory={viewCategory}
            setViewCategory={setViewCategory}
          />
        </>
      )}
    </>
  );
}

interface iCategoryView {
  products: iProducts['data'];
  viewCategory: {
    isViewing: boolean;
    categoryId: number;
    categoryName: string;
  };
  setViewCategory: Dispatch<
    SetStateAction<{
      isViewing: boolean;
      categoryId: number;
      categoryName: string;
    }>
  >;
}

function CategoryView({
  products,
  setViewCategory,
  viewCategory,
}: iCategoryView) {
  const productFilteredByCategory = products.filter(
    product => product.category_id === viewCategory.categoryId
  );

  return (
    <>
      <div
        onClick={() =>
          setViewCategory({
            isViewing: false,
            categoryId: 0,
            categoryName: '',
          })
        }
        className={`w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10
                ${
                  viewCategory.isViewing
                    ? 'opacity-40 transition-all duration-300 ease-in-out'
                    : ' opacity-0 pointer-events-none duration-[0s]'
                }
                `}
      ></div>
      <div
        className={`fixed top-1/5 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[400px] sm:w-[600px] lg:w-[900px] max-h-[500px] 
            overflow-auto bg-white shadow-md p-3 2xs:p-6
                ${
                  viewCategory.isViewing
                    ? 'opacity-100 transition-all duration-00 ease-in-out'
                    : ' opacity-0 pointer-events-none duration-[0s]'
                }
                `}
      >
        <div className="w-full flex items-center justify-between mb-4">
          <span className="text-sm font-medium">
            {' '}
            {productFilteredByCategory.length} itens{' '}
          </span>
          <FiX
            onClick={() =>
              setViewCategory({
                isViewing: false,
                categoryId: 0,
                categoryName: '',
              })
            }
            className="text-2xl text-gray-600 cursor-pointer hover:scale-125 hover:transition-all ease-in-out"
          />
        </div>
        <h2 className="w-full text-xl font-bold text-center mb-8">
          {' '}
          {viewCategory.categoryName}{' '}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {productFilteredByCategory.map(product => {
            return (
              <div
                key={product.id}
                className="bg-white h-[120px] cursor-pointer sm:h-24 w-full flex items-center gap-3 p-2 rounded-md  hover:shadow-md hover:transition-all ease-in-out"
              >
                <Image
                  className="rounded-md h-[90px] sm:h-full w-20"
                  src={product.picture_url}
                  alt=""
                  width={40}
                  height={40}
                />

                <div className="flex flex-col items-start justify-start gap-1 overflow-hidden">
                  <span className="text-base font-semibold text-gray-700 leading-5">
                    {' '}
                    {product.name}{' '}
                  </span>
                  <span className="text-sm max-h-14 font-normal text-gray-500 leading-4 truncate">
                    {' '}
                    {product.description}{' '}
                  </span>
                  <span className="text-base font-medium text-green-300 leading-5">
                    {' '}
                    R$ {product.price}{' '}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-1 items-center gap-3">
          {/* <button
                        // onClick={(e) => cancel(e)}
                        className="h-9 flex flex-1 items-center justify-center hover:bg-yellow-500 bg-yellow-400 text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out" >
                        Cancelar
                    </button>
                    <button
                        onClick={() => editCategory.isEditing ? updateCategory() : handleNewCategory()}
                        className={`h-9 flex flex-1 items-center justify-center
                        text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out
                        ${editCategory.isEditing ? 'hover:bg-blue-700 bg-blue-500' : ' hover:bg-green-600 bg-green-300' }
                        `} >
                       { editCategory.isEditing ? 'Editar categoria' : 'Criar nova categoria'}
                    </button> */}
        </div>
      </div>
    </>
  );
}
