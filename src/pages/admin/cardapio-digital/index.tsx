import { GetServerSideProps } from "next";
import { useEffect, useReducer, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

import { supabase } from "../../../server/api";
import AdminWrapper from "../../../components/admin/AdminWrapper";
import Categories from "../../../components/admin/cardapio-digital/Categories";
import MenuProduct from "../../../components/admin/cardapio-digital/MenuProduct";
import { defaultValues, editableProductReducer } from "../../../reducers/aditableProduct/reducer";
import { iInsertProductCategory, iProductCategories, iInsertProductOptions, iProducts, iProductSelects, iInsertAdditionals, iInsertProductAdditionals } from "../../../types/types";
import { CategoryModal } from "../../../components/admin/cardapio-digital/CategoryModal";
import EditableMenuProductCard from "../../../components/admin/cardapio-digital/EditableMenuProductCard";
import { setIsUpdatingInformationAction, setProductInformationAction, setProductPictureUrlAction, setViewpProductAction } from "../../../reducers/aditableProduct/actions";
import { FiX } from "react-icons/fi";

interface iCardapioDigitalProps {
  productCategories: iProductCategories,
  products: iProducts,
  productSelects: iProductSelects,
  productOptions: iInsertProductOptions,
  productAdditionals: iInsertProductAdditionals,
  additionals: iInsertAdditionals,
}

export const getServerSideProps: GetServerSideProps = async () => {

  const productCategories = await supabase.from("product_categories").select()
  const products = await supabase.from("products").select()
  const productSelects = await supabase.from("product_selects").select()
  const productOptions = await supabase.from("product_options").select()
  const productAdditionals = await supabase.from("product_additionals").select()
  const additionals = await supabase.from("additionals").select()
  // const loacal =  window.localStorage.setItem("product_categories", JSON.stringify(productCategories.data))

  return {
    props: {
      products,
      productCategories,
      productSelects,
      productOptions,
      productAdditionals,
      additionals
    }
  }
}

export default function CardapioDigital({ productCategories, products, productSelects, productOptions, productAdditionals, additionals }: iCardapioDigitalProps) {

  const [state, dispatch] = useReducer(editableProductReducer, defaultValues);

  // const tdClasses = "[&:not(:last-child)]:p-4";
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [viewCategory, setViewCategory] = useState<{
    isViewing: boolean;
    categoryId: number;
    categoryName: string;
  }>({
    isViewing: false,
    categoryId: 0,
    categoryName: '',
  })
  const [editCategory, setEditCategory] = useState<{
    isEditing: boolean,
    categoryData: iInsertProductCategory["data"]
  }>({
    isEditing: false,
    categoryData: {
      name: '',
      restaurant_id: 0,
      id: 0,
    }
  })
  const [productId, setProductId] = useState<number | null>(null)


  useEffect(() => {

    async function setProtoduct() {
      const product = products.data.find(p => p.id === productId)
      const productSelectsByProdctId = productSelects.data.filter(select => select.product_id === product?.id)
      const productOptiosBySelectId = productOptions.data.filter(option => {
        return productSelectsByProdctId.map(select => select.id === option.product_select_id && option)
      })
      
      const productAdditionalsByProductId = productAdditionals.data.filter(productAdditional => productAdditional.product_id === productId )

      const additionalsByProductAdditionalsId = productAdditionalsByProductId?.map( productAdditional => {
          return   additionals.data[additionals?.data.findIndex( additional => productAdditional.additional_id === additional.id)]
      })
      dispatch(setViewpProductAction(product!, productSelectsByProdctId, productOptiosBySelectId, productAdditionalsByProductId, additionalsByProductAdditionalsId))
      // dispatch(setProductPictureUrlAction(product?.picture_url!))
      // dispatch(setProductInformationAction(product?.name!, product?.description!, product?.price!))
      // dispatch(setIsUpdatingInformationAction(false))
    }

    if (state.isViewingUpdatingOrAdding === "VIEWING") {
      setProtoduct()
    }

  }, [
    state.isViewingUpdatingOrAdding,
    products, 
    productId, 
    productSelects, 
    productOptions,
    productAdditionals,
    additionals,
  ])

  const [productModal, setProductModal ] = useState(false)


  return (
    <AdminWrapper>
      <>
        <div className="flex gap-10">
          <div className="flex flex-col flex-1 ">
            <h2 className="text-xl font-bold text-gray-700"> 5 itens mais vendidos  </h2>

            <div className="flex items-center justify-between mb-5 mt-7">
              <h2 className="text-xl font-bold text-gray-700 "> Categorias </h2>
              <input type="text" placeholder="Pesquisar"
                className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
              {/* <select name="" id=""
                  onChange={(e) => filterProductCategories(e.target.value)}
                  className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" >
                  <option value="Selecione">Selecione</option>
                  {productCateriesData.map(category => {
                    return <option key={category.id} value={category.id}>{category.name}</option>
              })
              }
            </select> */}
              <button
                onClick={() => setModalIsOpen(true)}
                className="text-base font-semibold text-white flex items-center justify-center gap-1 h-6 w-20 rounded-md bg-green-300 ">
                Novo
                <AiOutlinePlus />
              </button>
            </div>
            <CategoryModal modalIsOpen={modalIsOpen} products={products.data} setViewCategory={setViewCategory} viewCategory={viewCategory} editCategory={editCategory} setEditCategory={setEditCategory} setModalIsOpen={setModalIsOpen} />
            <Categories productCategories={productCategories.data} products={products.data} setViewCategory={setViewCategory} setEditCategory={setEditCategory} />

            {/* <div className="flex items-center justify-between mb-5 mt-7 mr-20">
            <h2 className="text-xl font-bold text-gray-700 "> itens em falta </h2>
            <input type="text" placeholder="Pesquisar"
              className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
            </div> */}

            {/* <MenuProduct  /> */}
            <div className="flex items-center justify-between mb-5 mt-7">
              <h2 className="text-xl font-bold text-gray-700 "> Itens do cardápio </h2>
              <input type="text" placeholder="Pesquisar"
                className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
              <button className="text-base font-semibold text-white flex items-center justify-center gap-1 h-6 w-20 rounded bg-green-300 ">
                Novo
                <AiOutlinePlus />
              </button>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2">
              {products.data.map(product => {
                return <MenuProduct dispatch={dispatch} setProductModal={setProductModal} setProductId={setProductId} key={product.id} product={product} />
              })}
            </div>

          </div>
          <EditableMenuProductCard state={state} dispatch={dispatch} productModal={productModal} setProductModal={setProductModal} />
        </div>
      </>
    </AdminWrapper>
  );
}


