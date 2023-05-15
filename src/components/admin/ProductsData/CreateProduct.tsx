import { ProductContext } from '@/src/contexts/ProductContext';
import { getFilePath } from '@/src/helpers/getFilePath';
import { supabase } from '@/src/server/api';
import { iAdditional } from '@/src/types/iAdditional';
import { iProductsWithFKData } from '@/src/types/iProducts';
import { iSelect } from '@/src/types/iSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsUpload } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as zod from 'zod';
import { AdditionalsModal } from './ProductsAction/AdditionalsModal';
import { SelectsModal } from './ProductsAction/SelectsModal';

interface iCreateProductProps {}

const newProductValidationSchema = zod.object({
  name: zod.string().min(1, { message: 'O nome do produto é obrigatório.' }),
  price: zod
    .number()
    .min(0, { message: 'O preço do produto precisa ser maior que R$ 00,00.' }),
  category_id: zod.number(),
  picture: zod.any().nullable(),
  description: zod
    .string()
    .min(1, { message: 'A descrição do produto é obrigatório.' }),
});

type newProduct = zod.infer<typeof newProductValidationSchema>;
const newProductDefaultValue: newProduct = {
  picture: null,
  name: '',
  price: 0,
  category_id: 0,
  description: '',
};

export function CreateProduct({}: iCreateProductProps) {
  const {
    restaurant,
    isCreatingProductState,
    categories,
    selectAdditionalState,
    selectSelectState,
    setProducts,
    product_options_state,
  } = useContext(ProductContext);
  const [isCreatingProduct, setIsCreatingProduct] = isCreatingProductState;
  const [selectAdditional, setSelectAdditional] = selectAdditionalState;
  const [setectSelect, setSelectSelect] = selectSelectState;
  const [product_options, setProduct_options] = product_options_state;
  const [imageProview, setImageProview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<newProduct>({
    resolver: zodResolver(newProductValidationSchema),
    defaultValues: newProductDefaultValue,
  });

  const handleRemoveAdditional = async (additional: iAdditional['data']) => {
    setSelectAdditional((state: any) => {
      state.splice(
        state.findIndex((a: any) => a.id === additional.id),
        1
      );
      return [...state];
    });
  };

  const handleRemoveSelect = async (select: iSelect['data']) => {
    setSelectSelect((state: any) => {
      state.splice(
        state.findIndex((a: any) => a.id === select.id),
        1
      );
      return [...state];
    });
  };

  const handleCreateProduct = async (data: newProduct) => {
    const { category_id, description, name, price, picture } = data;

    if (!picture) {
      toast.error('Por favor, adicione uma imagem para criar o produto.', {
        theme: 'light',
      });
      return;
    }

    const file: File = picture[0];

    const { filePath } = getFilePath({ file, slug: restaurant.slug });
    const { data: uploadData, error } = await supabase.storage
      .from('product-pictures')
      .upload(filePath, file, { upsert: true });

    if (!uploadData) {
      toast.error('Não foi possivel criar o produto.', {
        theme: 'light',
      });
      return;
    }
    const {
      data: { publicUrl },
    } = await supabase.storage
      .from('product-pictures')
      .getPublicUrl(uploadData.path);

    const { data: productData } = await supabase
      .from('products')
      .insert({
        name,
        picture_url: publicUrl,
        price,
        description,
        category_id,
        active: true,
        is_deleted: false,
        restaurant_id: restaurant.id,
      })
      .select('*, category_id ( * )');

    if (!productData) {
      toast.error('Não foi possivel criar o produto.', {
        theme: 'light',
      });
      return;
    }

    selectAdditional.forEach(async (add: any) => {
      await supabase.from('product_additionals').insert({
        additional_id: add.id,
        product_id: productData[0].id,
      });
    });
    setectSelect.forEach(async (s: any) => {
      await supabase.from('product_selects').insert({
        select_id: s.id,
        product_id: productData[0].id,
      });
    });

    setProducts(state => {
      return [...state, { ...(productData[0] as iProductsWithFKData) }];
    });

    reset();
    handleGoBack();
  };

  const handleGoBack = () => {
    setIsCreatingProduct(false);
    setSelectSelect([]);
    setSelectAdditional([]);
  };

  return (
    <form onSubmit={handleSubmit(handleCreateProduct)}>
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={() => handleGoBack()}
          type="button"
          className="text-blue-400 font-semibold px-5 py-1 rounded-full bg-white hover:scale-105 shadow"
        >
          voltar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="text-blue-400 font-semibold disabled:text-gray-400  px-5 py-1 rounded-full bg-white hover:scale-105 shadow"
        >
          Salvar
        </button>
      </div>
      <div className={`min-h-[400px] h-full bg-white shadow-md rounded-md p-4`}>
        <div className="flex gap-8 flex-1 flex-col lg:flex-row">
          <input
            hidden
            id="picture_url"
            type="file"
            accept="image/*"
            {...register('picture', {
              setValueAs: (value: FileList) => value,
              onChange(event) {
                const picturteUrl = URL.createObjectURL(event.target.files[0]);
                setImageProview(picturteUrl);
              },
            })}
          />

          {imageProview ? (
            <div>
              <Image
                className="rounded-sm object-cover 2xs:h-[300px] w-full 2xs:w-[300px] "
                src={imageProview}
                alt=""
                width={200}
                height={200}
              />
              <label
                htmlFor="picture_url"
                className="text-blue-400 cursor-pointer"
              >
                Trocar imagem
              </label>
            </div>
          ) : (
            <label
              className="h-[240px] xs:h-[255px] 2xs:h-[300px] w-full 2xs:w-[300px] border border-gray-300 flex items-center justify-center"
              htmlFor="picture_url"
            >
              <BsUpload size={80} />
            </label>
          )}

          <div className="max-h-[300px] flex flex-col flex-1">
            <label className="text-lg font-medium" htmlFor="">
              {' '}
              Nome{' '}
            </label>
            <input
              className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
              type="text"
              {...register('name')}
              placeholder="ex.: Banana"
            />
            {errors.name ? (
              <p className={`text-red-500 text-sm font-light mb-2`}>
                {errors.name.message}
              </p>
            ) : null}
            <div className="flex 3xs:items-center 3xs:flex-row flex-col gap-2 w-full">
              <label
                htmlFor=""
                className="text-lg font-medium w-full 3xs:w-[30%]"
              >
                Preço
                <div className="flex items-center">
                  <p className="py-[3.5px] px-2 bg-gray-300 text-gray-500 rounded-l-sm text-base">
                    R${' '}
                  </p>
                  <input
                    className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                    type="number"
                    min="0"
                    {...register('price', { valueAsNumber: true })}
                  />
                  {errors.price ? (
                    <p className={`text-red-500 text-sm font-light mb-2`}>
                      {errors.price.message}
                    </p>
                  ) : null}
                </div>
              </label>
              <label
                htmlFor=""
                className="w-full 3xs:w-[70%] text-lg font-medium"
              >
                Categoria
                <select
                  {...register('category_id', { valueAsNumber: true })}
                  className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded outline-none focus:border-blue-400"
                >
                  <option value="select">Selecione</option>
                  {categories.map((category: any) => {
                    return (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>

            <label className="text-lg font-medium" htmlFor="">
              Descrição
            </label>
            <textarea
              {...register('description')}
              className="scrollbar-custom w-full h-28 lg:flex-1 border resize-none border-gray-300 py-2 px-2 text-base font-normal leading-none rounded
              outline-none focus:border-blue-400 "
              placeholder="ex.: Banana"
            ></textarea>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3 mt-6">
          <div className=" border border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">Adicionais </span>
              <AdditionalsModal type="select_additionals" />
            </div>

            <div className="flex flex-col gap-2 mt-3">
              {selectAdditional.map((additional: any) => {
                return (
                  <div
                    key={additional.id}
                    className={`w-full h-[50px] rounded-sm bg-white shadow-sm flex gap-3 relative `}
                  >
                    <Image
                      className="rounded-sm object-cover w-[50px] sm:h-full "
                      src={additional.picture_url}
                      alt=""
                      width={200}
                      height={200}
                    />
                    <div className="flex flex-col mt-2">
                      <span className="w-[180px] truncate text-lg font-semibold">
                        {' '}
                        {additional.name}{' '}
                      </span>
                    </div>
                    <FiTrash2
                      onClick={() => handleRemoveAdditional(additional)}
                      className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out absolute top-2 right-2"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className=" border border-gray-300 p-4">
            <div className="flex items-center justify-between">
              <span className="font-bold">Personalizações</span>
              <SelectsModal type="select_selects" />
            </div>
            {setectSelect.map((select: any) => {
              return (
                <div
                  key={select.id}
                  className="w-full flex flex-col gap-2 mt-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="w-[160px] truncate"> {select.name} </span>
                    {/* <div className="flex item-center gap-2"> */}
                    <FiTrash2
                      onClick={() => handleRemoveSelect(select)}
                      className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product_options?.map((product_option: any) => {
                      if (product_option.select_id !== select.id) return;
                      return (
                        <div key={product_option.id}>
                          <label
                            className=""
                            htmlFor={select.name + product_option.id}
                          >
                            <div
                              className={`w-[70px] h-[70px] rounded-sm relative cursor-pointer`}
                            >
                              <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                              <span className="absolute bottom-1 left-1 z-20 w-16 truncate text-white-300 text-sm font-medium">
                                {product_option.name}
                              </span>
                              {product_option.picture_url && (
                                <Image
                                  src={product_option.picture_url}
                                  alt={product_option.name}
                                  className={
                                    'w-full h-full relative rounded-lg object-cover'
                                  }
                                  width={326}
                                  height={358}
                                />
                              )}
                            </div>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </form>
  );
}
