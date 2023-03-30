import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useEffect, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { BsUpload } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { supabase } from "@/src/server/api";

import { getFilePath } from "@/src/helpers/getFilePath";
import Image from "next/image";

import 'react-toastify/dist/ReactToastify.css';
interface iUpdateAdditionalProps {
}

const updateAdditionalValidationSchema = zod.object({
    picture: zod.any().nullable(),
    name: zod.string(),
    price: zod.number(),
    category_id: zod.number(),
}).required()

type updateAdditionalType = zod.infer<typeof updateAdditionalValidationSchema>
const updateAdditionalDefaultValue: updateAdditionalType = {
    picture: null,
    name: '',
    price: 0,
    category_id: 0,
};

export function UpdateAdditional({ }: iUpdateAdditionalProps) {
    const { restaurant, additional_categories, setAdditionals, updateAdditionalState } = useContext(ProductContext)
    const [updateAdditional, setUpdateAdditional] = updateAdditionalState
    const [imageProview, setImageProview] = useState<string | null>(null)

    const { register, reset, setValue, handleSubmit, formState: { isSubmitting } } = useForm<updateAdditionalType>({
        resolver: zodResolver(updateAdditionalValidationSchema),
        defaultValues: updateAdditionalDefaultValue
    })

    useEffect(() => {
        setValue("category_id", updateAdditional?.additional_category_id!)
        setValue("name", updateAdditional?.name!)
        setValue("picture", updateAdditional?.picture_url)
        setImageProview(updateAdditional?.picture_url!)
        setValue("price", updateAdditional?.price!)
    }, [updateAdditional, setValue])

    const handleUpdateAdditional = async (data: updateAdditionalType) => {
        const { category_id, name, price, picture } = data

        if (picture === null || !name || !price || !category_id) {
            alert("Todas as informações devem ser preenchidas.")
            return
        }

        let picture_url
        if (typeof picture[0] === "object") {
            const file: File = picture[0]
            const { filePath } = getFilePath({ file, slug: restaurant.slug as string })
            const { data: uploadData, error } = await supabase.storage.from('teste')
                .upload(filePath, file, { upsert: true })

            if (!uploadData) {
                alert("Não foi possivel fazer a criação do adicional.")
                return
            }
            const { data: { publicUrl } } = await supabase.storage.from('teste').getPublicUrl(uploadData.path)

            picture_url = publicUrl
        } else picture_url = picture

        const { data: additonal, status } = await supabase.from("additionals").update({
            name,
            picture_url,
            price,
            additional_category_id: category_id,
        }).eq("id", updateAdditional?.id).select("*")

        if (status === 404 || additonal === null) {
            alert("Não foi possivel fazer a criação do adicional.")
            return
        }
        setAdditionals(state => {
            state.splice(state.findIndex(a => updateAdditional?.id === a.id), 1)
            return [...state, { ...additonal[0] }]
        })
        setUpdateAdditional(null)
        reset()
    }

    return (
        <div className={``}>
            <Dialog.Root open={updateAdditional !== null}>
                <Dialog.Trigger />
                <Dialog.Portal>
                    <Dialog.Overlay
                        onClick={() => {
                            setUpdateAdditional(null)
                            reset()
                        }}
                        className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[30%] left-[50%]  h-[350px] w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                        <form
                            onSubmit={handleSubmit(handleUpdateAdditional)}
                            className="">
                            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-4">
                                Criar Adicional
                                <button
                                    disabled={isSubmitting}
                                    className="px-6 py-1 text-white rounded-full bg-blue-400 disabled:bg-gray-300 " type="submit"
                                // onClick={handleUpdateAdditional}
                                >
                                    salvar
                                </button>
                            </Dialog.Title>

                            <div className="flex gap-3">

                                {imageProview ?
                                    <div>
                                        <Image
                                            className="rounded-sm object-cover h-40 w-40 "
                                            src={imageProview}
                                            alt=""
                                            width={200}
                                            height={200}
                                        />
                                        <label htmlFor="picture" className="text-blue-400 cursor-pointer">Trocar imagem</label>
                                    </div>
                                    :
                                    <label
                                        className="h-40 w-40 border border-gray-300 flex items-center justify-center"
                                        htmlFor="picture">
                                        <BsUpload size={44} />
                                    </label>
                                }

                                <input
                                    hidden
                                    id="picture"
                                    type="file"
                                    accept="image/*" {...register("picture", {
                                        setValueAs: (value: FileList) => value,
                                        onChange(event) {
                                            const picturteUrl = URL.createObjectURL(event.target.files[0])
                                            setImageProview(picturteUrl)
                                        },
                                        required: true
                                    })}
                                />

                                <div className="flex flex-col flex-1">
                                    <label className="text-lg font-medium" htmlFor=""> Nome </label>
                                    <input
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
                                        type="text"
                                        {...register("name", { required: true })}
                                        placeholder="ex.: Banana" />

                                    <label htmlFor="" className="text-lg font-medium"> Ordem </label>
                                    <div className="flex items-center mb-2">
                                        <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                        <input
                                            className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                            type="number"
                                            {...register("price", { valueAsNumber: true, required: true })} />
                                    </div>

                                    <label className="text-lg font-medium" htmlFor=""> Categoria </label>
                                    <select
                                        {...register("category_id", { valueAsNumber: true, required: true })}
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded outline-none focus:border-blue-400"
                                    >
                                        <option value="select">Selecione</option>
                                        {additional_categories ? additional_categories.map(category => {
                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                        }) : null}
                                    </select>

                                </div>
                            </div>


                        </form>

                        <Dialog.Close
                            onClick={() => {
                                setUpdateAdditional(null)
                                reset()
                            }}
                            asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                            <FiX />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}