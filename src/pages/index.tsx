import { useContext, useMemo, useState, useEffect } from "react";

// NEXT JS IMPORTS
import { GetServerSideProps } from "next";
import Link from "next/link";
import Head from "next/head";

// COMPONENTS
import ProductsList from "./../components/home/ProductsList";
import RestaurantHeader from "./../components/home/RestaurantHeader";

// DATABASE
import { supabase } from "../server/api";

// TYPES
import {
  iProduct,
  iProducts,
  iIngredients,
  iRestaurants,
  iRestaurant,
  iAdditionals,
  iRestaurantType,
} from "./../types/types";

// HOMEPAGE TYPESCRIPT INTERFACE
interface iDataHomepage {
  data: {
    restaurants: iRestaurants;
    ingredients: iIngredients;
    additionals: iAdditionals;
    products: iProducts;
  };
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

async function returnRestaurantType(id: number) {
  const { data } = await supabase
    .from("restaurant_types")
    .select()
    .eq("id", id);

  return data as unknown as Array<iRestaurantType["data"]>;
}

export default function HomePage({ data }: iDataHomepage) {
  // GETS DATA FROM SERVER SIDE PROPS
  const { restaurants, ingredients, additionals, products } = data;
  var restaurant = restaurants.data[0] as unknown as iRestaurant["data"];

  // STATES
  const [productModal, setProductModal] = useState<iProduct>();
  const [restaurantType, setRestaurantType] = useState<
    iRestaurantType["data"] | null | undefined
  >();

  returnRestaurantType(restaurant?.restaurant_type_id).then((res) => {
    var data = res[0] as any;
    setRestaurantType(data);
  });

  return (
    <>
      <Head>
        <title>{restaurant.name}</title>
        <link href={restaurant.picture_url} rel="icon" sizes="any" />
      </Head>
      <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
        <div className="bg-gray-100 max-w-7xl w-full">
          <RestaurantHeader
            restaurant={restaurant}
            restaurantType={restaurantType}
          />
          {/* <ProductModal/> */}
          <ProductsList />
        </div>
      </div>
    </>
  );
}
