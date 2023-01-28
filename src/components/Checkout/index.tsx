import { BsX } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import { iCheckoutProduct } from "../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";

import { ProductList } from "./ProductList";
import { SelectOrderType } from "./SelectOrderType";
import { TypeCEP } from "./TypeCEP";

export type iOrderType = "delivery" | "takeout" | "reserve";

export default function Checkout({
  products,
  onClose,
  productsDispatch,
}: {
  products: Array<iCheckoutProduct> | null | undefined;
  onClose: () => void;
  productsDispatch: Function;
}) {
  const [currentStep, setCurrentStep] = useState<
    "productList" | "orderType" | "payment"
  >("productList");

  const [orderType, setOrderType] = useState<iOrderType>("delivery");
  const [cepState, setCepState] = useState<string>("");

  if (products === null || products === undefined) {
    return <></>;
  }

  var body = document.getElementById("body");
  body?.classList.add("overflow-hidden");

  function closeModal() {
    onClose();
    body?.classList.remove("overflow-hidden");
  }

  console.log("checkout products: ", products);

  return (
    <>
      <div className="absolute h-screen w-screen flex items-center justify-center">
        <div
          className="fixed bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
          onClick={closeModal}
        ></div>
        <div className="pb-9 px-4 bg-white rounded-lg z-[200] fixed overflow-auto shadow-2xl w-[95vw] max-w-[600px] ">
          <div className="sticky top-0">
            <div className="flex flex-row w-full items-center py-12 justify-center">
              <h4 className="font-semibold text-xl text-gray-800">
                {currentStep == "productList" && "FINALIZAR PEDIDO"}
                {currentStep == "orderType" && "TIPO DE PEDIDO"}
                {currentStep == "payment" && "MÉTODO DE PAGAMENTO"}
              </h4>

              <BsX
                className="my-8 cursor-pointer absolute right-7"
                size={30}
                onClick={closeModal}
              />
            </div>
            {currentStep == "productList" && (
              <ProductList
                closeModal={closeModal}
                products={products}
                productsDispatch={productsDispatch}
                setCurrentStep={setCurrentStep}
              />
            )}
            {currentStep == "orderType" && (
              <SelectOrderType
                products={products}
                productsDispatch={productsDispatch}
                setCurrentStep={setCurrentStep}
                orderType={orderType}
                setOrderType={setOrderType}
              />
            )}
            {currentStep == "payment" && (
              <TypeCEP
                products={products}
                setCurrentStep={setCurrentStep}
                cepState={cepState}
                setCepState={setCepState}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
