import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod"

import { BsCheck2 } from "react-icons/bs";
import { Dispatch, useState } from "react";

import { FiTrash2, FiX } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

import { HiPlus } from "react-icons/hi";
import Image from "next/image";
import { EditableProductActions, removeOptionFromIngredientAction, setAddIngredientAction, setAddNewOption, setUpdateIngredient } from "../../../../../reducers/aditableProduct/actions";
import { IEditableProductReducerData, iPayloadProduct } from "../../../../../reducers/aditableProduct/reducer";
import { CardapioDigitalButton } from "../../CardapioDigitalButton";
import { createIngredientIfIsUpdatingProduct, createProductOptionIfIsUpdatingProduct, deleteIngredientIfIsUpdatingProduct, deleteProductOptionIfIsUpdatingProduct, supabase, updateIngredientName } from "../../../../../server/api";
import { iInsertSelect, iInsertSelects } from "../../../../../types/types";
import { toast } from "react-toastify";


interface iIgradientsCardProps {
    state: IEditableProductReducerData,
    dispatch: Dispatch<{
        type: string,
        payload: iPayloadProduct,
    }>,
    selects: iInsertSelects["data"],
    productId: number
}

const newIngredientFormValidationSchema = zod.object({
    ingredientName: zod.string(),
    updateIngredientName: zod.string(),
    ingredientId: zod.number(),
    optionName: zod.string(),
    optionPicture_url: zod.string(),
});

type NewIngredientFormData = zod.infer<typeof newIngredientFormValidationSchema>;

