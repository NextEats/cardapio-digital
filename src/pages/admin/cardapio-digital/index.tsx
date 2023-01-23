import AdminWrapper from "../../../components/admin/AdminWrapper";
import Categories from "../../../components/admin/cardapio-digital/Categories";
import MenuProduct from "../../../components/admin/cardapio-digital/MenuProduct";
import { AiOutlinePlus } from "react-icons/ai";
import EditableMenuProductCard from "../../../components/admin/cardapio-digital/EditableMenuProductCard";
import { useState } from "react";
import { GetServerSideProps } from "next";
import { supabase } from "../../../server/api";
import { iInsertProductCategory, iProductCategories, iProducts } from "../../../types/types";
import { CategoryModal } from "../../../components/admin/cardapio-digital/CategoryModal";


interface iCardapioDigitalProps {
  productCategories: iProductCategories
  products: iProducts
}

export const getServerSideProps: GetServerSideProps = async () => {

  const productCategories = await supabase.from("product_categories").select()
  const products = await supabase.from("products").select()
  // const loacal =  window.localStorage.setItem("product_categories", JSON.stringify(productCategories.data))

  return {
    props: {
      products,
      productCategories
    }
  }
}

export default function CardapioDigital({ productCategories, products }: iCardapioDigitalProps) {
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

  return (
    <AdminWrapper>
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

          <div className="flex items-center justify-between mb-5 mt-7 mr-20">
            <h2 className="text-xl font-bold text-gray-700 "> itens em falta </h2>
            <input type="text" placeholder="Pesquisar"
              className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
          </div>

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
          <div className="flex flex-col gap-2">
            {products.data.map(product => {
              return <MenuProduct key={product.id} product={product} />
            })}
          </div>

        </div>
        <EditableMenuProductCard />
      </div>
    </AdminWrapper>
  );
}


