import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { BsPlusLg, BsUpload } from "react-icons/bs";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { api, supabase } from "@/src/server/api";

import * as Switch from '@radix-ui/react-switch';
import Image from "next/image";

interface iCreateSelectProps {
}

const newSelectValidationSchema = zod.object({
    name: zod.string(),
    has_default_price: zod.boolean(),
    price: zod.number().nullable(),
    option_picture_url: zod.any().nullable(),
    option_name: zod.string(),
    option_has_price: zod.boolean(),
    option_price: zod.number().nullable(),
}).required()

type newSelectData = zod.infer<typeof newSelectValidationSchema>
const updateAdditionalDefaultValue: newSelectData = {
    name: '',
    has_default_price: false,
    price: null,
    option_has_price: false,
    option_name: '',
    option_price: null,
    option_picture_url: '',
};

export function CreateSelect({ }: iCreateSelectProps) {
    const { restaurant } = useContext(ProductContext)
    const [optionImageProview, setOptionImageProview] = useState<string | null>(null)

    const { register, reset, getValues, watch, setValue, handleSubmit, formState: { isSubmitting } } = useForm<newSelectData>({
        resolver: zodResolver(newSelectValidationSchema),
        defaultValues: updateAdditionalDefaultValue
    })

    const has_default_value = watch("has_default_price")
    const has_price = watch("option_has_price")

    const handleCreateSelect = async (data: newSelectData) => {
        console.log(data)
    }

    return (

        <Dialog.Root>
            <Dialog.Trigger asChild className="mb-4">
                <button className="px-6 py-2 rounded-full bg-blue-400 ">
                    <BsPlusLg size={16} className="text-white" />
                </button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[34%] left-[50%]  h-auto w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <form onSubmit={handleSubmit(handleCreateSelect)} className="flex flex-col gap-2">
                        <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-3">
                            Criar categoria
                            <button disabled={isSubmitting} type="submit" className="px-6 py-1 rounded-full text-white bg-blue-400 disabled:bg-gray-400 ">
                                Salvar
                            </button>
                        </Dialog.Title>

                        <label className="text-base font-medium" htmlFor=""> Nome </label>
                        <input
                            className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
                            type="text"
                            {...register("name")}
                            placeholder="ex.: Banana" />

                        <div className="flex item-center gap-3">
                            <Switch.Root
                                className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                id="airplane-mode"
                                onCheckedChange={(checked: boolean) => { setValue("has_default_price", checked) }}
                            >
                                <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                            </Switch.Root>
                            <label className="text-base font-normal leading-[20px]" htmlFor=""> Cobar valou padrão </label>
                        </div>
                        {has_default_value ? <>
                            <label htmlFor="" className="text-lg font-medium"> Preço </label>
                            <div className="flex items-center mb-2">
                                <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                <input
                                    className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                    type="number"
                                    {...register("price", { valueAsNumber: true, required: true })} />
                            </div>
                        </>
                            : null}

                        <input hidden id="picture" type="file" accept="image/*"
                            {...register("option_picture_url", {
                                setValueAs: (value: FileList) => value,
                                onChange(event) {
                                    const picturteUrl = URL.createObjectURL(event.target.files[0])
                                    setOptionImageProview(picturteUrl)
                                },
                                required: true
                            })}
                        />
                        <div className="flex gap-2">
                            <div>

                                {optionImageProview ?
                                    <div>
                                        <Image
                                            className="rounded-sm object-cover h-32 w-32 "
                                            src={optionImageProview}
                                            alt=""
                                            width={200}
                                            height={200}
                                        />
                                        <label htmlFor="picture" className="text-blue-400 cursor-pointer">Trocar imagem</label>
                                    </div>
                                    :
                                    <label
                                        className="h-32 w-32 border border-gray-300 flex items-center justify-center"
                                        htmlFor="picture">
                                        <BsUpload size={44} />
                                    </label>
                                }

                            </div>

                            <div>
                                <input
                                    className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
                                    type="text"
                                    {...register('option_name')}
                                    placeholder="ex.: Banana"
                                />

                                <div className="flex item-center gap-3">
                                    <Switch.Root
                                        className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                        id="airplane-mode"
                                        onCheckedChange={(checked: boolean) => { setValue("option_has_price", checked) }}
                                    >
                                        <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                    </Switch.Root>
                                    <label className="text-base font-normal leading-[20px]" htmlFor=""> Cobar  </label>
                                </div>

                                {has_price ? <>
                                    <label htmlFor="" className="text-lg font-medium"> Preço </label>
                                    <div className="flex items-center mb-2">
                                        <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                        <input
                                            className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                            type="number"
                                            {...register("option_price", { valueAsNumber: true, required: true })} />
                                    </div>
                                </>
                                    : null}
                            </div>

                        </div>


                    </form>

                    <Dialog.Close asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                        <FiX />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>

    )
}