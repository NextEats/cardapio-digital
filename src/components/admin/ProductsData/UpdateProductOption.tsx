import { ProductContext } from "@/src/contexts/ProductContext"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as Switch from '@radix-ui/react-switch';
import Image from "next/image";
import { BsPlusLg, BsUpload } from "react-icons/bs";
import { iProductOption, iSelect } from "@/src/types/types";
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import { getFilePath } from "@/src/helpers/getFilePath";
import { supabase } from "@/src/server/api";
import { UpdateCategory } from "./UpdateCategory";

interface iUpdateProductOptionProps {
    setUpdateOption: Dispatch<SetStateAction<iProductOption["data"] | null>>
    updateOption: iProductOption["data"] | null
}

const ProductOptionValidationSchema = zod.object({
    option_picture_url: zod.any().nullable(),
    option_name: zod.string().min(1, { message: "Campo obrigatório." }),
    option_has_price: zod.boolean(),
    option_price: zod.number().nullable(),
    default_value: zod.boolean(),
})

type productOptionData = zod.infer<typeof ProductOptionValidationSchema>
const productOptionDefaultValue: productOptionData = {
    option_has_price: false,
    option_name: '',
    option_price: null,
    option_picture_url: '',
    default_value: false,
};

export function UpdateProductOption({ setUpdateOption, updateOption }: iUpdateProductOptionProps) {
    const { restaurant, product_options_state } = useContext(ProductContext)
    const [optionImageProview, setOptionImageProview] = useState<string | null>(null)

    const [product_options, setProduct_options] = product_options_state

    const { register, reset, getValues, setFocus, setError, watch, setValue, handleSubmit, formState: { isSubmitting, errors } } = useForm<productOptionData>({
        resolver: zodResolver(ProductOptionValidationSchema),
        defaultValues: productOptionDefaultValue
    })

    const has_price = watch("option_has_price")

    useEffect(() => {
        if (updateOption !== null) {
            setValue("option_has_price", updateOption.price !== null)
            setValue("option_name", updateOption.name)
            setValue("option_price", updateOption.price)
            setValue("option_picture_url", updateOption.picture_url)
            setValue("default_value", updateOption.is_default_value)
            setOptionImageProview(updateOption.picture_url)
        }
    }, [updateOption, setValue])

    const handleCreateProductOption = async (data: productOptionData) => {

        const { option_name, option_price, option_picture_url, default_value } = data

        console.log(data)

        let pictureUrl
        if (typeof option_picture_url === 'string') {
            pictureUrl = option_picture_url
        } else {
            const file: File = option_picture_url[0]
            const { filePath } = getFilePath({ file, slug: restaurant.slug })
            const { data: uploadData, error } = await supabase.storage.from('teste')
                .upload(filePath, file, { upsert: true })

            if (!uploadData) {
                alert("Desculpe, houve um problema ao criar essa opção. Por favor, contate um administrador!")
                return
            }
            const { data: { publicUrl } } = await supabase.storage.from('teste').getPublicUrl(uploadData.path)
            pictureUrl = publicUrl
        }

        console.log(pictureUrl)

        const { data: optionData } = await supabase.from("product_options").update({
            name: option_name,
            picture_url: pictureUrl,
            price: option_price,
            is_default_value: default_value,
        }).eq("id", updateOption?.id).select("*")

        if (!optionData) {
            alert("Desculpe, houve um problema ao criar essa opção. Por favor, contate um administrador!")
            return
        }

        setProduct_options(state => {
            state!.splice(state!.findIndex(op => op.id === updateOption?.id), 1)
            return [...state!, { ...optionData[0] }]
        })
        reset()
        setUpdateOption(null)
    }

    const handleFocus = (inputName: "option_price") => {
        setTimeout(() => {
            setFocus(inputName)
        }, 50);
    }
    if (!updateOption) return null
    return (
        <div className={``}>
            <Dialog.Root open={updateOption !== null}>
                <Dialog.Portal>
                    <Dialog.Overlay
                        onClick={() => setUpdateOption(null)}
                        className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[34%] left-[50%] z-40 h-auto w-[460px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                        <form onSubmit={handleSubmit(handleCreateProductOption)} className="flex flex-col">
                            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-3">
                                Editar {updateOption!.name}
                                <button disabled={isSubmitting} type="submit" className="px-6 py-1 rounded-full text-white bg-blue-400 disabled:bg-gray-400 ">
                                    Salvar
                                </button>
                            </Dialog.Title>

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
                            <div className="flex gap-2 mt-3">
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
                                        <>
                                            <label
                                                className="h-32 w-32 border border-gray-300 flex items-center justify-center"
                                                htmlFor="picture">
                                                <BsUpload size={44} />
                                            </label>
                                            {errors.option_picture_url ?
                                                <p className={`text-red-500 text-sm font-light mb-2`}>{errors.option_picture_url.message as string}</p>
                                                : null}
                                        </>
                                    }

                                </div>

                                <div>
                                    <input
                                        className={`w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400
                                        ${errors.option_name ? "" : "mb-2"}`}
                                        type="text"
                                        {...register('option_name')}
                                        placeholder="ex.: Banana"
                                    />
                                    {errors.option_name ? <p className={`text-red-500 text-sm font-light mb-2`}>{errors.option_name.message}</p> : null}

                                    <div className="flex item-center gap-3">
                                        <Switch.Root
                                            className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                            id="airplane-mode"
                                            onCheckedChange={(checked: boolean) => {
                                                setValue("option_has_price", checked)
                                                checked ? handleFocus("option_price") : setValue("option_price", null)
                                            }}
                                        >
                                            <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                        </Switch.Root>
                                        <label className="text-base font-normal leading-[20px]" htmlFor=""> Cobar  </label>
                                    </div>

                                    {has_price ? <div>
                                        <label htmlFor="" className="text-lg font-medium"> Preço </label>
                                        <div className="flex items-center mb-2">
                                            <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                            <input
                                                className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                                type="number"
                                                {...register("option_price", { valueAsNumber: true, required: true })} />
                                        </div>
                                    </div>
                                        : null}

                                    <div className="flex item-center gap-3 mt-2">
                                        <Switch.Root
                                            className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                            id="airplane-mode"
                                            checked={watch("default_value")}
                                            onCheckedChange={(checked: boolean) => {
                                                setValue("default_value", checked)
                                            }}
                                        >
                                            <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                                        </Switch.Root>
                                        <label className="text-base font-normal leading-[20px]" htmlFor=""> Deve selecionda como padrão </label>
                                    </div>
                                </div>

                            </div>
                        </form>
                        <Dialog.Close
                            onClick={() => setUpdateOption(null)}
                            asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                            <FiX />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div >
    )
}