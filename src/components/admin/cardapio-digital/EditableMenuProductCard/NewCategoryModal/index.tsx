import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, FormEvent, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { supabase } from "../../../../../server/api";
import { iInsertProductCategory } from "../../../../../types/types";
import { CardapioDigitalButton } from "../../CardapioDigitalButton";


const newCategoryFormValidationSchema = zod.object({
    productCategory: zod.string(),
});

type NewCategoryFormData = zod.infer<typeof newCategoryFormValidationSchema>;

interface iNewCategoryModalProps {
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
}

export function NewCategoryModal({ modalIsOpen, setModalIsOpen, editCategory, setEditCategory }: iNewCategoryModalProps) {
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
        console.log("Updating category", editCategory.categoryData)
        const productCategory = getValues("productCategory")
        await supabase.from("product_categories").update( {
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
                            className={`h-9 flex flex-1 items-center justify-center hover:bg-green-600 bg-green-300 
                            text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out
                            ${editCategory.isEditing ? 'hover:bg-blue-700 bg-blue-500' : ' hover:bg-green-600 bg-green-300' }
                            `} >
                           { editCategory.isEditing ? 'Editar categoria' : 'Criar nova categoria'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

