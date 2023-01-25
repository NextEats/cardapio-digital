import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod"

import { BsCheck2 } from "react-icons/bs";
import { Dispatch, useState } from "react";

import { FiTrash2 } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";

import { HiPlus } from "react-icons/hi";
import Image from "next/image";
import { EditableProductActions } from "../../../../../reducers/aditableProduct/actions";
import { IEditableProductReducerData, iPayloadProduct } from "../../../../../reducers/aditableProduct/reducer";
import { CardapioDigitalButton } from "../../CardapioDigitalButton";


interface iIgradientsCardProps {
    state: IEditableProductReducerData,
    dispatch: Dispatch<{
        type: string,
        payload: iPayloadProduct,
    }>,
}

const newIngredientFormValidationSchema = zod.object({
    ingredientName: zod.string(),
    editIngredientName: zod.string(),
    optionName: zod.string(),
    optionPicture_url: zod.string(),
});

type NewIngredientFormData = zod.infer<typeof newIngredientFormValidationSchema>;

export function Igredient({ state, dispatch }: iIgradientsCardProps) {

    const [isAddingNewIngradientState, setIsAddingNewIngradientState] = useState(false)
    const [isUpdatingIngradientNameState, setIsUpdatingIngradientNameState] = useState('')

    const { register, handleSubmit, reset, getValues } = useForm<NewIngredientFormData>({
        resolver: zodResolver(newIngredientFormValidationSchema),
        defaultValues: {
            ingredientName: '',
            editIngredientName: '',
            optionName: '',
            optionPicture_url: '',
        },
    });

    // INGREDIENT 
    function setIsAddingNewIngradient(isAddingNewIngradient: boolean) {
        reset()
        setIsAddingNewIngradientState(isAddingNewIngradient)
    }

    function handleAddNewIngredient(data: NewIngredientFormData) {
        const id = Math.random().toString(36)
        dispatch({
            type: EditableProductActions.ADD_NEW_INGREDIENT,
            payload: {
                ingredientId: id,
                ingredientName: data.ingredientName,
            }
        })
        setIsAddingNewIngradientState(false)
    }

    function removeIngredient(ingredientName: string) {
        dispatch({
            type: EditableProductActions.REMOVE_INGREDIENT,
            payload: { ingredientName }
        })
    }

    //   //////////////   /////////////    //////////      /////////


    function handleUpdateIngredientName(data: NewIngredientFormData) {
        // const ingredientName = getValues('editIngredientName')
        const nameAlreadyExists = state.ingredients.some(ingredient => ingredient.name === data.editIngredientName)
        if (nameAlreadyExists) {
            return
        }
        dispatch({
            type: EditableProductActions.UPDATE_INGREDIENT_NAME,
            payload: { ingredientName: data.editIngredientName }
        })
        setIsUpdatingIngradientNameState('')
    }

    // function setIngredientIdToAddNewOption(ingredientIdToShowModalAddNewOption: string) {
    //     dispatch({
    //         type: EditableProductActions.IS_ADDING_NEW_OPTION_TO_INGREDIENT,
    //         payload: { ingredientIdToShowModalAddNewOption }
    //     })

    // }
    // function handleAddNewOptionToIngredient(ingredientIdToAddNewOption: string) {
    //     const optionName = getValues('optionName')
    //     const optionPicture_url = getValues('optionPicture_url')
    //     const id = Math.random().toString(26)
    //     dispatch({
    //         type: EditableProductActions.ADD_NEW_OPTION_TO_INGREDIENT,
    //         payload: { 
    //             ingredientIdToAddNewOption,
    //             optionName,
    //             optionPicture_url,
    //         }
    //     })
    //     setIngredientIdToAddNewOption('')
    // }

    function removeOptionFromIngredient(ingredientId: string, optionId: string) {
        dispatch({
            type: EditableProductActions.REMOVE_OPTION_FROM_INGREDIENT,
            payload: {
                ingredientId,
            }
        })

    }


    return (
        <div>
            {state.ingredients.map(ingredient => {
                if (ingredient.name === '') {
                    return
                }
                return (
                    <div key={ingredient.id} className="mb-6 relative">
                        <div className="mb-4">

                            {isUpdatingIngradientNameState === ingredient.name ?
                                <form onSubmit={handleSubmit(handleUpdateIngredientName)} className="w-full flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Pesquisar"
                                        {...register("editIngredientName")}
                                        className=" flex flex-1 h-7 pb-1 max-w-64 px-2 
                                        text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                        outline-none border border-solid border-gray-300 rounded mr-3"
                                    />
                                    <button
                                        type="submit"
                                        className="w-11 h-7 flex items-center justify-center rounded hover:scale-110 transition-all ease-in-out bg-blue-500 ">
                                        <BsCheck2 className="text-xl text-white" />
                                    </button>
                                </form> :
                                <div className="w-full flex items-center justify-between" >
                                    <h3> {ingredient.name}  </h3>
                                    <div className="flex items-center gap-2">
                                        <BiPencil
                                            onClick={() => setIsUpdatingIngradientNameState(ingredient.name!)}
                                            className="text-xl text-blue-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
                                        <FiTrash2
                                            onClick={() => removeIngredient(ingredient.name!)}
                                            className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
                                    </div>
                                </div>
                            }

                        </div>

                        <div className="flex flex-wrap gap-3">
                            {/*        =========   DIALOG TO ADD NEW OPTION   ==============        */}
                            {/* { state.ingredientIdToShowModalAddNewOption === ingredient.id && <div className="w-56 h-60 p-4 absolute z-50 top-0 right-1/2 translate-x-1/2 rounded-md bg-white shadow-md">
                                    <input type="text" placeholder="Nome" { ...register("optionName")} 
                                    className="flex flex-1 h-7  w-full px-2text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                        outline-none border border-solid border-gray-300 rounded px-2 mb-5" />
                                    <input type="text" placeholder="Link" { ...register("optionPicture_url")}
                                    className="flex flex-1 h-7  w-full px-2text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                                    outline-none border border-solid border-gray-300 rounded px-2 " />
                                    <div className="w-full flex items-center gap-2 mt-6">
                                        <button
                                            onClick={() => setIngredientIdToAddNewOption('')}
                                            className={`h-7 flex flex-1 items-center justify-center text-white font-semibold rounded hover:bg-yellow-500 bg-yellow-400  transition-all ease-in-out`}>
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={() => handleAddNewOptionToIngredient(ingredient.id!)}
                                            className={`h-7 flex flex-1 items-center justify-center text-white font-semibold rounded  hover:bg-green-600 bg-green-300 transition-all ease-in-out`}>
                                            Adicionar
                                        </button>
                                    </div>
                                </div>} */}
                            {/* ========================================================================= */}
                            {state.options.map((option) => {
                                if(option.name === '' || option.picture_url === '') {
                                    return
                                }
                                return (
                                    <div key={option.id} className="rounded-lg w-[100px] h-24 flex items-center relative justify-center" >
                                        <FiTrash2
                                            onClick={() => removeOptionFromIngredient(ingredient.id!.toString(), option.id!.toString())}
                                            className="text-xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out
                                                absolute top-2 right-2 z-30" />
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
                            <button
                                // onClick={() => {setIngredientIdToAddNewOption(ingredient.id)}}
                                className="rounded-lg w-[100px] h-24 flex items-center justify-center border border-solid border-gray-400 cursor-pointer" >
                                <HiPlus className=" text-gray-400 text-4xl" />
                            </button>
                        </div>
                    </div>
                )
            })
            }

            {
                isAddingNewIngradientState ?
                    <form onSubmit={handleSubmit(handleAddNewIngredient)} className="w-full flex items-center">
                        <input
                            type="text"
                            placeholder="Pesquisar"
                            {...register("ingredientName")}
                            className=" flex flex-1 h-7 pb-1 max-w-64 px-2 
                        text-gray-700 text-sm font-semibold placeholder:text-gray-500 
                        outline-none border border-solid border-gray-300 rounded mr-3 pt-1"
                        />
                        <button
                            type="submit"
                            className="w-11 h-7 flex items-center justify-center rounded hover:scale-110 transition-all ease-in-out bg-blue-500 ">
                            <BsCheck2 className="text-xl text-white" />
                        </button>
                    </form> : null
            }


            {/*                       Add new ingredient button                             */}
            <div className="w-full flex items-center justify-end mt-6">
                <CardapioDigitalButton onClick={() => setIsAddingNewIngradient(isAddingNewIngradientState ? false : true)} name={!isAddingNewIngradientState ? 'Adicionar' : 'Cancelar'} h="h-8" w="w-28" />
            </div>
        </div>
    )
}
