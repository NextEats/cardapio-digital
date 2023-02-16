import { useState } from "react";
import Checkout from "../Checkout";
import ProductModal from "../home/ProductModal";
import { iProductSelectsWithOptions } from "../home/ProductModal/getProductSelectWithOptions";
import { WeekdayOperatingTime } from "../WeekdayOperatingTime";

interface iDigitalMenuModals {
  products: any;
  showWeekdayOperatingTimeModal: any;
  setShowWeekdayOperatingTimeModal: any;
  productModal: any;
  setProductModal: any;
  productsDispatch: any;
  showCheckoutModal: any;
  setShowCheckoutModal: any;
}

export default function DigitalMenuModals({
  products,
  showWeekdayOperatingTimeModal,
  setShowWeekdayOperatingTimeModal,
  productModal,
  setProductModal,
  productsDispatch,
  showCheckoutModal,
  setShowCheckoutModal,
}: iDigitalMenuModals) {

  return (
    <>
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
        />
      )}
    </>
  );
}
