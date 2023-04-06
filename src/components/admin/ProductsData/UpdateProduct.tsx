import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext, useEffect, useMemo, useState } from "react"
import * as zod from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import Image from "next/image"
import { BsUpload } from "react-icons/bs"
import { Additionals } from "./Additionals";
import { FiTrash2 } from "react-icons/fi";
import { iAdditional, iAdditionals, iSelect } from "@/src/types/types";
import { Selects } from "./Selects";
import { api, supabase } from "@/src/server/api";
import { getFilePath } from "@/src/helpers/getFilePath";

interface iUpdateProductProps {
}

const updateProductValidationSchema = zod.object({
    name: zod.string().min(1, { message: "O nome do produto é obrigatório." }),
    price: zod.number(),
    category_id: zod.number(),
    picture: zod.any().nullable(),
    description: zod.string().min(1, { message: "A descrição do produto é obrigatório." }),
})

type updateProduct = zod.infer<typeof updateProductValidationSchema>
const updateProductDefaultValue: updateProduct = {
    picture: null,
    name: '',
    price: 0,
    category_id: 0,
    description: '',
};

export function UpdateProduct({ }: iUpdateProductProps) {
    const { restaurant, categories, selectAdditionalState, updateProductState, selectSelectState, productEditDataState, product_options_state } = useContext(ProductContext)

    const [productEditData, setProductEditData] = productEditDataState
    const [updateProduct, setUpdateProduct] = updateProductState
    const [selectAdditional, setSelectAdditional] = selectAdditionalState
    const [setectSelect, setSelectSelect] = selectSelectState
    const [product_options, setProduct_options] = product_options_state
    const [imageProview, setImageProview] = useState<string | null>(null)

    const { register, getValues, setValue, handleSubmit, reset, formState: { isSubmitting } } = useForm<updateProduct>({
        resolver: zodResolver(updateProductValidationSchema),
        defaultValues: updateProductDefaultValue
    })

    useEffect(() => {
        if (typeof updateProduct !== null) {
            setImageProview(updateProduct?.picture_url!)
            setValue("description", updateProduct?.description!)
            setValue("name", updateProduct?.name!)
            setValue("price", updateProduct?.price!)
            setValue("category_id", updateProduct?.category_id!)
            setValue("picture", updateProduct?.picture_url)
        }
    }, [updateProduct, setValue])

    const handleRemoveAdditional = async (additional: iAdditional["data"]) => {
        await supabase.from("product_additionals").delete().match({ product_id: updateProduct!.id, additional_id: additional.id })
        setSelectAdditional(state => {
            state.splice(state.findIndex((a) => a.id === additional.id), 1);
            return [...state]
        })
    }

    const handleRemoveSelect = async (select: iSelect["data"]) => {

        await supabase.from("product_selects").delete().match({ product_id: updateProduct!.id, select_id: select.id })
        setSelectSelect(state => {
            state.splice(state.findIndex((a) => a.id === select.id), 1);
            return [...state]
        })
    }

    const handleUpdateProduct = async (data: updateProduct) => {
        const { category_id, description, name, price, picture } = data
        console.log(data)
        console.log("productEditData", productEditData)

        let pictureUrl
        if (typeof picture === "string") {
            pictureUrl = picture
        } else {
            const file: File = picture[0]
            const { filePath } = getFilePath({ file, slug: restaurant.slug })
            const { data: uploadData, error } = await supabase.storage.from('teste')
                .upload(filePath, file, { upsert: true })

            if (!uploadData) {
                alert("Não foi possivel criar o produto.")
                return
            }
            const { data: { publicUrl } } = await supabase.storage.from('teste').getPublicUrl(uploadData.path)
            pictureUrl = publicUrl
        }
        const { data: productData, status } = await supabase.from("products").update({
            name,
            picture_url: pictureUrl,
            price,
            description,
            category_id,
        }).eq("id", updateProduct?.id).select("*")
        if (!productData) {
            alert("Erro ao editar produto. Contate o suporte.")
            return
        }
        console.log("status", status)
        if (productEditData !== null) {
            productEditData.forEach(async ped => {

                if (ped.additional_id !== null) {
                    ped.type === "deleted" ?
                        await deleteProductAdditional({ additional_id: ped.additional_id, product_id: productData[0].id, })
                        : ped.type === "added" ?
                            await createProductAdditional({ additional_id: ped.additional_id, product_id: productData[0].id, })
                            : null
                }
                if (ped.select_id !== null) {
                    ped.type === "deleted" ?
                        await deleteProductSelect({ select_id: ped.select_id, product_id: productData[0].id, })
                        : ped.type === "added" ?
                            await createProductSelect({ select_id: ped.select_id, product_id: productData[0].id, })
                            : null
                }

            })
        }


    }

    const deleteProductAdditional = async ({ additional_id, product_id }: { additional_id: number, product_id: number }) => {
        const { data } = await supabase.from("product_additionals").delete().match({
            additional_id,
            product_id,
        })
        console.log("1", data)
    }
    const createProductAdditional = async ({ additional_id, product_id }: { additional_id: number, product_id: number }) => {
        const { data } = await supabase.from("product_additionals").insert({
            additional_id,
            product_id,
        })
        console.log("2", data)
    }
    const deleteProductSelect = async ({ select_id, product_id }: { select_id: number, product_id: number }) => {
        const { data } = await supabase.from("product_selects").delete().match({
            select_id,
            product_id,
        })
        console.log("1", data)
    }
    const createProductSelect = async ({ select_id, product_id }: { select_id: number, product_id: number }) => {
        const { data } = await supabase.from("product_selects").insert({
            select_id,
            product_id,
        })
        console.log("2", data)
    }

    const handleGoBack = () => {
        setUpdateProduct(null)
        setSelectSelect([])
        setSelectAdditional([])
    }

    return (
        <form onSubmit={handleSubmit(handleUpdateProduct)}>
            <div className="flex items-center justify-between">
                <button onClick={() => handleGoBack()} type="button" className="text-blue-400" > voltar </button>
                <button type="submit" disabled={isSubmitting} className="text-blue-400 disabled:text-gray-400" >
                    Editar
                </button>
            </div>
            <div className={`min-h-[400px] h-full bg-white shadow-md rounded-md p-4`}>
                <div className="flex gap-8 flex-1">
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
                            {...register("description")}
                            className="scrollbar-custom w-full flex-1 border resize-none border-gray-300 py-2 px-2 text-base font-normal leading-none rounded outline-none focus:border-blue-400 "
                            placeholder="ex.: Banana"
                        ></textarea>

                    </div>
                    {/* </div> */}

                </div>

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
                            <span className="font-bold">Personalisações </span>
                            <Selects type="select_selects" />
                        </div>
                        {setectSelect.map(select => {
                            return <div key={select.id} className="w-full flex flex-col gap-2 mt-2">
                                <div className="flex items-center justify-between">
                                    <span className="w-[160px] truncate"> {select.name}  </span>
                                    {/* <div className="flex item-center gap-2"> */}
                                    <FiTrash2
                                        onClick={() => handleRemoveSelect(select)}
                                        className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out"
                                    />
                                    {/* </div> */}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {product_options?.map((product_option) => {
                                        if (product_option.select_id !== select.id) return
                                        return <div key={product_option.id} >
                                            <label
                                                className=""
                                                htmlFor={select.name + product_option.id}
                                            >
                                                <div className={`w-[70px] h-[70px] rounded-sm relative cursor-pointer`} >
                                                    <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                                                    <span className="absolute bottom-1 left-1 z-20 w-16 truncate text-white-300 text-sm font-medium">
                                                        {product_option.name}
                                                    </span>
                                                    {product_option.picture_url && (
                                                        <Image
                                                            src={product_option.picture_url}
                                                            alt={product_option.name}
                                                            className={'w-full h-full relative rounded-lg object-cover'}
                                                            width={326}
                                                            height={358}
                                                        />
                                                    )}
                                                </div>
                                            </label>
                                        </div>
                                    })}
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        </form>
    )
}