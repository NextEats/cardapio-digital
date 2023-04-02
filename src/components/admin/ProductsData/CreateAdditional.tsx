import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useState } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { BsPlusLg, BsUpload } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { api, supabase } from "@/src/server/api";

import { getFilePath } from "@/src/helpers/getFilePath";
import Image from "next/image";

import 'react-toastify/dist/ReactToastify.css';
interface iCreateAdditionalProps {
}

const newAdditionalValidationSchema = zod.object({
    picture: zod.any().nullable(),
    name: zod.string(),
    price: zod.number(),
    category_id: zod.number(),
}).required()

type newAdditional = zod.infer<typeof newAdditionalValidationSchema>
const newAdditionalDefaultValue: newAdditional = {
    picture: null,
    name: '',
    price: 0,
    category_id: 0,
};

export function CreateAdditional({ }: iCreateAdditionalProps) {
    const { restaurant, additional_categories, setAdditionals } = useContext(ProductContext)
    const [imageProview, setImageProview] = useState<string | null>(null)

    const { register, getValues, handleSubmit, reset, formState: { isSubmitting } } = useForm<newAdditional>({
        resolver: zodResolver(newAdditionalValidationSchema),
        defaultValues: newAdditionalDefaultValue
    })

    const handleCreateAdditional = async (data: newAdditional) => {

        const { category_id, name, price, picture } = data

        if (getValues("picture") === null || !name || !price || !category_id) {
            alert("Todas as informações devem ser preenchidas.")
            return
        }

        const file: File = getValues("picture")[0]
        const { filePath } = getFilePath({ file, slug: restaurant.slug as string })
        const { data: uploadData, error } = await supabase.storage.from('teste')
            .upload(filePath, file, { upsert: true })

        if (!uploadData) {
            alert("Não foi possivel fazer a criação do adicional.")
            return
        }
        const { data: { publicUrl } } = await supabase.storage.from('teste').getPublicUrl(uploadData.path)

        const { data: additonal, status } = await api.post(`api/additionals/${restaurant.id}`, {
            name,
            price,
            picture_url: publicUrl,
            additional_category_id: category_id,
        })

        if (status === 404) {
            alert("Não foi possivel fazer a criação do adicional.")
            return
        }
        setAdditionals(state => [...state, { ...additonal[0] }])
        reset()
    }

    return (
        <div className={``}>
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <button className="px-6 py-2 rounded-full bg-blue-400 ">
                        <BsPlusLg size={16} className="text-white" />
                    </button>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className="bg-blackA9 data-[state=open]:animate-overlayShow fixed inset-0" />
                    <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[30%] left-[50%]  h-[350px] w-[700px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

                        <form
                            onSubmit={handleSubmit(handleCreateAdditional)}
                            className="">
                            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-4">
                                Criar Adicional
                                <button
                                    disabled={isSubmitting}
                                    className="px-6 py-1 text-white rounded-full bg-blue-400 disabled:bg-gray-400 " type="submit">
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
                                    })}
                                />

                                <div className="flex flex-col flex-1">
                                    <label className="text-lg font-medium" htmlFor=""> Nome </label>
                                    <input
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
                                        type="text"
                                        {...register("name")}
                                        placeholder="ex.: Banana" />

                                    <label htmlFor="" className="text-lg font-medium"> Preço </label>
                                    <div className="flex items-center mb-2">
                                        <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                        <input
                                            className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                            type="number"
                                            {...register("price", { valueAsNumber: true })} />
                                    </div>

                                    <label className="text-lg font-medium" htmlFor=""> Categoria </label>
                                    <select
                                        {...register("category_id", { valueAsNumber: true })}
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded outline-none focus:border-blue-400"
                                    >
                                        <option value="select">Selecione</option>
                                        {additional_categories.map(category => {
                                            return <option key={category.id} value={category.id}>{category.name}</option>
                                        })}
                                    </select>

                                </div>
                            </div>

                        </form>

                        <Dialog.Close asChild className="text-violet11 cursor-pointer hover:bg-violet4 focus:shadow-violet7 absolute top-[8px] right-[8px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none">
                            <FiX />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    )
}