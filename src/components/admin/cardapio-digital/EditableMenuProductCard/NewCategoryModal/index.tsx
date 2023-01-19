import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { supabase } from "../../../../../server/api";
import { CardapioDigitalButton } from "../../CardapioDigitalButton";


const newCategoryFormValidationSchema = zod.object({
    productCategory: zod.string(),
});

type NewCategoryFormData = zod.infer<typeof newCategoryFormValidationSchema>;

interface iNewCategoryModalProps {
    modalIsOpen: boolean,
    setModalIsOpen: Dispatch<SetStateAction<boolean>>,
}

export function NewCategoryModal({ modalIsOpen, setModalIsOpen }: iNewCategoryModalProps) {
    const { register, reset, getValues, handleSubmit } = useForm<NewCategoryFormData>({
        resolver: zodResolver(newCategoryFormValidationSchema),
        defaultValues: {
            productCategory: '',
        },
    });

    async function handleNewCategory(data: NewCategoryFormData) {
        await supabase.from("product_categories").insert({
            name: data.productCategory,
            restaurant_id: 3
        })
        reset()
        setModalIsOpen(false)
    }

    function cancel() {
        reset()
        setModalIsOpen(false)
    }

    return (
        <>
             <>
                    <div className={`w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10
                    ${modalIsOpen ? 'opacity-40 transition-all duration-300 ease-in-out' : ' opacity-0 pointer-events-none duration-[0s]'}
                    `}></div>
                    <div className={`fixed top-1/3 right-1/3 z-20 rounded-lg w-[350px] sm:w-[500px] h-[] bg-white shadow-md p-6
                    ${modalIsOpen ? 'opacity-100 transition-all duration-300 ease-in-out' : ' opacity-0 pointer-events-none duration-[0s]'}
                    `} >
                        <form className="w-full" onSubmit={handleSubmit(handleNewCategory)}>
                            <h2 className="text-base w-full text-center font-semibold mb-6">Nova categoria</h2>

                            <input type="text" {...register("productCategory")} placeholder="Dê um nome para a categoria"
                                className="w-full h-9 rounded text-base font-medium text-gray-600 placeholder:text-gray-400 outline-none border border-gray-400 px-2 mb-10 "
                            />

                            <div className="flex flex-1 items-center gap-3" >
                                <button
                                    onClick={() => cancel()}
                                    className="h-9 flex flex-1 items-center justify-center hover:bg-yellow-500 bg-yellow-400 text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out" >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="h-9 flex flex-1 items-center justify-center hover:bg-green-600 bg-green-300 text-white font-semibold cursor-pointer duration-300 rounded transition-all ease-in-out" >
                                    Criar nova categoria
                                </button>
                            </div>
                        </form>
                    </div>
                </> 

        </>
    )
}

