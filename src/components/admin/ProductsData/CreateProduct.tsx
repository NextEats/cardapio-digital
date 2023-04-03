import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useEffect, useMemo, useState } from "react"
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Image from "next/image"
import { BsUpload } from "react-icons/bs"
import { Additionals } from "./Additionals";
import { FiTrash2 } from "react-icons/fi";
import { iAdditional } from "@/src/types/types";
import { Selects } from "./Selects";

interface iCreateProductProps {
}

const newProductValidationSchema = zod.object({
    name: zod.string(),
    price: zod.number().min(0, { message: "Valor mínimo do produto: 0." }),
    category_id: zod.number(),
    picture: zod.any().nullable(),
    description: zod.string(),
}).required()

type newProduct = zod.infer<typeof newProductValidationSchema>
const newProductDefaultValue: newProduct = {
    picture: null,
    name: '',
    price: 0,
    category_id: 0,
    description: '0',
};

export function CreateProduct({ }: iCreateProductProps) {
    const { products, productScreenState, categories, selectAdditionalState } = useContext(ProductContext)
    const [productScreen, setProductScreen] = productScreenState
    const [selectAdditional, setSelectAdditional] = selectAdditionalState
    const [imageProview, setImageProview] = useState<string | null>(null)

    const { register, getValues, handleSubmit, reset, formState: { isSubmitting } } = useForm<newProduct>({
        resolver: zodResolver(newProductValidationSchema),
        defaultValues: newProductDefaultValue
    })

    useEffect(() => {
        if (typeof productScreen !== "string") {
            setImageProview(productScreen?.picture_url!)
        }
    }, [productScreen])

    const handleRemoveAdditional = (additional: iAdditional["data"]) => {
        setSelectAdditional(state => {
            state.splice(state.findIndex((a) => a.id === additional.id), 1);
            return [...state]
        })
    }

    return (
        <div>
            <button
                onClick={() => setProductScreen(null)}
                className="text-blue-400 text-right w-full"
            >
                voltar
            </button>
            <div className={`min-h-[400px] h-full bg-white shadow-md rounded-md p-4`}>
                <form action="" className="flex gap-8 flex-1">
                    <input
                        hidden
                        id="picture_url"
                        type="file"
                        accept="image/*" {...register("picture", {
                            setValueAs: (value: FileList) => value,
                            onChange(event) {
                                const picturteUrl = URL.createObjectURL(event.target.files[0])
                                setImageProview(picturteUrl)
                            },
                        })}
                    />

                    {imageProview ?
                        <div>
                            <Image
                                className="rounded-sm object-cover h-[300px] w-[300px] "
                                src={imageProview}
                                alt=""
                                width={200}
                                height={200}
                            />
                            <label htmlFor="picture_url" className="text-blue-400 cursor-pointer">Trocar imagem</label>
                        </div>
                        :
                        <label
                            className="h-[300px] w-[300px] border border-gray-300 flex items-center justify-center"
                            htmlFor="picture_url">
                            <BsUpload size={80} />
                        </label>
                    }

                    {/* <div> */}
                    <div className="max-h-[300px] flex flex-col flex-1">
                        <label className="text-lg font-medium" htmlFor=""> Nome </label>
                        <input
                            className="w-full border border-gray-300 py-1 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 mb-2"
                            type="text"
                            {...register("name")}
                            placeholder="ex.: Banana" />

                        <div className="flex items-center gap-2 w-full">
                            <label htmlFor="" className="text-lg font-medium w-40"> Preço
                                <div className="flex items-center mb-2">
                                    <p className="py-1 px-2 bg-gray-300 text-gray-500 rounded-l-md text-base">R$ </p>
                                    <input
                                        className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded-r outline-none focus:border-blue-400"
                                        type="number"
                                        {...register("price", { valueAsNumber: true })} />
                                </div>
                            </label>
                            <label htmlFor="" className="w-full">
                                Categoria
                                <select
                                    {...register("category_id", { valueAsNumber: true })}
                                    className="w-full border border-gray-300 py-1 px-2 text-base font-semibold leading-none rounded outline-none focus:border-blue-400"
                                >
                                    <option value="select">Selecione</option>
                                    {categories.map(category => {
                                        return <option key={category.id} value={category.id}>{category.name}</option>
                                    })}
                                </select>

                            </label>

                        </div>

                        <label className="text-lg font-medium" htmlFor=""> Descrição </label>
                        <textarea
                            {...register("name")}
                            className="scrollbar-custom w-full flex-1 border resize-none border-gray-300 py-2 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 "
                            placeholder="ex.: Banana"
                        ></textarea>

                    </div>
                    {/* </div> */}

                </form>

                <div className="grid grid-cols-2 gap-3 mt-6">
                    <div className=" border border-gray-300 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-base font-bold">Adicionais </span>
                            <Additionals type="select_additionals" />
                        </div>

                        <div className="flex flex-col gap-2 mt-3">

                            {selectAdditional.map(additional => {
                                return <div
                                    key={additional.id}
                                    className={`w-full h-[50px] rounded-sm bg-white shadow-sm flex gap-3 relative `}>
                                    <Image
                                        className="rounded-sm object-cover w-[50px] sm:h-full "
                                        src={additional.picture_url}
                                        alt=""
                                        width={200}
                                        height={200}
                                    />
                                    <div className="flex flex-col mt-2">
                                        <span className="w-[180px] truncate text-lg font-semibold"> {additional.name} </span>
                                        {/* <span className=""> R$ {additional.price.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2, maximumFractionDigits: 2
                                    })} </span> */}
                                    </div>
                                    <FiTrash2
                                        onClick={() => handleRemoveAdditional(additional)}
                                        className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out absolute top-2 right-2"
                                    />
                                </div>
                            })}
                        </div>

                    </div>
                    <div className=" border border-gray-300 p-4">
                        <div className="flex items-center justify-between">
                            <span>Personalisações </span>
                            <Selects type="select_selects" />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}