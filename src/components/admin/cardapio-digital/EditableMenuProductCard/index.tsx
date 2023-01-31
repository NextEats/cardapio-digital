import { Dispatch, SetStateAction } from "react";
import { FiX } from "react-icons/fi";
import { setAddAdditionalAction, setAddIngredientAction, setCategoryAction, setIsViewingAddingOrOpdatingProductAction } from "../../../../reducers/aditableProduct/actions";
import { IEditableProductReducerData, iPayloadProduct } from "../../../../reducers/aditableProduct/reducer";
import { supabase } from "../../../../server/api";
import { iInsertAdditionals, iInsertProductCategories, iInsertProductOptions, iInsertSelects, iProduct } from "../../../../types/types";
import { CardapioDigitalButton } from "../CardapioDigitalButton";
import { Additional } from "./Additional";
import HeadersCard from "./HeadersCard";
import { Igredient } from "./Ingredients";
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { IoIosArrowDown } from "react-icons/io"
import { BsArrowLeftCircle } from "react-icons/bs";

interface iEditableMenuProductCardProps {
    state: IEditableProductReducerData,
    dispatch: Dispatch<{
        type: string,
        payload: iPayloadProduct,
    }>,
    setProductModal: Dispatch<SetStateAction<boolean>>,
    productModal: boolean
    selects: iInsertSelects["data"],
    productOptions: iInsertProductOptions["data"],
    additionals: iInsertAdditionals["data"],
    productCategories: iInsertProductCategories["data"]
}

