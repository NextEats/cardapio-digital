import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { FiTrash2, FiX } from "react-icons/fi";
import * as zod from "zod";
import { supabase } from "../../../../server/api";
import { iInsertProductCategory, iProducts } from "../../../../types/types";
import { CardapioDigitalButton } from "../CardapioDigitalButton";


const newCategoryFormValidationSchema = zod.object({
    productCategory: zod.string(),
});

type NewCategoryFormData = zod.infer<typeof newCategoryFormValidationSchema>;

interface iCategoryModalProps {
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>,
    editCategory: {
        isEditing: boolean,
        categoryData: iInsertProductCategory["data"]
    }
    setEditCategory: Dispatch<SetStateAction<{
        isEditing: boolean,
        categoryData: iInsertProductCategory["data"]
    }>>
    products: iProducts["data"],
    viewCategory: {
        isViewing: boolean;
        categoryId: number;
        categoryName: string;
    },
    setViewCategory: Dispatch<SetStateAction<{
        isViewing: boolean;
        categoryId: number;
        categoryName: string;
    }>>
}

export function CategoryModal({ modalIsOpen, setModalIsOpen, editCategory, setEditCategory, products, viewCategory, setViewCategory }: iCategoryModalProps) {
    const { register, reset, getValues, setValue } = useForm<NewCategoryFormData>({
        resolver: zodResolver(newCategoryFormValidationSchema),
        defaultValues: {
            productCategory: '',
        },
    });

    async function handleNewCategory() {
        const productCategory = getValues("productCategory")
        await supabase.from("product_categories").insert({
            name: productCategory,
            restaurant_id: 3
        })
        reset()
        setModalIsOpen(false)
    }

    async function updateCategory() {
        const productCategory = getValues("productCategory")
        await supabase.from("product_categories").update({
            name: productCategory,
            restaurant_id: 3
        }).eq("id", editCategory.categoryData.id)
        reset()
        setModalIsOpen(false)
        setEditCategory({
            isEditing: false,
            categoryData: { name: '', restaurant_id: 0 }
        })
    }

    function cancel(e: FormEvent) {
        e.preventDefault();
        reset()
        setModalIsOpen(false)
        setEditCategory({
            isEditing: false,
            categoryData: { name: '', restaurant_id: 0 }
        })
    }

    useEffect(() => {
        if (editCategory.isEditing) setValue("productCategory", editCategory.categoryData.name)
    }, [editCategory.isEditing, setValue, editCategory.categoryData.name])

    return (
        <>
            {!viewCategory.isViewing ? <>
                <div className={`w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10
                    ${modalIsOpen || editCategory.isEditing ? 'opacity-40 transition-all duration-300 ease-in-out' : ' opacity-0 pointer-events-none duration-[0s]'}
                    `}></div>
                <div className={`fixed top-1/3 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6
                    ${modalIsOpen || editCategory.isEditing ? 'opacity-100 transition-all duration-300 ease-in-out' : ' opacity-0 pointer-events-none duration-[0s]'}
                    `} >
                    <form className="w-full">
                        <h2 className="text-base w-full text-center font-semibold mb-6">Nova categoria</h2>

                        <input type="text" {...register("productCategory")} placeholder="Dê um nome para a categoria"
                            className="w-full h-9 rounded text-base font-medium text-gray-600 placeholder:text-gray-400 outline-none border border-gray-400 px-2 mb-10 "
                        />

                        <div className="flex flex-1 items-center gap-3" >
                            <button
                                onClick={(e) => cancel(e)}
                                className="h-9 flex flex-1 items-center justify-center hover:bg-yellow-500 bg-yellow-400 text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out" >
                                Cancelar
                            </button>
                            <button
                                onClick={() => editCategory.isEditing ? updateCategory() : handleNewCategory()}
                                className={`h-9 flex flex-1 items-center justify-center
                            text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out
                            ${editCategory.isEditing ? 'hover:bg-blue-700 bg-blue-500' : ' hover:bg-green-600 bg-green-300'}
                            `} >
                                {editCategory.isEditing ? 'Editar categoria' : 'Criar nova categoria'}
                            </button>
                        </div>
                    </form>
                </div>
            </> : <>
                <CategoryView products={products} viewCategory={viewCategory} setViewCategory={setViewCategory} />
            </>
            }
        </>
    )
}

interface iCategoryView {
    products: iProducts["data"],
    viewCategory: {
        isViewing: boolean;
        categoryId: number;
        categoryName: string;
    },
    setViewCategory: Dispatch<SetStateAction<{
        isViewing: boolean;
        categoryId: number;
        categoryName: string;
    }>>
}

function CategoryView({ products, setViewCategory, viewCategory }: iCategoryView) {

    const productFilteredByCategory = products.filter(product => product.category_id === viewCategory.categoryId)

    return (
        <>
            <div onClick={() => setViewCategory({ isViewing: false, categoryId: 0, categoryName: '' })}
                className={`w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10
                ${viewCategory.isViewing ? 'opacity-40 transition-all duration-300 ease-in-out' : ' opacity-0 pointer-events-none duration-[0s]'}
                `}></div>
            <div className={`fixed top-1/5 right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[400px] sm:w-[600px] lg:w-[900px] max-h-[500px] 
            overflow-auto bg-white shadow-md p-3 2xs:p-6
                ${viewCategory.isViewing ? 'opacity-100 transition-all duration-00 ease-in-out' : ' opacity-0 pointer-events-none duration-[0s]'}
                `} >
                <div className="w-full flex items-center justify-between mb-4">
                    <span className="text-sm font-medium"> {productFilteredByCategory.length} itens </span>
                    <FiX
                        onClick={() => setViewCategory({ isViewing: false, categoryId: 0, categoryName: '' })}
                        className="text-2xl text-gray-600 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
                </div>
                <h2 className="w-full text-xl font-bold text-center mb-8"> {viewCategory.categoryName} </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {
                        productFilteredByCategory.map(product => {
                            return <div key={product.id} className="bg-white h-[120px] cursor-pointer sm:h-24 w-full flex items-center gap-3 p-2 rounded-md  hover:shadow-md hover:transition-all ease-in-out">
                                <Image
                                    className="rounded-md h-[90px] sm:h-full w-20"
                                    src={product.picture_url}
                                    alt=""
                                    width={40}
                                    height={40}
                                />

                                <div className="flex flex-col items-start justify-start gap-1 overflow-hidden">
                                    <span className="text-base font-semibold text-gray-700 leading-5" > {product.name} </span>
                                    <span className="text-sm max-h-14 font-normal text-gray-500 leading-4 truncate" > {product.description} </span>
                                    <span className="text-base font-medium text-green-300 leading-5" > R$ {product.price} </span>
                                </div>
                            </div>
                        })
                    }


                </div>
                <div className="flex flex-1 items-center gap-3" >
                    {/* <button
                        // onClick={(e) => cancel(e)}
                        className="h-9 flex flex-1 items-center justify-center hover:bg-yellow-500 bg-yellow-400 text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out" >
                        Cancelar
                    </button>
                    <button
                        onClick={() => editCategory.isEditing ? updateCategory() : handleNewCategory()}
                        className={`h-9 flex flex-1 items-center justify-center
                        text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out
                        ${editCategory.isEditing ? 'hover:bg-blue-700 bg-blue-500' : ' hover:bg-green-600 bg-green-300' }
                        `} >
                       { editCategory.isEditing ? 'Editar categoria' : 'Criar nova categoria'}
                    </button> */}
                </div>
            </div>
        </>
    )
}



