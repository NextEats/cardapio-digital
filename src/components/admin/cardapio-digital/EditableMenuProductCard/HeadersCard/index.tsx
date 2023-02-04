import Image from "next/image";
import { useForm } from "react-hook-form";
import { Dispatch, useEffect, useState } from "react";
import * as zod from "zod"


import { BiPencil } from "react-icons/bi";
import { BsCheck2 } from "react-icons/bs";
import { zodResolver } from "@hookform/resolvers/zod";
import { HiPlus } from "react-icons/hi";
import { EditableProductActions } from "../../../../../reducers/aditableProduct/actions";
import { IEditableProductReducerData, iPayloadProduct } from "../../../../../reducers/aditableProduct/reducer";

interface IHeadersCardProps {
    state: IEditableProductReducerData,
    dispatch: Dispatch<{
        type: string,
        payload: iPayloadProduct,
    }>,
}

const newInformationFormValidationSchema = zod.object({
    name: zod.string(),
    description: zod.string(),
    price: zod.string()
});
type NewInformationFormData = zod.infer<typeof newInformationFormValidationSchema>;

export default function HeadersCard({ state, dispatch }: IHeadersCardProps) {

    const { register, handleSubmit } = useForm<NewInformationFormData>({
        resolver: zodResolver(newInformationFormValidationSchema),
        defaultValues: {
            name: "",
            description: "",
            price: "",
        },
    });

    function setProductIsEditing(isEditingInfo: boolean) {
        dispatch({
            type: EditableProductActions.IS_EDITING_INFORMATION,
            payload: { isEditingInfo }
        })
    }

    function handleEditInfrmation(data: NewInformationFormData) {
        if (data.name === '' || data.description === '' || data.price === '') {
            return
        }
        dispatch({
            type: EditableProductActions.SET_PRODUCT_INFORMATION,
            payload: {
                productInformation: {
                    description: data.description,
                    price: data.price,
                    name: data.name
                },
            }
        })
        setProductIsEditing(false)
    }

    return (
        <>
            <div className={`mb-10`} >
                <ProductImage state={state} dispatch={dispatch} />
                <form onSubmit={handleSubmit(handleEditInfrmation)}>
                    <div className="flex items-center justify-between gap-6">
                        <h1
                            hidden={state.isEditingInfo}
                            className="font-extrabold text-xl text-gray-800 leading-4"> {state.productInformation.name} </h1>
                        <input type="text" placeholder="Pesquisar"
                            hidden={!state.isEditingInfo} {...register("name", { required: true })}
                            className="h-7 bg-red-50 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded outline-none"
                        />
                        {
                            state.isViewingUpdatingOrAdding !== "VIEWING" ? (
                                <BiPencil
                                    onClick={() => setProductIsEditing(true)}
                                    className={`text-2xl text-blue-500  cursor-pointer hover:scale-125 hover:transition-all ease-in-out
                            ${state.isEditingInfo ? "hidden" : ""}
                            `} />
                            ) : null
                        }
                        <button type="submit" className={`${state.isEditingInfo ? "" : "hidden"} `} >
                            <BsCheck2
                                className={`text-2xl text-blue-500  cursor-p ointer hover:scale-125 hover:transition-all ease-in-out
                                ${state.isEditingInfo ? "" : "hidden"}
                                `} />
                        </button>
                    </div>
                    <p hidden={state.isEditingInfo} className="font-medium text-base leading-5 text-gray-800 mt-1">
                        {state.productInformation.description}
                    </p>

                    <input type="text" placeholder="Descrição"
                        hidden={!state.isEditingInfo} {...register("description")}
                        className="w-full h-10 bg-red-50 pb-1 px-2 text-gray-600 text-sm font-semibold
                                placeholder:text-gray-400 rounded outline-none mt-1 whitespace-pre-line"
                    />
                    <div className="flex items-center justify-between mt-1">
                        <span
                            hidden={state.isEditingInfo}
                            className="font-medium text-sm text-green-300 leading-4"
                        > R$ {state.productInformation.price} </span>
                        <input type="text" placeholder="Preço"
                            hidden={!state.isEditingInfo}
                            {...register("price")}
                            className="h-7 bg-red-50 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded outline-none"
                        />

                    </div>
                </form>
            </div>
        </>
    );
}

interface iProductImagePros {
    state: IEditableProductReducerData,
    dispatch: Dispatch<any>,
}

const newPictureUrlFormValidationSchema = zod.object({
    picture_url: zod.string()
});

type NewPirtureUrlFormData = zod.infer<typeof newPictureUrlFormValidationSchema>;

function ProductImage({ state, dispatch }: iProductImagePros) {

    const [productPictureIsEditing, setProductPictureIsEditing] = useState(true)
    const { register, handleSubmit, watch } = useForm<NewPirtureUrlFormData>({
        resolver: zodResolver(newPictureUrlFormValidationSchema),
        defaultValues: { picture_url: '' },
    });

    useEffect(() => {
        if (state.isViewingUpdatingOrAdding === "VIEWING") setProductPictureIsEditing(false)
    }, [state.isViewingUpdatingOrAdding])

    function handleProductPicture_url(data: NewPirtureUrlFormData) {
        if (watch("picture_url") === '') {
            return
        }
        dispatch({
            type: EditableProductActions.SET_PICTURE_URL,
            payload: { picture_url: data.picture_url }
        })
        setProductPictureIsEditing(false)
    }
    console.log(state.isViewingUpdatingOrAdding)

    return (
        <form onSubmit={handleSubmit(handleProductPicture_url)} className="w-full relative mb-4">

            {state.picture_url === '' || productPictureIsEditing === true ? <div
                className={` flex flex-1 w-[305px] items-center justify-center bg-white h-9 px-2 rounded-md  absolute top-3 right-3 z-10`}>
                <input
                    type="text"
                    placeholder="Pesquisar"
                    {...register("picture_url")}
                    className=" flex flex-1 h-6 pb-1 max-w-64 px-2 
                    text-gray-600 text-sm font-semibold placeholder:text-gray-500 
                    outline-none border border-solid border-gray-400 rounded-tl-md rounded-bl-md"
                />
                <button
                    type="submit"
                    className="w-7 h-6 flex items-center justify-center rounded-tr-md rounded-br-md hover:scale-110 transition-all ease-in-out bg-green-300 ">
                    <BsCheck2 className="text-base text-white" />
                </button>
            </div> : null}

            {
                state.isViewingUpdatingOrAdding !== "VIEWING" &&
                <BiPencil
                    onClick={() => setProductPictureIsEditing(true)}
                    className={`text-2xl text-blue-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out absolute top-3 right-3 z-10
                                ${productPictureIsEditing ? 'hidden' : ''}`}
                />
            }
            {state.picture_url === '' && <div
                className="rounded-2xl w-full h-[400px] flex items-center justify-center border border-solid border-gray-400">
                <HiPlus className=" text-gray-400 text-9xl font-light" />
            </div>}
            {state.picture_url !== '' && <Image
                className="rounded-2xl w-full"
                src={state.picture_url}
                alt=""
                width={500}
                height={500}
            />}
        </form>
    )
}