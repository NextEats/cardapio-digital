import { useContext, useMemo, useState, useEffect, useCallback } from "react";

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
  iProductCategories,
  iProductCategory,
  iGroupedProducts,
  ProductWithCategory,
} from "./../types/types";
import ProductModal from "../components/home/ProductModal";

// HOMEPAGE TYPESCRIPT INTERFACE
interface iDataHomepage {
  data: {
    restaurants: iRestaurants;
    ingredients: iIngredients;
    additionals: iAdditionals;
    products: iProducts;
    groupedProducts: iGroupedProducts;
  };
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // FETCH DATA FROM DATABASE;
  const restaurants = await supabase.from("restaurants").select().eq("id", 3);
  const ingredients = await supabase.from("ingredients").select();
  const additionals = await supabase.from("additionals").select();
  const products = await supabase.from("products").select();

  const getGroupedProducts = async () => {
    // Cria um mapa para armazenar os nomes das categorias correspondentes a cada ID de categoria
    const categoryMap = new Map<number, string>();
    let groupedProducts;
    try {
      // Faz uma requisição para a tabela de categorias de produtos
      const res = await supabase.from("product_categories").select("id, name");
      if (!res.data) {
        return;
      }
      // Percorre os dados da resposta e adiciona os nomes das categorias ao mapa, usando o ID da categoria como chave
      for (const category of res.data) {
        categoryMap.set(category.id, category.name);
      }
      // Faz uma requisição para a tabela de produtos
      const resProduct = await supabase.from("products").select("*");
      if (!resProduct.data) {
        return;
      }
      // Armazena os dados da resposta em uma variável
      const products = resProduct.data;
      // Utiliza a função reduce para agrupar os produtos por categoria e adicionar o nome da categoria a cada produto agrupado
      groupedProducts = products.reduce((acc: iGroupedProducts, product) => {
        // Verifica se ja existe uma entrada para essa categoria no objeto agrupado
        if (!acc[product.category_id]) {
          acc[product.category_id] = {
            // Se não existir, adiciona uma nova entrada para essa categoria e coloca o nome da categoria recuperado do mapa
            category_name: categoryMap.get(product.category_id) || "",
            products: [],
          };
        }
        // Cria um objeto "productWithCategory" com as propriedades do produto e a categoria_name
        const productWithCategory: ProductWithCategory = {
          ...product,
          category_name: acc[product.category_id].category_name,
        };
        // Adiciona o objeto "productWithCategory" ao array de produtos da categoria
        acc[product.category_id].products.push(productWithCategory);
        return acc;
      }, {});
    } catch (error) {
      console.error(error);
    } finally {
      // retorna a variavel groupedProducts
      return groupedProducts;
    }
  };

  var groupedProducts: iGroupedProducts | undefined =
    await getGroupedProducts();

  // PASS DATA TO PAGE
  return {
    props: {
      data: {
        restaurants: restaurants,
        ingredients: ingredients,
        additionals: additionals,
        products: products,
        groupedProducts: groupedProducts,
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

async function returnAllCategoriesForThisRestaurant(restaurantId: number) {
  const { data } = await supabase
    .from("product_categories")
    .select("*")
    .eq("restaurant_id", restaurantId);

  return data as unknown as Array<iProductCategory["data"]>;
}

export default function HomePage({ data }: iDataHomepage) {
  // GETS DATA FROM SERVER SIDE PROPS
  const { restaurants, ingredients, additionals, products, groupedProducts } =
    data;
  var restaurant = restaurants.data[0] as unknown as iRestaurant["data"];

  // STATES
  const [productModal, setProductModal] = useState<iProduct>();
  const [restaurantType, setRestaurantType] = useState<
    iRestaurantType["data"] | null | undefined
  >();
  const [
    productCategoriesForThisRestaurant,
    setProductCategoriesForThisRestaurant,
  ] = useState<Array<iProductCategory["data"]> | null | undefined>();

  useCallback(() => {
    returnRestaurantType(restaurant?.restaurant_type_id).then((res) => {
      var data = res[0] as any;
      setRestaurantType(data);
    });
  }, [restaurant]);

  useMemo(() => {
    returnAllCategoriesForThisRestaurant(restaurant?.id).then((res) => {
      setProductCategoriesForThisRestaurant(res);
    });
  }, [restaurant]);

  if (!productCategoriesForThisRestaurant) {
    console.error(productCategoriesForThisRestaurant);
    return <>Loading</>;
  }

  return (
    <>
      <Head>
        <title>{restaurant.name}</title>
        <link href={restaurant.picture_url} rel="icon" sizes="any" />
      </Head>
      {productModal && (
        <ProductModal
          productModal={productModal.data}
          setProductModal={setProductModal}
        />
      )}
      <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
        <div className="bg-gray-100 max-w-7xl w-full">
          <RestaurantHeader
            restaurant={restaurant}
            restaurantType={restaurantType}
          />
          <ProductsList
            groupedProducts={groupedProducts}
            setProductModal={setProductModal}
          />
        </div>
      </div>
    </>
  );
}
