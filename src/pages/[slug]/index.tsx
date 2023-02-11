import { WeekdayOperatingTime } from "../../components/WeekdayOperatingTime";
import {
  useMemo,
  useState,
  useCallback,
  useReducer,
  createContext,
  useEffect,
} from "react";

// NEXT JS IMPORTS
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

// COMPONENTS
import ProductsList from "../../components/home/ProductsList";
import RestaurantHeader from "../../components/home/RestaurantHeader";

// DATABASE
import {
  api,
  getGroupedProducts,
  supabase,
} from "../../server/api";

// TYPES
import {
  iProduct,
  iRestaurant,
  iRestaurantType,
  iProductCategory,
  iGroupedProducts,
  iAddress,
  iRestaurantWithFKData,
} from "../../types/types";
import ProductModal from "../../components/home/ProductModal";

import { BsX } from "react-icons/bs";

// HOMEPAGE TYPESCRIPT INTERFACE
interface iDataHomepage {
  data: {
    restaurant: iRestaurantWithFKData;
    groupedProducts: iGroupedProducts;
  };
}

import { FaUtensils } from "react-icons/fa";
import Checkout from "../../components/Checkout";

import { RestaurantContext } from "../../contexts/restaurantContext";

export const getServerSideProps: GetServerSideProps = async (context) => {
  interface iData {
    restaurant: iRestaurant["data"] | undefined;
    groupedProducts: iGroupedProducts | undefined;
  }

  var data: iData = { restaurant: undefined, groupedProducts: undefined };

  // FETCH DATA FROM DATABASE;
  const restaurants = await supabase
    .from("restaurants")
    .select(
      `
      id,
      created_at,
      name,
      restaurant_type_id,
      picture_url,
      banner_url,
      slug,
      addresses (
        id,
        created_at,
        cep,
        number,
        reference_point,
        complement,
        google_maps_link
      ),
      weekday_operating_time (
        restaurant_id,
        is_active,
        opening_time,
        closing_time,
        weekday_id,
        weekdays (id, name)
      )
    `
    )
    .eq("slug", context.query.slug);

  if (
    !restaurants.data ||
    !restaurants.data.length ||
    restaurants.data === null
  ) {
    return {
      props: {
        data: data,
      },
    };
  }

  data.restaurant = restaurants.data[0] as unknown as iRestaurant["data"];

  data.groupedProducts = await getGroupedProducts(data.restaurant.id);

  // PASS DATA TO PAGE
  return {
    props: {
      data: data,
    },
  };
};

function productsReducer(state: any, action: any) {
  switch (action.type) {
    case "add":
      if (state) {
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
            picture_url: action.payload.picture_url,
            additionals: action.payload.additionals,
            options: action.payload.options,
            observation: action.payload.observation,
          },
        ];
      } else {
        return [
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
            picture_url: action.payload.picture_url,
            additionals: action.payload.additionals,
            options: action.payload.options,
          },
        ];
      }
    case "deleteProduct":
      return state.reduce((acc: any, current: any) => {
        console.log(action.payload.id, current.id);
        if (current.id !== action.payload.id) {
          acc.push(current);
        }
        return acc;
      }, []);
    case "addQuantity":
      return state.reduce((acc: any, current: any) => {
        if (current.id == action.payload.id) {
          current.quantity += 1;
          acc.push(current);
        } else {
          acc.push(current);
        }
        return acc;
      }, []);
    case "subtractQuantity":
      return state.reduce((acc: any, current: any) => {
        if (current.id == action.payload.id) {
          current.quantity -= 1;
          acc.push(current);
        } else {
          acc.push(current);
        }
        return acc;
      }, []);
  }
}

export default function HomePage({ data }: iDataHomepage) {
  // GETS DATA FROM SERVER SIDE PROPS
  const { restaurant, groupedProducts } = data;

  const [restaurantContext, setRestaurantContext] = useState(restaurant);

  // STATES
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(true);
  const [showWeekdayOperatingTimeModal, setShowWeekdayOperatingTimeModal] =
    useState<boolean>(false);

  const [products, productsDispatch] = useReducer(productsReducer, undefined);

  const [productModal, setProductModal] = useState<iProduct["data"]>();

  const [restaurantType, setRestaurantType] = useState<
    iRestaurantType["data"] | null | undefined
  >();

  console.log("restaurant", restaurant);

  const [
    productCategoriesForThisRestaurant,
    setProductCategoriesForThisRestaurant,
  ] = useState<Array<iProductCategory["data"]> | null | undefined>();

  useEffect(() => {
    async function getRestaurntType() {
      const { data } = await api.get(`api/restaurant_types/${restaurant?.restaurant_type_id}`)
      setRestaurantType(data)
    }
    getRestaurntType()
  }, [restaurant]);

  useMemo(() => {
    async function getProductCategoriesByRestaurantId() {
      const { data } = await api.get(`api/product_categories/${restaurant.id}`)
      setProductCategoriesForThisRestaurant(data);
    }
    getProductCategoriesByRestaurantId()
  }, [restaurant]);

  if (!productCategoriesForThisRestaurant) {
    return <>Loading</>;
  }

  return (
    <RestaurantContext.Provider
      value={{ restaurant: [restaurantContext, setRestaurantContext] }}
    >
      <Head>
        <title>{restaurant.name}</title>
        <link href={restaurant.picture_url} rel="icon" sizes="any" />
      </Head>
      {showWeekdayOperatingTimeModal && (
        <WeekdayOperatingTime
          close={() => {
            setShowWeekdayOperatingTimeModal(false);
          }}
        />
      )}
      {productModal && (
        <ProductModal
          productModal={productModal}
          setProductModal={setProductModal}
          productsDispatch={productsDispatch}
        />
      )}
      {showCheckoutModal && (
        <Checkout
          onClose={() => setShowCheckoutModal(false)}
          products={products}
          productsDispatch={productsDispatch}
          restaurant={restaurant}
        />
      )}

      <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
        <div className="bg-gray-100 max-w-7xl w-full">
          <RestaurantHeader
            restaurantType={restaurantType}
            openWeekdayOperatingTimeModal={() => {
              setShowWeekdayOperatingTimeModal(true);
            }}
          />
          <ProductsList
            groupedProducts={groupedProducts}
            setProductModal={setProductModal}
          />

          {products && products.length > 0 && (
            <div
              className="fixed bottom-1 max-w-7xl p-3 w-full"
              onClick={() => {
                setShowCheckoutModal(true);
              }}
            >
              <OpenCheckoutButton products={products} />
            </div>
          )}
        </div>
      </div>
    </RestaurantContext.Provider>
  );
}

function OpenCheckoutButton({ products }: { products: any }) {
  return (
    <div className="h-16 flex flex-row items-center justify-between bg-gray-900 cursor-pointer rounded-md">
      <FaUtensils className="text-white text-xl ml-10" />
      <span className="text-white text-lg block p-0 m-0 font-semibold pl-10">
        MEU PEDIDO
      </span>
      <span className="text-white mr-10 text-md">R$ </span>
    </div>
  );
}
