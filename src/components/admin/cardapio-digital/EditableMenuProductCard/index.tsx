import { Dispatch, SetStateAction, useReducer } from "react";
import { FiX } from "react-icons/fi";
import { setAddIngredientAction } from "../../../../reducers/aditableProduct/actions";
import { editableProductReducer, IEditableProductReducerData, iPayloadProduct } from "../../../../reducers/aditableProduct/reducer";
import { iInsertProductOptions, iInsertProductSelects, iInsertSelect, iInsertSelects } from "../../../../types/types";
import { CardapioDigitalButton } from "../CardapioDigitalButton";
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
    selects: iInsertSelects["data"]
    productOptions: iInsertProductOptions["data"],
}

export default function EditableMenuProductCard({ state, dispatch, setProductModal, productModal, selects, productOptions }: iEditableMenuProductCardProps) {

    function setIngredientSelected(selectName: string) {
        if( selectName === "Selecione"){
            return
        }
        const selectFinded = selects.find(select => select.name === selectName);
        const optionsFilteredBySelectId = productOptions.filter(option => option.select_id === selectFinded?.id)
        dispatch(setAddIngredientAction(selectName, optionsFilteredBySelectId))
        console.log('eee')
    }

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

                <select 
                        onChange={(e) => setIngredientSelected(e.target.value)}
                        className="w-full h-8 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded-sm shadow-sm hover:shadow-md cursor-pointer outline-none">
                    <option value="Selecione"> Selecione</option>
                    {
                        selects?.map(select => {
                            if(state.ingredients.some((ingredient) => ingredient.name === select.name)) {
                                return
                            }
                            return <option key={select.id}  value={select.name}>{ select.name }</option>
                        })
                    }
                </select>

                <Igredient state={state} dispatch={dispatch} />
                <Additional state={state} dispatch={dispatch} />

                <CardapioDigitalButton disabled={!state.productInformation.name} name='Adicionar novo item' h="h-10" w="w-full" />
            </div>
        </>
    )
}