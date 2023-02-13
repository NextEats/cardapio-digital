/* eslint-disable react-hooks/rules-of-hooks */
import { useState, useReducer, useEffect } from "react";
import { GetServerSideProps } from "next";

import Head from "next/head";

import { getProductsGroupedByCategories } from "@/src/server/api";
import { iProduct, iDigitalMenuData } from "@/src/types/types";
import { RestaurantContext } from "@/src/contexts/restaurantContext";
import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";
import { productsReducer } from "@/src/reducers/productsReducer";
import DigitalMenuContent from "@/src/components/DigitalMenuContent/";
import DigitalMenuModals from "@/src/components/DigitalMenuModals";
import Push from "push.js";
import Logo from "@/src/assets/nexteats_logo_orange.png";
import { supabase } from "@/src/server/api";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const restaurant = await getRestaurantBySlugFetch(context.query.slug);

  var data: iDigitalMenuData = {
    restaurant: restaurant,
    groupedProducts: await getProductsGroupedByCategories(restaurant.id),
  };

  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};


export default function HomePage({ data }: { data: iDigitalMenuData }) {
  const { restaurant, groupedProducts, } = data;
 
  const [restaurantContext, setRestaurantContext] = useState(restaurant);

  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(true);
  const [productModal, setProductModal] = useState<iProduct["data"]>();
  const [showWeekdayOperatingTimeModal, setShowWeekdayOperatingTimeModal] =
    useState<boolean>(false);

  const [products, productsDispatch] = useReducer(productsReducer, undefined);

  if (!restaurant) {
    return <></>;
  }



  return (
    <RestaurantContext.Provider
      value={{ restaurant: [restaurantContext, setRestaurantContext] }}
    >
      {/* <h1 onClick={usePush}>TESTE</h1> */}
      <Head>
        <title>{restaurant.name}</title>
        <link href={restaurant.picture_url} rel="icon" sizes="any" />
      </Head>
      <DigitalMenuModals
        products={products}
        showWeekdayOperatingTimeModal={showWeekdayOperatingTimeModal}
        setShowWeekdayOperatingTimeModal={setShowWeekdayOperatingTimeModal}
        productModal={productModal}
        setProductModal={setProductModal}
        productsDispatch={productsDispatch}
        showCheckoutModal={showCheckoutModal}
        setShowCheckoutModal={setShowCheckoutModal}
      />
      <DigitalMenuContent
        restaurantType={restaurant.restaurant_types}
        setShowWeekdayOperatingTimeModal={setShowWeekdayOperatingTimeModal}
        groupedProducts={groupedProducts}
        setProductModal={setProductModal}
        products={products}
        setShowCheckoutModal={setShowCheckoutModal}
      />
    </RestaurantContext.Provider>
  );
}
