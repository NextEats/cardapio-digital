import AdminWrapper from "@/src/components/admin/AdminWrapper";
import { ProductsData } from "@/src/components/admin/ProductsData";
import ProductContextProvider from "@/src/contexts/ProductContext";
import { getAdditionalsByRestaurantIdFetch } from "@/src/fetch/additionals/getAdditionals";
import { getProductOptionsFetch } from "@/src/fetch/productOptions/getProductOptions";
import { getProductWithFKDataByRestaurantIdFetch } from "@/src/fetch/products/getProductWithFKDataByRestaurantId";
import { getProductsCategoriesByRestaurantIdFetch } from "@/src/fetch/productsCategories/getProductsCategoriesByRestaurantId";
import { getRestaurantBySlugFetch } from "@/src/fetch/restaurant/getRestaurantBySlug";
import { getSelectsByRestaurantIdFetch } from "@/src/fetch/selects/getSelectsByRestaurantId";
import { supabase } from "@/src/server/api";
import {
  iAdditionalCategories,
  iAdditionals,
  iProductCategories,
  iProductOptions,
  iProductsWithFKData,
  iRestaurant,
  iSelects,
} from "@/src/types/types";
import { GetStaticPaths, GetStaticProps } from "next";

interface iProdcutsProps {
  restaurant: iRestaurant["data"];
  productsData: iProductsWithFKData[];
  categories: iProductCategories["data"];
  additionals: iAdditionals["data"];
  selects: iSelects["data"];
  additional_categories: iAdditionalCategories["data"];
  product_options: iProductOptions["data"];
}

export default function Products({
  restaurant,
  productsData,
  categories,
  additionals,
  selects,
  additional_categories,
  product_options,
}: iProdcutsProps) {
  console.log(productsData);
  return (
    <AdminWrapper>
      <ProductContextProvider
        productsData={productsData}
        restaurant={restaurant}
        categories={categories}
        additionalsData={additionals}
        selectsData={selects}
        additional_categories={additional_categories}
        product_optionsData={product_options}
      >
        <div className="p-5 flex flex-col gap-3">
          <ProductsData />
        </div>
      </ProductContextProvider>
    </AdminWrapper>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<
  iProdcutsProps,
  { slug: string }
> = async ({ params }) => {
  const restaurantSlug = params?.slug;
  const restaurant = await getRestaurantBySlugFetch(restaurantSlug);
  const [
    additionals,
    productsData,
    categories,
    selects,
    additional_categories,
    product_options,
  ] = await Promise.all([
    getAdditionalsByRestaurantIdFetch(restaurant.id),
    getProductWithFKDataByRestaurantIdFetch({ restaurantId: restaurant.id }),
    getProductsCategoriesByRestaurantIdFetch(restaurant.id),
    getSelectsByRestaurantIdFetch(restaurant.id),
    supabase
      .from("additional_categories")
      .select("*")
      .eq("restaurant_id", restaurant.id),
    getProductOptionsFetch(),
  ]);

  return {
    props: {
      restaurant,
      productsData,
      categories: categories ? categories : [],
      additionals,
      selects,
      additional_categories: additional_categories.data
        ? additional_categories.data
        : [],
      product_options,
    },
    revalidate: 1 * 60,
  };
};
