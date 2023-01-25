import { Dispatch, SetStateAction, useReducer } from "react";
import { FiX } from "react-icons/fi";
import { number } from "zod";
import { setAddAdditionalAction, setAddIngredientAction, setCategoryAction } from "../../../../reducers/aditableProduct/actions";
import { IEditableProductReducerData, iPayloadProduct } from "../../../../reducers/aditableProduct/reducer";
import { supabase } from "../../../../server/api";
import { iInsertAdditionals, iInsertProductCategories, iInsertProductOptions, iInsertProductSelects, iInsertSelect, iInsertSelects } from "../../../../types/types";
import { CardapioDigitalButton } from "../CardapioDigitalButton";
import Categories from "../Categories";
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
    additionals: iInsertAdditionals["data"],
    productCategories: iInsertProductCategories["data"]
}

export default function EditableMenuProductCard({ state, dispatch, setProductModal, productModal, selects, productCategories, productOptions, additionals }: iEditableMenuProductCardProps) {

    function setIngredientSelected(selectName: string) {
        if( selectName === "Selecione"){
            return
        }
        const selectFinded = selects.find(select => select.name === selectName);
        const optionsFilteredBySelectId = productOptions.filter(option => option.select_id === selectFinded?.id)
        dispatch(setAddIngredientAction(selectName, optionsFilteredBySelectId))
        console.log('eee')
    }

    function setAdditionalSelected(additionalId: string) {
        if( additionalId === "Selecione"){
            return
        }
        const additional = additionals.find( additional =>  additional.id === Number(additionalId))
        if(!additional ){
            return
        }
        dispatch(setAddAdditionalAction(additional!))
    }

    

    function setCreateProduct(categoryId: string) {

        const categoryFinded = productCategories.find(c => c.id === Number(categoryId))
        if (!categoryFinded) {
            return
        }
        dispatch(setCategoryAction(categoryFinded!))
    }
    async function handleCreateProduct() {
        console.log('data')
        const { data, error, status } = await supabase.from("products").insert({
            category_id: state.category.id!,
            description: state.productInformation.description,
            name: state.productInformation.name,
            picture_url: state.picture_url,
            price: Number(state.productInformation.price),
        }).select("*")
        console.log(data, error, status)
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
                        onChange={(e) => setCreateProduct(e.target.value)}
                        className="w-full h-8 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded-sm shadow-sm hover:shadow-md cursor-pointer outline-none">
                    <option value="Selecione"> Selecione</option>
                    {
                        productCategories?.map(category => {
                            return <option key={category.id}  value={category.id}>{ category.name }</option>
                        })
                    }
                </select>

                <h2>{ !state.category ? 'Selecione uma categoria' : `${state.category.name}`}</h2>

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

                <select 
                        onChange={(e) => setAdditionalSelected(e.target.value)}
                        className="w-full h-8 pb-1 felx flex-1 px-2 text-gray-600 text-sm font-semibold
                                 placeholder:text-gray-400 rounded-sm shadow-sm hover:shadow-md cursor-pointer outline-none">
                    <option value="Selecione"> Selecione</option>
                    {
                        additionals?.map((additional) => {
                            if(state.additionals.some((additionalState) => additionalState.name === additional.name)) {
                                return
                            }
                            return <option key={additional.id}  value={`${additional.id}`}>{ additional.name }</option>
                        })
                    }
                </select>
                <Additional state={state} dispatch={dispatch} />

                    <button onClick={() => handleCreateProduct()}>
                    SDFSDFSD
                {/* <CardapioDigitalButton 
                // onClick={() => handleCreateProduct}
                disabled={!state.productInformation.name} 
                name='Adicionar novo item' h="h-10" w="w-full" /> */}
                </button>
            </div>
        </>
    )
}