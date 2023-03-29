import { ProductContext } from "@/src/contexts/ProductContext"
import { FormEvent, useContext } from "react"
import * as Dialog from '@radix-ui/react-dialog';
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { BsPlusLg, BsUpload } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { api, supabase } from "@/src/server/api";

import { useRouter } from "next/router";
import { getFilePath } from "@/src/helpers/getFilePath";

interface iCreateAdditionalProps {
}

const newAdditionalValidationSchema = zod.object({
    picture: zod.any().nullable(),
    name: zod.string(),
    price: zod.number(),
    categori_id: zod.number(),
}).required()


type newAdditional = zod.infer<typeof newAdditionalValidationSchema>
const newAdditionalDefaultValue: newAdditional = {
    picture: null,
    name: '',
    price: 0,
    categori_id: 0,
};


export function CreateAdditional({ }: iCreateAdditionalProps) {
    const { products, restaurant, additional_categories } = useContext(ProductContext)

    const { register, getValues, handleSubmit } = useForm<newAdditional>({
        resolver: zodResolver(newAdditionalValidationSchema),
        defaultValues: newAdditionalDefaultValue
    })
    const { query: { slug } } = useRouter()
    const handleCreateAdditional = async (e: FormEvent) => {
        e.preventDefault()
        if (!slug) return

        if (getValues("picture") === null) return

        const file: File = getValues("picture")[0]
        const { filePath } = getFilePath({ file, slug: slug as string })
        const { data } = await supabase.storage.from('teste')
            .upload(filePath, file, { upsert: true })

        if (!data) return
        const picture_url = await supabase.storage.from('teste').getPublicUrl(data.path)

        const name = getValues("name")
        const price = getValues("price")
        const category_id = getValues("categori_id")

        const additonal = await api.post("api/additional", {
            restaurant_id: restaurant.id,
            name,
            price,
            picture_url,
            additional_category_id: category_id,
        })
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
                        <form className="">
                            <Dialog.Title className="text-mauve12 flex flex-1 items-center justify-between m-0 text-[17px] font-medium mb-4">
                                Criar Adicional

                                <button className="px-6 py-1 text-white rounded-full bg-blue-400 " type="submit" onClick={handleCreateAdditional} >
                                    salvar
                                </button>
                            </Dialog.Title>

                            <div className="flex gap-3">

                                <label
                                    className="h-40 w-40 border border-gray-300 flex items-center justify-center"
                                    htmlFor="picture">
                                    <BsUpload size={44} />
                                </label>
                                <input
                                    hidden
                                    id="picture"
                                    type="file"
                                    accept="image/*" {...register("picture", {
                                        setValueAs: (value: FileList) => value,
                                    })} />

                                <div className="flex flex-col flex-1">
                                    <label className="text-lg font-medium" htmlFor=""> Nome </label>
                                    <input
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
                                        type="text"
                                        {...register("name")}
                                        placeholder="ex.: Banana" />

                                    <label htmlFor="" className="text-lg font-medium"> Ordem </label>
                                    <div className="flex items-center mb-2">
                                        <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md ">R$ </p>
                                        <input
                                            className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                            type="number"
                                            {...register("price")} />
                                    </div>

                                    <label className="text-lg font-medium" htmlFor=""> Categoria </label>
                                    <select
                                        {...register("categori_id")}
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded outline-none focus:border-blue-400"
                                    >
                                        <option value="select">Selecione</option>
                                        {additional_categories.map(category => {
                                            return <option key={category.id} value="select">{category.name}</option>
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