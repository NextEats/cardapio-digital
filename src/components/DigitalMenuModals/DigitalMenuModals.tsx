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

  // const [price, setPrice] = useState<number>(0);
  // const [selects, setSelects] = useState<iProductSelectsWithOptions[]>([]);
  // const [selectedAdditionals, setSelectedAdditionals] = useState<any[]>([]);
  // const [quantity, setQuantity] = useState<number>(1);
  // const [observation, setObservation] = useState<string | null>(null);

  // async function handleOrder() {
  //   productsDispatch({
  //     type: "add",
  //     payload: {
  //       id: productModal?.id,
  //       name: productModal?.name,
  //       price: productModal?.price,
  //       quantity,
  //       picture_url: productModal?.picture_url,
  //       additionals: selectedAdditionals,
  //       options: selects,
  //       observation,
  //     },
  //   });
  // }

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
          // price={price}
          // quantity={quantity}
          // selectedAdditionals={selectedAdditionals}
          // selects={selects}
          // setObservation={setObservation}
          // setPrice={setPrice}
          // setQuantity={setQuantity}
          // setSelectedAdditionals={setSelectedAdditionals}
          // setSelects={setSelects}
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
