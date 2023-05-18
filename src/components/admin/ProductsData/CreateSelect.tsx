import { ProductContext } from '@/src/contexts/ProductContext';
import { supabase } from '@/src/server/api';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BsPlusLg, BsUpload } from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import * as zod from 'zod';

import { getFilePath } from '@/src/helpers/getFilePath';
import * as Switch from '@radix-ui/react-switch';
import Image from 'next/image';

const newSelectValidationSchema = zod.object({
  name: zod
    .string()
    .min(1, { message: 'O nome da personalização é obrigatório. ' }),
  has_default_price: zod.boolean(),
  price: zod.number().nullish(),
  max_selected_options: zod
    .number()
    .min(1, { message: 'O número mínimo de opções selecionáveis é 1.' }),
  option_picture_url: zod.any().nullable(),
  option_name: zod.string().min(1, { message: 'Campo obrigatório.' }),
  option_has_price: zod.boolean(),
  option_price: zod.number().nullable(),
  option_default_value: zod.boolean(),
});

type newSelectData = zod.infer<typeof newSelectValidationSchema>;
const selectDefaultValue: newSelectData = {
  name: '',
  has_default_price: false,
  price: null,
  max_selected_options: 1,
  option_has_price: false,
  option_name: '',
  option_price: null,
  option_picture_url: '',
  option_default_value: false,
};

