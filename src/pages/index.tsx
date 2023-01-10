import { GetServerSideProps } from "next";

import Image from "next/image";
import Link from "next/link";

import { BiSearch } from "react-icons/bi";
import { useState } from "react";

import Header from "../components/home/Header";
import Product from "../components/home/Product";

import { api } from "../server/api";

import {
  productType,
  IIngredientOptionsData,
  IAdditionalData,
} from "../types/product";

import ProductHorizontalScrollList from "../components/ProductHorizontalScrollList";

interface DataProps {
  topProducts: productType[];
  additionals: IAdditionalData[];
  ingredients: IIngredientOptionsData[];
}

export default function HomePage({
  topProducts,
  additionals,
  ingredients,
}: DataProps) {
  const [showProduct, setShowProduct] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<productType>();

  console.log("topProducts", topProducts);
  console.log("additionals", additionals);
  console.log("ingredients", ingredients);

  return (
    <div>
      <Product
        setShowProduct={setShowProduct}
        showProduct={showProduct}
        currentProduct={currentProduct}
        ingredients={ingredients}
        additionals={additionals}
      />
      <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
        <div className="bg-gray-100 max-w-7xl w-full">
          <div className="w-full  ">
            <Image
              className="w-full max-h-60"
              src="https://i.ibb.co/1sZhKFg/backgfroundheader.png"
              alt="backgfroundheader"
              width={600}
              height={600}
            />
          </div>
          <div>
            <Header />

            <hr className="border border-solid mt-6" />

            <div className="flex products-center gap-2 m-4 p-2 border rounded-md bg-white items-center">
              <BiSearch size={20} />
              <input
                type="text"
                placeholder="Pesquisar"
                className="flex flex-1 bg-transparent outline-0"
              />
            </div>

            <h5 className="pl-4 text-xl mt-7 font-bold text-gray-700">
              Destaques
            </h5>
            <ProductHorizontalScrollList
              products={topProducts}
              openProductModal={(productData: productType) => {
                setShowProduct(true);
                setCurrentProduct(productData);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const topProducts = await api.get("topProducts");
  const additionals = await api.get("additionals");
  const ingredients = await api.get("ingredients");

  return {
    props: {
      topProducts: topProducts.data,
      additionals: additionals.data,
      ingredients: ingredients.data,
    },
  };
};
