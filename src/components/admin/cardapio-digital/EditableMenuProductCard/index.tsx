import { Dispatch, SetStateAction, useRef, useState } from "react";
import {
  setAddAdditionalAction,
  setAddIngredientAction,
  setCategoryAction,
  setIsViewingAddingOrOpdatingProductAction,
} from "../../../../reducers/aditableProduct/actions";
import {
  IEditableProductReducerData,
  iPayloadProduct,
} from "../../../../reducers/aditableProduct/reducer";
import { createProduct, createProductAdditionalsIfIsUpdatingProduct, createProductSelectIfIsUpdatingProduct, deleteProduct, supabase, updateProduct } from "../../../../server/api";
import {
  iInsertAdditionals,
  iInsertProductCategories,
  iInsertProductOptions,
  iInsertSelects,
  iProduct,
} from "../../../../types/types";
import { CardapioDigitalButton } from "../CardapioDigitalButton";
import { Additional } from "./Additional";
import HeadersCard from "./HeadersCard";
import { Igredient } from "./Ingredients";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { IoIosArrowDown } from "react-icons/io";
import { BsArrowLeftCircle } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface iEditableMenuProductCardProps {
  state: IEditableProductReducerData;
  dispatch: Dispatch<{
    type: string;
    payload: iPayloadProduct;
  }>;
  productId: number | null,
  setProductModal: Dispatch<SetStateAction<boolean>>;
  productModal: boolean;
  selects: iInsertSelects["data"];
  productOptions: iInsertProductOptions["data"];
  additionals: iInsertAdditionals["data"];
  productCategories: iInsertProductCategories["data"];
}

