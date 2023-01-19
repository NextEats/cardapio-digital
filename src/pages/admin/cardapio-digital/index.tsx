import AdminWrapper from "../../../components/admin/AdminWrapper";
import ProductHorizontalScrollList from "../../../components/ProductHorizontalScrollList";
import Categories from "../../../components/admin/Categories";
import MenuProduct from "../../../components/admin/MenuProduct";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";
import EditableMenuProductCard from "../../../components/admin/cardapio-digital/EditableMenuProductCard";
import { useState } from "react";
import { NewCategoryModal } from "../../../components/admin/cardapio-digital/EditableMenuProductCard/NewCategoryModal";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { supabase } from "../../../server/api";
import { iProductCategories, iProducts } from "../../../types/types";


interface iCardapioDigitalProps {
     productCategories: iProductCategories
     products: iProducts
}

export const getServerSideProps: GetServerSideProps = async () => {
  
  const productCategories = await supabase.from("product_categories").select()
  const products = await supabase.from("products").select()

  return {
    props: {
      products,
      productCategories
  }
}
}

export default function CardapioDigital( { productCategories, products }: iCardapioDigitalProps ) {
  // const tdClasses = "[&:not(:last-child)]:p-4";
  console.log(products)
  const [ modalIsOpen, setModalIsOpen]  = useState(false)
  return (
    <AdminWrapper>
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 ">
          <h2 className="text-xl font-bold text-gray-700"> 5 itens mais vendidos  </h2>

          <div className="flex items-center justify-between mb-5 mt-7">
            <h2 className="text-xl font-bold text-gray-700 "> Categorias </h2>
            <input type="text" placeholder="Pesquisar" 
              className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
            <button 
            onClick={() => setModalIsOpen(true)}
            className="text-base font-semibold text-white flex items-center justify-center gap-1 h-6 w-20 rounded-md bg-green-300 ">
              Novo
              <AiOutlinePlus />
            </button>
          </div>
          <NewCategoryModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
          <Categories productCategories={productCategories.data} />

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
          { products.data.map(product => {
            return <MenuProduct key={product.id} product={product} />
          })}

        </div>
        <EditableMenuProductCard  />
      </div>
    </AdminWrapper>
  );
}


