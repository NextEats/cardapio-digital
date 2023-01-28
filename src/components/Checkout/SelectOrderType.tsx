import { iCheckoutProduct } from "../../types/types";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { iOrderType } from "./index";

interface iSelectOrderType {
  products: Array<iCheckoutProduct> | null | undefined;
  productsDispatch: Function;
  setCurrentStep: Function;
  orderType: iOrderType;
  setOrderType: Function;
}
export function SelectOrderType({
  products,
  productsDispatch,
  setCurrentStep,
  orderType,
  setOrderType,
}: iSelectOrderType) {
  if (products === null || products === undefined) {
    return <></>;
  }

  const backStep = () => {
    setCurrentStep("productList");
  };

  const nextStep = () => {
    setCurrentStep("payment");
  };

  const cssSelectItemsText = "text-xl";
  const cssSelectItemsIcon = "text-4xl mr-4";

  const returnClassName = (currentOrderType: iOrderType) => {
    if (currentOrderType === orderType) {
      return "border-2 border-indigo-800 w-full h-16 hover:bg-indigo-800 flex items-center pl-6 cursor-pointer text-white rounded-md bg-indigo-800";
    } else {
      return "w-full h-16 hover:bg-indigo-800 flex items-center pl-6 cursor-pointer text-white rounded-md border-indigo-600 border-2 hover:text-white text-indigo-600";
    }
  };

  return (
    <div className="mb-9">
      <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
        <div
          className={returnClassName("delivery")}
          onClick={() => {
            setOrderType("delivery");
          }}
        >
          <FaMotorcycle className={cssSelectItemsIcon} />
          <span className={cssSelectItemsText}>Delivery</span>
        </div>
        <div
          className={returnClassName("takeout")}
          onClick={() => {
            setOrderType("takeout");
          }}
        >
          <FaShoppingBag className={cssSelectItemsIcon} />
          <span className={cssSelectItemsText}>Retirada</span>
        </div>
        <div
          className={returnClassName("reserve")}
          onClick={() => {
            setOrderType("reserve");
          }}
        >
          <MdRestaurant className={cssSelectItemsIcon} />
          <span className={cssSelectItemsText}>Reservar Mesa</span>
        </div>
      </div>
      <button
        onClick={backStep}
        className="font-semibold border-indigo-600 border-2 hover:text-white text-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-5"
      >
        VOLTAR
      </button>
      <button
        onClick={nextStep}
        className="font-semibold bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-1"
      >
        CONTINUAR
      </button>
    </div>
  );
}