export const CreateSelect = () => {
  const { restaurant, selectsState, product_options_state } =
    useContext(ProductContext);
  const [optionImageProview, setOptionImageProview] = useState<string | null>(
    null
  );

  const [selects, setSelects] = selectsState;
  const [product_options, setProduct_options] = product_options_state;

  const {
    register,
    reset,
    setFocus,
    setError,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<newSelectData>({
    resolver: zodResolver(newSelectValidationSchema),
    defaultValues: selectDefaultValue,
  });

  const has_default_value = watch('has_default_price');
  const has_price = watch('option_has_price');

  const handleCreateSelect = async (data: newSelectData) => {
    const {
      has_default_price,
      name,
      max_selected_options,
      option_name,
      option_price,
      price,
      option_picture_url,
      option_default_value,
    } = data;

    if (!option_picture_url) {
      setError('option_picture_url', {
        type: 'custom',
        message: 'Selecione uma imagem',
      });
      return;
    }

    const { data: selectData } = await supabase
      .from('selects')
      .insert({
        name,
        max_selected_options,
        has_default_price,
        price: has_default_price ? price : null,
        restaurant_id: restaurant.id,
      })
      .select('*');

    if (!selectData) {
      alert(
        'Desculpe, houve um problema ao criar essa personalização. Por favor, contate um administrador!'
      );
      return;
    }

    const file: File = option_picture_url[0];
    const { filePath } = getFilePath({ file, slug: restaurant.slug });
    const { data: uploadData, error } = await supabase.storage
      .from('teste')
      .upload(filePath, file, { upsert: true });

    if (!uploadData) {
      alert(
        'Desculpe, houve um problema ao criar essa personalização. Por favor, contate um administrador!'
      );
      return;
    }
    const {
      data: { publicUrl },
    } = await supabase.storage.from('teste').getPublicUrl(uploadData.path);

    const { data: optionData } = await supabase
      .from('product_options')
      .insert({
        name: option_name,
        picture_url: publicUrl,
        price: option_price,
        active: true,
        select_id: selectData[0].id,
        is_default_value: option_default_value,
      })
      .select('*');

    if (!optionData) {
      alert(
        'Desculpe, houve um problema ao criar essa personalização. Por favor, contate um administrador!'
      );
      return;
    }
    setSelects((state: any) => {
      return state ? [...state, { ...selectData[0] }] : [{ ...selectData[0] }];
    });
    setProduct_options((state: any) => {
      return state ? [...state, { ...optionData[0] }] : [{ ...optionData[0] }];
    });
    reset();
  };

  const handleFocus = (inputName: 'price' | 'option_price') => {
    setTimeout(() => {
      setFocus(inputName);
    }, 50);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild className="">
        <button className="px-6 py-2 rounded-full bg-blue-400 ">
          <BsPlusLg size={16} className="text-white" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[34%] left-[50%] z-40 h-auto w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
          <form
            onSubmit={handleSubmit(handleCreateSelect)}
            className="flex flex-col"
          >
            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-3">
              Criar categoria
              <button
                disabled={isSubmitting}
                type="submit"
                className="px-6 py-1 rounded-full text-white bg-blue-400 disabled:bg-gray-400 "
              >
                Salvar
              </button>
            </Dialog.Title>

            <label className="text-base font-medium" htmlFor="">
              {' '}
              Nome{' '}
            </label>
            <input
              className={`w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400
                            ${errors.name ? '' : 'mb-2'}`}
              type="text"
              {...register('name')}
              placeholder="ex.: Banana"
            />
            {errors.name ? (
              <p className={`text-red-500 text-sm font-light mb-2`}>
                {errors.name.message}
              </p>
            ) : null}
            <label className="text-base font-medium" htmlFor="">
              {' '}
              Número máximo de opções selecionáveis.{' '}
            </label>
            <input
              className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-1"
              type="number"
              min={1}
              {...register('max_selected_options', { valueAsNumber: true })}
            />

            <div className="flex item-center gap-3 mt-1">
              <Switch.Root
                className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                id="airplane-mode"
                onCheckedChange={(checked: boolean) => {
                  setValue('has_default_price', checked);
                  if (checked) setValue('option_has_price', false);
                  checked ? handleFocus('price') : setValue('price', null);
                }}
              >
                <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
              </Switch.Root>
              <label
                className="text-base font-normal leading-[20px]"
                htmlFor=""
              >
                Cobrar valor padrão
                {}
              </label>
            </div>
            {has_default_value ? (
              <>
                <label htmlFor="" className="text-lg font-medium">
                  {' '}
                  Preço{' '}
                </label>
                <div className="flex items-center mb-2">
                  <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">
                    R${' '}
                  </p>
                  <input
                    className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none
                                rounded-r outline-none focus:border-blue-400"
                    type="number"
                    {...register('price', { valueAsNumber: true })}
                  />
                </div>
              </>
            ) : null}

            <input
              hidden
              id="picture"
              type="file"
              accept="image/*"
              {...register('option_picture_url', {
                setValueAs: (value: FileList) => value,
                onChange(event) {
                  const picturteUrl = URL.createObjectURL(
                    event.target.files[0]
                  );
                  setOptionImageProview(picturteUrl);
                },
                required: true,
              })}
            />
            <div className="flex gap-2 mt-3">
              <div>
                {optionImageProview ? (
                  <div>
                    <Image
                      className="rounded-sm object-cover h-32 w-32 "
                      src={optionImageProview}
                      alt=""
                      width={200}
                      height={200}
                    />
                    <label
                      htmlFor="picture"
                      className="text-blue-400 cursor-pointer"
                    >
                      Trocar imagem
                    </label>
                  </div>
                ) : (
                  <>
                    <label
                      className="h-32 w-32 border border-gray-300 flex items-center justify-center"
                      htmlFor="picture"
                    >
                      <BsUpload size={44} />
                    </label>
                    {errors.option_picture_url ? (
                      <p className={`text-red-500 text-sm font-light mb-2`}>
                        {errors.option_picture_url.message as string}
                      </p>
                    ) : null}
                  </>
                )}
              </div>

              <div>
                <input
                  className={`w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400
                                    ${errors.option_name ? '' : 'mb-2'}`}
                  type="text"
                  {...register('option_name')}
                  placeholder="ex.: Banana"
                />
                {errors.option_name ? (
                  <p className={`text-red-500 text-sm font-light mb-2`}>
                    {errors.option_name.message}
                  </p>
                ) : null}

                {!has_default_value ? (
                  <>
                    <div className="flex item-center gap-3">
                      <Switch.Root
                        className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                        id="airplane-mode"
                        onCheckedChange={(checked: boolean) => {
                          setValue('option_has_price', checked);
                          checked
                            ? handleFocus('option_price')
                            : setValue('option_price', null);
                        }}
                        disabled={has_default_value}
                      >
                        <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                      </Switch.Root>
                      <label
                        className="text-base font-normal leading-[20px]"
                        htmlFor=""
                      >
                        {' '}
                        Cobrar{' '}
                      </label>
                    </div>
                  </>
                ) : null}

                {has_price ? (
                  <div>
                    <label htmlFor="" className="text-lg font-medium">
                      {' '}
                      Preço{' '}
                    </label>
                    <div className="flex items-center mb-2">
                      <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">
                        R${' '}
                      </p>
                      <input
                        className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                        type="number"
                        {...register('option_price', {
                          valueAsNumber: true,
                          required: true,
                        })}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="flex item-center gap-3 mt-2">
                  <Switch.Root
                    className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                    id="airplane-mode"
                    onCheckedChange={(checked: boolean) => {
                      setValue('option_default_value', checked);
                    }}
                  >
                    <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
                  <label
                    className="text-base font-normal leading-[20px]"
                    htmlFor=""
                  >
                    {' '}
                    Deve ser selecionda por padrão{' '}
                  </label>
                </div>
              </div>
            </div>
          </form>

          <Dialog.Close
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
};
