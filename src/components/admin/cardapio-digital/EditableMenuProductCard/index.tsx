import { Dispatch, SetStateAction, useReducer } from "react";
import { FiX } from "react-icons/fi";
import { editableProductReducer, IEditableProductReducerData, iPayloadProduct } from "../../../../reducers/aditableProduct/reducer";
import { Additional } from "./Additional";
import HeadersCard from "./HeadersCard";
import { Igredient } from "./Ingredients";

interface iEditableMenuProductCardProps {
    state: IEditableProductReducerData,
    dispatch: Dispatch<{
        type: string,
        payload: iPayloadProduct,
    }>,
    setProductModal: Dispatch<SetStateAction<boolean>>,
    productModal: boolean
}

export default function EditableMenuProductCard({ state, dispatch, setProductModal, productModal }: iEditableMenuProductCardProps) {
    return (
        <>
            <div
                className={`fixed inset-0 bg-black w-screen h-screen opacity-60 z-20 cursor-pointer ${productModal ? 'opacity-40' : 'opacity-0 pointer-events-none'} `}
                onClick={() => { setProductModal(false) }}
            ></div>
            <div className={`w-[360px] md:w-[420px] 2xl:w-[468px] fixed ${productModal ? 'right-0' : 'right-[-700px]'} transition-all ease-out z-30 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] overflow-auto p-4`}>
                <div className="flex flex-1 items-center justify-end pb-2">
                    <FiX
                        onClick={() => setProductModal(false)}
                        className="text-3xl text-red-500 cursor-pointer hover:scale-125 hover:transition-all ease-in-out" />
                </div>

                <HeadersCard state={state} dispatch={dispatch} />
                <Igredient state={state} dispatch={dispatch} />
                <Additional state={state} dispatch={dispatch} />
                <button
                    disabled={!state.productInformation.name}
                    className={`h-10 w-full flex items-center justify-center text-lg text-white font-semibold rounded-md transition-all ease-in-out
                        duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-green-600 bg-green-300 cursor-pointer `}>
                    Adicionar novo item
                </button>
            </div>
        </>
    )
}