export default function EditableMenuProductCard({ state, dispatch, setProductModal, productModal, selects, productCategories, productOptions, additionals }: iEditableMenuProductCardProps) {

    function setIngredientSelected(selectId: number) {
        const selectFinded = selects.find(select => select.id === Number(selectId));
        const optionsFilteredBySelectId = productOptions.filter(option => option.select_id === selectFinded?.id)
        dispatch(setAddIngredientAction(selectFinded!, optionsFilteredBySelectId))
    }

    function setAdditionalSelected(additionalId: number) {
        const additional = additionals.find(additional => additional.id === additionalId)
        if (!additional) {
            return
        }
        dispatch(setAddAdditionalAction(additional!))
    }

    function setCategorySelected(categoryId: number) {
        const categoryFinded = productCategories.find(c => c.id === categoryId)
        if (!categoryFinded) {
            return
        }
        dispatch(setCategoryAction(categoryFinded!))
    }

    async function handleCreateProduct() {
        const { data } = await supabase.from("products").insert({
            category_id: state.category.id!,
            description: state.productInformation.description,
            name: state.productInformation.name,
            picture_url: state.picture_url,
            price: Number(state.productInformation.price),
        }).select("*")

        if (data === null) {
            return
        }
        // let additionalsStatus  
        postAdditionalToSupabase(data[0])

        // if (additionalsStatus === 400) {
        //     return
        // }

        state.ingredients.forEach(async (ingredient) => {
            if (ingredient?.name === '') {
                return
            }
            const productSelectaData = await supabase.from("product_selects").insert({
                select_id: ingredient?.id,
                product_id: data[0].id,
            }).select("*")
        })

        postOptionToSupabase()
    }

    async function postOptionToSupabase() {
        state.options.forEach(async (option) => {
            if (option.name === '' || productOptions.some(op => op.name === option.name)) {
                return
            }
            const optionData = await supabase.from("product_options").insert({
                name: option.name,
                picture_url: option.picture_url,
                select_id: option.select_id
            }).select("*")
        })
    }

    async function postAdditionalToSupabase(prodductData: iProduct["data"]) {
        if (state.additionals.length > 0) {
            return
        }
        state.additionals.forEach(async (additional) => {
            if (additional.name === '') {
                return
            }
            if (additionals.some((additionalValidate) => additionalValidate.name === additional.name)) {
                const { status } = await supabase.from("product_additionals").insert({
                    additional_id: additional.id!,
                    product_id: prodductData.id
                }).select("*")
            } else {
                const { status, data } = await supabase.from("additionals").insert({
                    name: additional.name,
                    picture_url: additional.picture_url,
                    price: additional.price,
                }).select("*")
                if (status === 400 || data === null) {
                    return
                }
                const { } = await supabase.from("product_additionals").insert({
                    additional_id: data[0]?.id!,
                    product_id: prodductData.id
                }).select("*")
            }
        })
    }

    return (
        <>
            <div
                className={`fixed inset-0 bg-black w-screen h-screen opacity-60 z-20 cursor-pointer ${productModal ? 'opacity-40' : 'opacity-0 pointer-events-none'} `}
                onClick={() => { setProductModal(false) }}
            ></div>
            <div className={`w-[360px] md:w-[420px] 2xl:w-[468px] fixed ${productModal ? 'right-0' : 'right-[-700px]'} transition-all ease-out z-30 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] overflow-auto p-4`}>
                <div className="flex flex-1 items-center justify-between pb-6">
                    <BsArrowLeftCircle
                        onClick={() => setProductModal(false)}
                        className="text-3xl text-gray-600 cursor-pointer hover:scale-110 hover:transition-all ease-in-out" />
                    {
                        state.isViewingUpdatingOrAdding === "VIEWING" ? (
                            <CardapioDigitalButton name="Editar" h="h-8" w="w-28" onClick={() => dispatch(setIsViewingAddingOrOpdatingProductAction("UPDATING"))} />
                        ) : null
                    }
                </div>

                <HeadersCard state={state} dispatch={dispatch} />

                {
                    state.isViewingUpdatingOrAdding !== "VIEWING" ? (
                        <NavigationMenu.Root className="w-full h-10 relative shadow-sm bg-white mb-4 ">
                            <NavigationMenu.List className="flex h-full flex-1 items-center justify-around p-1">

                                <NavigationMenu.Item className="h-full flex flex-1 flex-col">
                                    <NavigationMenu.Trigger className="h-full flex flex-1 gap-2 items-center justify-center rounded hover:bg-gray-200">
                                        Categorias <IoIosArrowDown className="hover:rotate-180" />
                                    </NavigationMenu.Trigger>
                                    <NavigationMenu.Content className="flex flex-1 w-auto p-1 rounded-md flex-wrap absolut top-0 left-0 bg-white shadow-md">
                                        {productCategories.map(category => {
                                            return <NavigationMenu.List key={category.id}
                                                onClick={() => setCategorySelected(category.id!)}
                                                className=" px-2 py-1 cursor-pointer hover:bg-violet-200 rounded  " >
                                                {category.name}
                                            </NavigationMenu.List>
                                        })}
                                    </NavigationMenu.Content>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item className="h-full flex flex-1 flex-col">
                                    <NavigationMenu.Trigger className="h-full flex flex-1 gap-2 items-center justify-center rounded hover:bg-gray-200">
                                        Ingredients <IoIosArrowDown className="hover:rotate-180" />
                                    </NavigationMenu.Trigger>
                                    <NavigationMenu.Content className="flex flex-1 w-auto p-1 rounded-md flex-wrap absolut top-0 left-0 bg-white shadow-md">
                                        {selects.map(select => {
                                            return <NavigationMenu.List title={select.name}
                                                onClick={() => setIngredientSelected(select.id!)}
                                                key={select.id} className="px-2 py-1 cursor-pointer hover:bg-violet-200 rounded ">
                                                {select.name}
                                            </NavigationMenu.List>
                                        })}
                                    </NavigationMenu.Content>
                                </NavigationMenu.Item>

                                <NavigationMenu.Item className="h-full flex flex-1 flex-col">
                                    <NavigationMenu.Trigger className="h-full flex flex-1 gap-2 items-center justify-center rounded hover:bg-gray-200">
                                        Adicinais <IoIosArrowDown className="hover:rotate-180" />
                                    </NavigationMenu.Trigger>
                                    <NavigationMenu.Content className="flex flex-1 w-auto p-1 rounded-md flex-wrap absolut top-0 left-0 z-50 bg-white shadow-md">
                                        {
                                            additionals.map(additional => {
                                                return <NavigationMenu.List
                                                    onClick={() => setAdditionalSelected(additional.id!)}
                                                    key={additional.id} className="px-2 py-1 cursor-pointer hover:bg-violet-200 rounded ">
                                                    {additional.name}
                                                </NavigationMenu.List>
                                            })

                                        }
                                    </NavigationMenu.Content>
                                </NavigationMenu.Item>


                                <NavigationMenu.Indicator className="h-[10px] top-full transition-all ease-in-out duration-300 overflow-hidden flex items-end justify-center">
                                    <div className="relative top-[70%] bg-white w-[10px] h-[10px] rotate-[45deg] rounded-tl-sm" />
                                </NavigationMenu.Indicator>
                            </NavigationMenu.List>

                            <div className="">
                                <NavigationMenu.Viewport className="" />
                            </div>
                        </NavigationMenu.Root>
                    ) : null
                }

                <h2>{!state.category ? 'Selecione uma categoria' : `${state.category.name}`}</h2>

                <Igredient state={state} selects={selects} dispatch={dispatch} />

                <Additional state={state} dispatch={dispatch} />

                {state.isViewingUpdatingOrAdding === "ADDING" &&
                    <CardapioDigitalButton onClick={() => handleCreateProduct()}
                        disabled={!state.productInformation.name || !state.productInformation.description || !state.productInformation.price || !state.picture_url}
                        name='Adicionar novo item' h="h-10" w="w-full" />
                }
                {state.isViewingUpdatingOrAdding === "UPDATING" &&
                    <div className="flex flex-1 gap-2">
                        <CardapioDigitalButton onClick={() => dispatch(setIsViewingAddingOrOpdatingProductAction("VIEWING"))}
                            disabled={!state.productInformation.name || !state.productInformation.description || !state.productInformation.price || !state.picture_url}
                            name='Cancelar' h="h-10" w="w-full" />
                        <CardapioDigitalButton onClick={() => console.log("Faça a edição do produto!")}
                            disabled={!state.productInformation.name || !state.productInformation.description || !state.productInformation.price || !state.picture_url}
                            name='Editar' h="h-10" w="w-full" />
                    </div>
                }

            </div>
        </>
    )
}

