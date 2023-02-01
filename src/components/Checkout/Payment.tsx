import { iCheckoutProduct } from "../../types/types";
import { SelectOrderType } from "./SelectOrderType";
import InputMask from "react-input-mask";
import { iOrderType } from "./index";
import { useState } from "react";
import { CEP } from "cep-promise";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";

interface iPayment {
  products: Array<iCheckoutProduct> | null | undefined;
  orderType: iOrderType;
  setOrderType: Function;
  nextStepIndex: Function;
  previousStepIndex: Function;
}
export function Payment({
  nextStepIndex,
  previousStepIndex,
  setOrderType,
  orderType,
  products,
}: iPayment) {
  const backStep = () => {
    previousStepIndex();
  };

  const nextStep = () => {
    nextStepIndex();
  };

  const inputClasses =
    "border-2 px-4 py-2 rounded-sm w-full mt-4 text-gray-500";
  const cssSelectItemsText = "text-xl";
  const cssSelectItemsIcon = "text-4xl mr-4";

  return (
    <div className="mb-9">
      <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
        <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
          <div
            // className={returnClassName("delivery")}
            onClick={() => {
              setOrderType("delivery");
            }}
          >
            <FaMotorcycle className={cssSelectItemsIcon} />
            <span className={cssSelectItemsText}>Delivery</span>
          </div>
          <div
            // className={returnClassName("takeout")}
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
