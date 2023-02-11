import React from "react";
import { iRestaurantType } from "../../types/types";
import ProductsList from "../home/ProductsList";
import RestaurantHeader from "../home/RestaurantHeader";
import OpenCheckoutButton from "../OpenCheckoutButton";

interface iDigitalMenuContent {
  restaurantType: iRestaurantType["data"];
  setShowWeekdayOperatingTimeModal: any;
  groupedProducts: any;
  setProductModal: any;
  products: any;
  setShowCheckoutModal: any;
}

export default function DigitalMenuContent({
  restaurantType,
  setShowWeekdayOperatingTimeModal,
  groupedProducts,
  setProductModal,
  products,
  setShowCheckoutModal,
}: iDigitalMenuContent) {
  return (
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
  );
}