export default function EditableMenuProductCard({
  state,
  dispatch,
  setProductModal,
  productModal,
  productId,
  selects,
  productCategories,
  productOptions,
  additionals,
}: iEditableMenuProductCardProps) {
  function setIngredientSelected(selectId: number) {
    const selectFinded = selects.find(
      (select) => select.id === Number(selectId)
    );
    const optionsFilteredBySelectId = productOptions.filter(
      (option) => option.select_id === selectFinded?.id
    );
    dispatch(setAddIngredientAction(selectFinded!, optionsFilteredBySelectId));
  }

  function setAdditionalSelected(additionalId: number) {
    console.log("foi");

    const additional = additionals.find(
      (additional) => additional.id === additionalId
    );
    if (!additional) {
      return;
    }
    dispatch(setAddAdditionalAction(additional!));
  }

  function setCategorySelected(categoryId: number) {
    const categoryFinded = productCategories.find((c) => c.id === categoryId);
    if (!categoryFinded) {
      return;
    }
    dispatch(setCategoryAction(categoryFinded!));
  }

  async function handleCreateProduct() {
    await createProduct(state, productOptions, additionals)
  }

  function handleUpdateProduct() {
    updateProduct(state, productId!, additionals)
  }

  return (
    <>
      <div
        className={`fixed inset-0 bg-black w-screen h-screen opacity-60 z-20 cursor-pointer ${productModal ? "opacity-40" : "opacity-0 pointer-events-none"}`}
        onClick={() => setProductModal(false)}
      ></div>
      <div
        className={`w-[360px] md:w-[420px] 2xl:w-[468px] fixed ${productModal ? "right-0" : "right-[-700px]"
          } transition-all ease-out z-30 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] overflow-auto p-4`}
      >
        <div className="flex flex-1 items-center justify-between pb-6">
          <BsArrowLeftCircle
            onClick={() => setProductModal(false)}
            className="text-3xl text-gray-600 cursor-pointer hover:scale-110 hover:transition-all ease-in-out"
          />
          {state.isViewingUpdatingOrAdding === "VIEWING" ? (
            <div className="flex items-center gap-3">
              <CardapioDigitalButton
                name="Excluir"
                h="h-8"
                w="w-28"
                onClick={() => deleteProduct(productId!, state.productInformation.name)} />
              {/* <CardapioDigitalButton
                name="Editar"
                h="h-8"
                w="w-28"
                onClick={() =>
                  dispatch(setIsViewingAddingOrOpdatingProductAction("UPDATING"))
                } /> */}
            </div>

          ) : null}
        </div>

        <HeadersCard state={state} dispatch={dispatch} />

        {state.isViewingUpdatingOrAdding !== "VIEWING" ? (
          <NavigationMenu.Root className="w-full h-10 relative shadow-sm bg-white mb-4 ">
            <NavigationMenu.List className="flex h-full flex-1 items-center justify-around p-1">
              <NavigationMenu.Item className="h-full flex flex-1 flex-col">
                <NavigationMenu.Trigger className="h-full flex flex-1 gap-2 items-center justify-center rounded hover:bg-gray-200">
                  Categorias <IoIosArrowDown className="hover:rotate-180" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="flex flex-1 w-auto p-1 rounded-md flex-wrap absolut top-0 left-0 bg-white shadow-md">
                  {productCategories.map((category) => {
                    return (
                      <NavigationMenu.List
                        key={category.id}
                        onClick={() => setCategorySelected(category.id!)}
                        className=" px-2 py-1 cursor-pointer hover:bg-violet-200 rounded  "
                      >
                        {category.name}
                      </NavigationMenu.List>
                    );
                  })}
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item className="h-full flex flex-1 flex-col">
                <NavigationMenu.Trigger className="h-full flex flex-1 gap-2 items-center justify-center rounded hover:bg-gray-200">
                  Ingredients <IoIosArrowDown className="hover:rotate-180" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="flex flex-1 w-auto p-1 rounded-md flex-wrap absolut top-0 left-0 bg-white shadow-md">
                  {selects.map((select) => {
                    if (state.ingredients.some(se => se.id === select.id)) {
                      return
                    }
                    return (
                      <NavigationMenu.List
                        title={select.name}
                        onClick={() => {
                          createProductSelectIfIsUpdatingProduct(select.id!, productId!)
                          setIngredientSelected(select.id!)
                        }}
                        key={select.id}
                        className="px-2 py-1 cursor-pointer hover:bg-violet-200 rounded "
                      >
                        {select.name}
                      </NavigationMenu.List>
                    );
                  })}
                </NavigationMenu.Content>
              </NavigationMenu.Item>

              <NavigationMenu.Item className="h-full flex flex-1 flex-col">
                <NavigationMenu.Trigger className="h-full flex flex-1 gap-2 items-center justify-center rounded hover:bg-gray-200">
                  Adicinais <IoIosArrowDown className="hover:rotate-180" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="flex flex-1 w-auto p-1 rounded-md flex-wrap absolut top-0 left-0 z-50 bg-white shadow-md">
                  {additionals.map((additional) => {
                    if (state.additionals.some(add => add.id === additional.id)) {
                      return
                    }
                    return (
                      <NavigationMenu.List
                        onClick={() => {
                          createProductAdditionalsIfIsUpdatingProduct(additional.id!, productId!)
                          setAdditionalSelected(additional.id!)
                        }}
                        key={additional.id}
                        className="px-2 py-1 cursor-pointer hover:bg-violet-200 rounded "
                      >
                        {additional.name}
                      </NavigationMenu.List>
                    );
                  })}
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
        ) : null}

        <h2>
          {!state.category
            ? "Selecione uma categoria"
            : `${state.category.name}`}
        </h2>

        <Igredient state={state} selects={selects} dispatch={dispatch} productId={productId!} />

        <Additional state={state} dispatch={dispatch} productId={productId!} />

        {state.isViewingUpdatingOrAdding === "ADDING" && (
          <CardapioDigitalButton
            onClick={() => handleCreateProduct()}
            disabled={
              !state.productInformation.name ||
              !state.productInformation.description ||
              !state.productInformation.price ||
              !state.picture_url
            }
            name="Adicionar novo item"
            h="h-10"
            w="w-full"
          />
        )}
        {state.isViewingUpdatingOrAdding === "UPDATING" && (
          <div className="flex flex-1 gap-2">
            <CardapioDigitalButton
              onClick={() =>
                dispatch(setIsViewingAddingOrOpdatingProductAction("VIEWING"))
              }
              disabled={
                !state.productInformation.name ||
                !state.productInformation.description ||
                !state.productInformation.price ||
                !state.picture_url
              }
              name="Cancelar"
              h="h-10"
              w="w-full"
            />
            <CardapioDigitalButton
              onClick={() => handleUpdateProduct()}
              disabled={
                !state.productInformation.name ||
                !state.productInformation.description ||
                !state.productInformation.price ||
                !state.picture_url
              }
              name="Editar"
              h="h-10"
              w="w-full"
            />
          </div>
        )}
        <ToastContainer />
      </div>
    </>
  );
}