export function Igredient({ state, dispatch, selects, productId }: iIgradientsCardProps) {

    const [isAddingNewIngradientState, setIsAddingNewIngradientState] = useState(false)
    const [isUpdatingIngradientNameState, setIsUpdatingIngradientNameState] = useState('')
    const [showModalOption, setShowModalOption] = useState('')
    const [error, setError] = useState<'Esse Ingrediente já existe' | ''>('')

    const { register, handleSubmit, reset, setValue, getValues } = useForm<NewIngredientFormData>({
        resolver: zodResolver(newIngredientFormValidationSchema),
        defaultValues: {
            ingredientName: '',
            updateIngredientName: '',
            ingredientId: 0,
            optionName: '',
            optionPicture_url: '',
        },
    });

    // INGREDIENT 
    function setIsAddingNewIngradient(isAddingNewIngradient: boolean) {
        setError('')
        reset()
        setIsAddingNewIngradientState(isAddingNewIngradient)
    }

    async function handleAddNewIngredient(formData: NewIngredientFormData) {

        if (selects.some(select => select.name.toLowerCase() === formData.ingredientName.toLowerCase()) ||
            state.ingredients.some(select => select.name.toLowerCase() === formData.ingredientName.toLowerCase())) {
            setError('Esse Ingrediente já existe')
            return
        }
        if (state.isViewingUpdatingOrAdding === "UPDATING") {
            createIngredientIfIsUpdatingProduct(formData.ingredientName, productId)
        }
        setError('')
        const { data } = await supabase.from("selects").insert({
            name: formData.ingredientName
        }).select("*")

        if (data === null) {
            return
        }

        dispatch(setAddIngredientAction(data[0], []))

        setIsAddingNewIngradientState(false)
    }

    function removeIngredient(ingredientName: string, ingredientId: number) {
        if (state.isViewingUpdatingOrAdding === "UPDATING") {
            deleteIngredientIfIsUpdatingProduct(ingredientId)
        }

        dispatch({
            type: EditableProductActions.REMOVE_INGREDIENT,
            payload: { ingredientName }
        })
    }

    //   //////////////   /////////////    //////////      /////////

    function handleUpdateIngredientName(data: NewIngredientFormData) {
        // const ingredientName = getValues('editIngredientName')

        // const findIngredient = state.ingredients.find(ingredient => ingredient.name.toLowerCase() === data.updateIngredientName.toLowerCase())

        if (state.ingredients.some(ingredient => ingredient.name.toLowerCase() === data.updateIngredientName.toLowerCase())) {
            setError('Esse Ingrediente já existe')
            return
        }

        console.log(data.ingredientId)

        // updateIngredientName(data.ingredientId, data.updateIngredientName)

        // dispatch(setUpdateIngredient(data.updateIngredientName, isUpdatingIngradientNameState))
        setError('')
        setIsUpdatingIngradientNameState('')
    }

    // function setIngredientIdToAddNewOption(ingredientIdToShowModalAddNewOption: string) {
    //     dispatch({
    //         type: EditableProductActions.IS_ADDING_NEW_OPTION_TO_INGREDIENT,
    //         payload: { ingredientIdToShowModalAddNewOption }
    //     })

    // }
    function handleAddNewOptionToIngredient(ingredientId: number) {
        const optionName = getValues('optionName')
        const optionPicture_url = getValues('optionPicture_url')
        reset()

        if (state.isViewingUpdatingOrAdding === "UPDATING") {
            createProductOptionIfIsUpdatingProduct(ingredientId, optionName, optionPicture_url)
        }
        dispatch(setAddNewOption(optionName, optionPicture_url, ingredientId.toString()))
        setShowModalOption('')
    }

    function removeOptionFromIngredient(ingredientId: number, optionName: string, optionId: number) {
        dispatch(removeOptionFromIngredientAction(optionName, `${ingredientId}`))
        if (state.isViewingUpdatingOrAdding === "UPDATING") {
            deleteProductOptionIfIsUpdatingProduct(optionId)
        }
    }


    return (
        <div>
            {state.ingredients.map(ingredient => {
                if (ingredient?.name === '') {
                    return
                }
                return (
                    <div key={ingredient?.id} className="mb-6 relative">
                        <div className="mb-4">

                            {isUpdatingIngradientNameState === ingredient?.name ?
                                <div className="flex items-center gap-3">
                                    <form onSubmit={handleSubmit(handleUpdateIngredientName)} className="w-full">

                                        <div className="w-full flex items-center gap-2">
                                            <input
                                                type="text"
                                                placeholder="Pesquisar"
                                                {...register("updateIngredientName")}
                                                className=" flex flex-1 h-7 pb-1 max-w-64 px-2 
                                                    text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                                    outline-none border border-solid border-gray-300 rounded"
                                            />
                                            <input type="number" hidden value={ingredient.id} {...register("ingredientId", { value: ingredient.id })} />
                                            <button
                                                type="button"
                                                onClick={() => setIsUpdatingIngradientNameState('')}
                                                className="w-11 h-7 flex items-center justify-center rounded hover:scale-110 transition-all ease-in-out bg-yellow-400 ">
                                                <FiX className="text-xl text-white" />
                                            </button>
                                            <button
                                                type="submit"
                                                className="w-11 h-7 flex items-center justify-center rounded hover:scale-110 transition-all ease-in-out bg-blue-500 ">
                                                <BsCheck2 className="text-xl text-white" />
                                            </button>
                                        </div>
                                        <span className="text-xs font-normal text-red-500"> {error === "Esse Ingrediente já existe" ? error : null} </span>
                                    </form>
                                </div> :
                                <div className="w-full flex items-center justify-between" >
                                    <h3> {ingredient?.name}  </h3>
                                    {
                                        state.isViewingUpdatingOrAdding !== "VIEWING" ? (
                                            <div className="flex items-center gap-2">
                                                <BiPencil
                                                    onClick={() => {
                                                        setValue("updateIngredientName", ingredient?.name!)
                                                        setIsUpdatingIngradientNameState(ingredient?.name!)
                                                    }}
                                                    className="text-xl text-blue-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
                                                <FiTrash2
                                                    onClick={() => removeIngredient(ingredient?.name!, ingredient.id!)}
                                                    className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
                                            </div>
                                        ) : null
                                    }
                                </div>
                            }

                        </div>

                        <div className="flex flex-wrap gap-3">

                            {/*        =========   DIALOG TO ADD NEW OPTION   ==============        */}
                            {showModalOption === ingredient?.name && <div className="w-56 h-60 p-4 absolute z-50 top-0 right-1/2 translate-x-1/2 rounded-md bg-white shadow-md">
                                <input type="text" placeholder="Nome" {...register("optionName")}
                                    className="flex flex-1 h-7  w-full px-2text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                        outline-none border border-solid border-gray-300 rounded px-2 mb-5" />
                                <input type="text" placeholder="Link" {...register("optionPicture_url")}
                                    className="flex flex-1 h-7  w-full px-2text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                    outline-none border border-solid border-gray-300 rounded px-2 " />
                                <div className="w-full flex items-center gap-2 mt-6">
                                    <button
                                        onClick={() => setShowModalOption('')}
                                        className={`h-7 flex flex-1 items-center justify-center text-white font-semibold rounded hover:bg-yellow-500 bg-yellow-400  transition-all ease-in-out`}>
                                        Cancelar
                                    </button>
                                    <button
                                        onClick={() => handleAddNewOptionToIngredient(ingredient?.id!)}
                                        className={`h-7 flex flex-1 items-center justify-center text-white font-semibold rounded  hover:bg-green-600 bg-green-300 transition-all ease-in-out`}>
                                        Adicionar
                                    </button>
                                </div>
                            </div>}
                            {/* ========================================================================= */}

                            {state.options.map((option) => {
                                if (option.name === '' || option.picture_url === '' || option === undefined) {
                                    return
                                }
                                if (option.select_id !== ingredient?.id!) {
                                    return
                                }
                                return (
                                    <div key={option.id} className="rounded-lg w-[100px] h-24 flex items-center relative justify-center" >
                                        {
                                            state.isViewingUpdatingOrAdding !== "VIEWING" ? (
                                                <FiTrash2
                                                    onClick={() => removeOptionFromIngredient(ingredient.id!, option.name!, option.id!)}
                                                    className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out
                                                        absolute top-2 right-2 z-30" />
                                            ) : null
                                        }
                                        {option.picture_url &&
                                            <Image
                                                className="w-full h-full rounded-lg"
                                                src={option.picture_url}
                                                alt={option.name}
                                                width={50}
                                                height={50}
                                            />
                                        }
                                        <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000010] to-[#00000000]"></div>
                                        <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium "> {option.name} </span>
                                    </div>
                                )
                            })
                            }
                            {
                                state.isViewingUpdatingOrAdding !== "VIEWING" ? (
                                    <button
                                        onClick={() => setShowModalOption(ingredient.name)}
                                        className="rounded-lg w-[100px] h-24 flex items-center justify-center border border-solid border-gray-400 cursor-pointer" >
                                        <HiPlus className=" text-gray-400 text-4xl" />
                                    </button>
                                ) : null
                            }
                        </div>
                    </div>
                )
            })
            }


            {/*                       Add new ingredient button                             */}
            {
                isAddingNewIngradientState ?
                    <form onSubmit={handleSubmit(handleAddNewIngredient)} className="w-full">
                        <div className="w-full flex items-center">
                            <input
                                type="text"
                                placeholder="Pesquisar"
                                {...register("ingredientName")}
                                className=" flex flex-1 h-7 pb-1 max-w-64 px-2 
                        text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                        outline-none border border-solid border-gray-300 rounded mr-3 pt-1"
                            />

                            <button
                                type="submit" name="update"
                                className="w-11 h-7 flex items-center justify-center rounded hover:scale-110 transition-all ease-in-out bg-blue-500 ">
                                <BsCheck2 className="text-xl text-white" />
                            </button>
                        </div>
                        <span className="text-xs font-normal text-red-500"> {error === "Esse Ingrediente já existe" ? error : null} </span>
                    </form> : null
            }


            {/*                       Add new ingredient button                             */}
            {
                state.isViewingUpdatingOrAdding !== "VIEWING" ? (
                    <div className="w-full flex items-center justify-end mt-6">
                        <CardapioDigitalButton onClick={() => setIsAddingNewIngradient(isAddingNewIngradientState ? false : true)} name={!isAddingNewIngradientState ? 'Adicionar' : 'Cancelar'} h="h-8" w="w-28" />
                    </div>
                ) : null
            }

        </div>
    )
}
