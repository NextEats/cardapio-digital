import { GetServerSideProps } from "next";

import Image from "next/image";
import Link from "next/link";

import { BiRestaurant, BiSearch } from "react-icons/bi";
import { useState } from "react";

import Header from "../components/home/Header";
import Product from "../../src/components/home/Product";

import { supabase } from "../server/api";

import {
  productType,
  IIngredientOptionsData,
  IAdditionalData,
} from "../types/product";

import ProductHorizontalScrollList from "../components/ProductHorizontalScrollList";
import { IRestaurant } from "../types/home";
interface DataProps {
  products: productType[];
  additionals: IAdditionalData[];
  ingredients: IIngredientOptionsData[];
  restaurant: IRestaurant;
}

export default function HomePage({
  products,
  additionals,
  ingredients,
  restaurant,
}: DataProps) {
  const [showProduct, setShowProduct] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<productType>();

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
            <Header restaurant={restaurant} />

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
              <ProductHorizontalScrollList
                products={products}
                openProductModal={(productData: productType) => {
                  setCurrentProduct(productData);
                  setShowProduct(true);
                }}
              />
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const products = await supabase.from("products").select();
  const additionals = await supabase.from("additionals").select();
  const ingredients = await supabase.from("ingredients").select();
  const restaurant = await supabase.from("restaurants").select().eq("id", 0);

  return {
    props: {
      products: products.data,
      additionals: additionals.data,
      ingredients: ingredients.data,
      restaurant: restaurant,
    },
  };
};
