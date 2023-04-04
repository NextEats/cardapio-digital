import { ProductContext } from "@/src/contexts/ProductContext"
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import { FiX } from "react-icons/fi";
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from "@/src/server/api";

import * as Switch from '@radix-ui/react-switch';
import { iSelect } from "@/src/types/types";

interface iUpdateSelectProps {
    setIsUpadatingSelect: Dispatch<SetStateAction<iSelect["data"] | null>>;
    isUpadatingSelect: iSelect["data"] | null;
}

const updateSelectValidationSchema = zod.object({
    name: zod.string().min(1, { message: "O nome da personalização é obrigatório. " }),
    has_default_price: zod.boolean(),
    price: zod.number().nullish(),
    max_selected_options: zod.number().min(1, { message: "O número mínimo de opções selecionáveis é 1." }),
})

type updateSelectData = zod.infer<typeof updateSelectValidationSchema>
const selectDefaultValue: updateSelectData = {
    name: '',
    has_default_price: false,
    price: null,
    max_selected_options: 1,
};

export function UpdateSelect({ isUpadatingSelect, setIsUpadatingSelect }: iUpdateSelectProps) {
    const { restaurant, selectsState, product_options_state } = useContext(ProductContext)
    const [optionImageProview, setOptionImageProview] = useState<string | null>(null)

    const [selects, setSelects] = selectsState
    const [product_options, setProduct_options] = product_options_state

    const { register, reset, setFocus, setError, watch, setValue, handleSubmit, formState: { isSubmitting, errors } } = useForm<updateSelectData>({
        resolver: zodResolver(updateSelectValidationSchema),
        defaultValues: selectDefaultValue
    })

    const has_default_value = watch("has_default_price")

    useEffect(() => {
        if (isUpadatingSelect) {
            setValue("name", isUpadatingSelect?.name)
            setValue("has_default_price", isUpadatingSelect?.has_default_price)
            setValue("price", isUpadatingSelect?.price)
            setValue("max_selected_options", isUpadatingSelect?.max_selected_options)
        }
    }, [setValue, isUpadatingSelect])


    const handleUpdateSelect = async (data: updateSelectData) => {

        const {
            has_default_price,
            name,
            max_selected_options,
            price,
        } = data

        const { data: selectData } = await supabase.from("selects").update({
            name,
            max_selected_options,
            has_default_price,
            price,
        }).eq("id", isUpadatingSelect?.id!).select("*")

        if (!selectData) {
            alert("Desculpe, houve um problema ao editar essa personalização. Por favor, contate um administrador!")
            return
        }

        setSelects(state => {
            state?.splice(state?.findIndex(s => s.id! === isUpadatingSelect?.id!), 1)
            return [...state!, { ...selectData[0] }]
        })

        setIsUpadatingSelect(null)
        reset()
    }

    const handleFocus = (inputName: "price") => {
        setTimeout(() => {
            setFocus(inputName)
        }, 50);
    }

    return (

        <Dialog.Root open={isUpadatingSelect !== null}>
            <Dialog.Trigger />
            <Dialog.Portal>
                <Dialog.Overlay
                    onClick={() => setIsUpadatingSelect(null)}
                    className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[34%] left-[50%] z-40 h-auto w-[400px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">
                    <form onSubmit={handleSubmit(handleUpdateSelect)} className="flex flex-col">
                        <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-3">
                            Criar categoria
                            <button disabled={isSubmitting} type="submit" className="px-6 py-1 rounded-full text-white bg-blue-400 disabled:bg-gray-400 ">
                                Editar
                            </button>
                        </Dialog.Title>

                        <label className="text-base font-medium" htmlFor=""> Nome </label>
                        <input
                            className={`w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 
                            ${errors.name ? "" : "mb-2"}`}
                            type="text"
                            {...register("name")}
                            placeholder="ex.: Banana" />
                        {errors.name ? <p className={`text-red-500 text-sm font-light mb-2`}>{errors.name.message}</p> : null}
                        <label className="text-base font-medium" htmlFor=""> Número máximo de opções selecionáveis.  </label>
                        <input
                            className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-1"
                            type="number"
                            min={1}
                            {...register("max_selected_options", { valueAsNumber: true })}
                        />

                        <div className="flex item-center gap-3 mt-1">
                            <Switch.Root
                                className="w-[38px] h-5 bg-red-orange rounded-full relative   data-[state=checked]:bg-blue-400 outline-none cursor-default"
                                id="airplane-mode"
                                onCheckedChange={(checked: boolean) => {
                                    setValue("has_default_price", checked)
                                    checked ? handleFocus("price") : setValue("price", null)
                                }}
                            >
                                <Switch.Thumb className="block w-[16px] h-[16px] bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                            </Switch.Root>
                            <label className="text-base font-normal leading-[20px]" htmlFor=""> Cobar valor padrão </label>
                        </div>
                        {has_default_value ? <>
                            <label htmlFor="" className="text-lg font-medium"> Preço </label>
                            <div className="flex items-center mb-2">
                                <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                <input
                                    className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                    type="number"
                                    {...register("price", { valueAsNumber: true })} />
                            </div>
                        </>
                            : null}
                    </form>

                    <Dialog.Close
                        onClick={() => setIsUpadatingSelect(null)}
                        asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                        <FiX />
                    </Dialog.Close>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}