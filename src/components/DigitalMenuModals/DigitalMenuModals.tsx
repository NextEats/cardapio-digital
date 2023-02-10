import Checkout from "../Checkout";
import ProductModal from "../home/ProductModal";
import { WeekdayOperatingTime } from "../WeekdayOperatingTime";

export default function DigitalMenuModals({
  restaurant,
  products,
  showWeekdayOperatingTimeModal,
  setShowWeekdayOperatingTimeModal,
  productModal,
  setProductModal,
  productsDispatch,
  showCheckoutModal,
  setShowCheckoutModal,
}) {
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
          restaurant={restaurant}
        />
      )}
    </>
  );
}
