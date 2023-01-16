import Image from "next/image";
import { Dispatch, useReducer, useState } from "react";

import { BiPencil } from "react-icons/bi";
import { BsArrowLeftCircle, BsCheck2 } from "react-icons/bs";
import { EditableProductAction } from "../../../../reducers/aditableProduct/actions";
import { IEditableProductReducerData } from "../../../../reducers/aditableProduct/reducer";

interface IHeadersCardProps {
    state: IEditableProductReducerData,
    dispatch: Dispatch<any>,
}

export default function HeadersCard({ state, dispatch }: IHeadersCardProps) {


    function setProductName(name: string) {
        dispatch({
            type: EditableProductAction.ADD_PRODUCT_NAME,
            payload: { name }
        })
    }
    function setProductDescription(description: string) {
        dispatch({
            type: EditableProductAction.ADD_PRODUCT_DESCRIPTION,
            payload: { description }
        })
    }
    function setProductPrice(price: string) {
        dispatch({
            type: EditableProductAction.ADD_PRODUCT_PRICE,
            payload: { price }
        })
    }
    function setProductPriceIsEditing(isEditingPrice: boolean) {
        dispatch({
            type: EditableProductAction.IS_EDITING_PRICE,
            payload: { isEditingPrice }
        })
    }
    function setProductIsEditing(isEditingName: boolean) {
        dispatch({
            type: EditableProductAction.IS_EDITING_INFORMATION,
            payload: { isEditingName }
        })
    }

    return (
        <>
            {/* <div
            className="absolute bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
            // onClick={() => setShowProduct(false)}
          ></div> */}
            <div
                className={``}
            >
                <div className="sticky">
                    <div className="w-full h-[350px] flex items-center justify-center mb-4">
                        <Image
                            className="rounded-3xl w-full h-full"
                            src="https://i.ibb.co/8KnTRXt/pao.png"
                            alt="backgfroundheader"
                            width={50}
                            height={50}
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between gap-6">
                            <h1
                                hidden={state.isEditingName}
                                className="font-extrabold text-xl text-gray-800 leading-4"> {state.name} </h1>
                            <input type="text" placeholder="Pesquisar"
                                hidden={!state.isEditingName} value={state.name}
                                onChange={(e) => setProductName(e.target.value)}
                                className="h-7 bg-red-50 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded outline-none"
                            />
                            <BiPencil
                                onClick={() => setProductIsEditing(true)}
                                className={`text-lg text-blue-500  cursor-pointer hover:scale-125 hover:transition-all ease-in-out
                            ${state.isEditingName ? "hidden" : ""}
                            `} />
                            <BsCheck2
                                onClick={() => setProductIsEditing(false)}
                                className={`text-lg text-blue-500  cursor-p ointer hover:scale-125 hover:transition-all ease-in-out
                            ${state.isEditingName ? "" : "hidden"}
                            `} />
                        </div>
                        <p hidden={state.isEditingName} className="font-medium text-base leading-5 text-gray-800 mt-1">
                            {state.description}
                        </p>

                        <textarea
                            hidden={!state.isEditingName}
                            value={state.description}
                            onChange={(e) => setProductDescription(e.target.value)}
                            name="" id="" className="w-full bg-red-50 pb-1 px-2 text-gray-600 text-sm font-semibold
                            placeholder:text-gray-400 rounded outline-none mt-1">
                        </textarea>

                        <div className="flex items-center justify-between">
                            <span
                                hidden={state.isEditingPrice}
                                className="font-medium text-sm text-green-300 leading-4"
                            > R$ { state.price } </span>
                            <input type="text" placeholder="Preço"
                                hidden={!state.isEditingPrice} value={state.price}
                                onChange={(e) => setProductPrice(e.target.value)}
                                className="h-7 bg-red-50 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded outline-none"
                            />
                            <BiPencil
                                onClick={() => setProductPriceIsEditing(true)}
                                className={`text-lg text-blue-500  cursor-pointer hover:scale-125 hover:transition-all ease-in-out
                            ${state.isEditingPrice ? "hidden" : ""}
                            `} />
                            <BsCheck2
                                onClick={() => setProductPriceIsEditing(false)}
                                className={`text-lg text-blue-500  cursor-p ointer hover:scale-125 hover:transition-all ease-in-out
                            ${state.isEditingPrice ? "" : "hidden"}
                            `} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
