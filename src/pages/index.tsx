import { useContext, useState } from "react";

// NEXT JS IMPORTS
import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

// REACT ICONS
import { BiRestaurant, BiSearch } from "react-icons/bi";

// COMPONENTS
import ProductsList from "./../components/home/ProductsList";
import RestaurantHeader from "./../components/home/RestaurantHeader";

// DATABASE
import { supabase } from "../server/api";

// TYPES
import { iProduct, iProducts, iIngredients, iRestaurants, iRestaurant, iAdditionals }  from "./../types/types"

// HOMEPAGE TYPESCRIPT INTERFACE
interface iDataHomepage {
  data: {
    restaurants: iRestaurants;
    ingredients: iIngredients;
    additionals: iAdditionals;
    products: iProducts;
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // FETCH DATA FROM DATABASE
  const restaurants = await supabase.from("restaurants").select().eq("id", 3);
  const ingredients = await supabase.from("ingredients").select();
  const additionals = await supabase.from("additionals").select();
  const products = await supabase.from("products").select();

  // PASS DATA TO PAGE
  return {
    props: {
      data: {
        restaurants: restaurants,
        ingredients: ingredients,
        additionals: additionals,
        products: products,
      },
    },
  };
};

export default function HomePage({data}:iDataHomepage) {
  // GETS DATA FROM SERVER SIDE PROPS
  const {restaurants, ingredients, additionals, products} = data;
  const restaurant = restaurants.data[0] as unknown as iRestaurant['data'];

  // STATES
  const [showProduct, setShowProduct] = useState(true);
  const [currentProduct, setCurrentProduct] = useState<iProduct>();

  return (
  <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
      <div className="bg-gray-100 max-w-7xl w-full">
        <RestaurantHeader />
        {/* <ProductModal/> */}
        <ProductsList />
      </div>
    </div>
    );

  // return (
  //   <div>
  //     <Head>
  //       <title>{restaurant.name}</title>
  //       <link href={restaurant.picture_url}           
  //       rel="icon"
  //         sizes="any"/>
  //     </Head>
  //     <ProductModal
  //       setShowProduct={setShowProduct}
  //       showProduct={showProduct}
  //       currentProduct={undefined}
  //       ingredients={ingredients}
  //       additionals={additionals}
  //     />
  //     <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
  //       <div className="bg-gray-100 max-w-7xl w-full">
  //         <div className="w-full">
  //           <Image
  //             className="w-full max-h-60 lg:hidden"
  //             src="https://i.ibb.co/1sZhKFg/backgfroundheader.png"
  //             alt="backgfroundheader"
  //             width={1200}
  //             height={600}
  //           />
  //         </div>
  //         <div>
  //           <Header restaurant={restaurant} withStars />

  //           <hr className="border border-solid mt-6" />

  //           <div className="flex products-center gap-2 m-4 p-2 border rounded-md bg-white items-center">
  //             <BiSearch size={20} />
  //             <input
  //               type="text"
  //               placeholder="Pesquisar"
  //               className="flex flex-1 bg-transparent outline-0"
  //             />
  //           </div>
  //           <h5 className="pl-4 text-xl mt-7 font-bold text-gray-700">
  //             Destaques
  //             <ProductHorizontalScrollList
  //               products={products}
  //               openProductModal={(productData: productType) => {
  //                 setCurrentProduct(productData);
  //                 setShowProduct(true);
  //               }}
  //             />
  //           </h5>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ); 
}