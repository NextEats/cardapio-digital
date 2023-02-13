import { BsX } from "react-icons/bs";
import { useState } from "react";
import { iCheckoutProduct } from "../../types/types";

import { ProductList } from "./ProductList";

import { TypeCEP } from "./TypeCEP";
import { Address } from "./Address";
import { Payment } from "./Payment";
import { SuccessMessage } from "./SuccessMessage";

export type iOrderType = "delivery" | "takeout" | "reserve";
export interface iPaymentOption {
  id: number;
  name: string;
}

export default function Checkout({
  products,
  onClose,
  productsDispatch,
}: {
  products: Array<iCheckoutProduct> | null | undefined;
  onClose: () => void;
  productsDispatch: Function;
}) {
  const [orderType, setOrderType] = useState<iOrderType>("delivery");
  const [cepState, setCepState] = useState<string>("");
  const [address, setAddress] = useState();

  function closeModal() {
    onClose();
  }

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function nextStepIndex() {
    setCurrentStepIndex((prev) => {
      return (prev += 1);
    });
  }

  function previousStepIndex() {
    setCurrentStepIndex((prev) => {
      if (prev === 0) {
        closeModal();
        return prev;
      }

      return (prev -= 1);
    });
  }

  const steps = [
    {
      name: "Finalizar Pedido",
      component: (
        <ProductList
          closeModal={closeModal}
          products={products}
          productsDispatch={productsDispatch}
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Digite seu CEP",
      component: (
        <TypeCEP
          products={products}
          cepState={cepState}
          setCepState={setCepState}
          setAddress={setAddress}
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Confirme Seu Endereço",
      component: (
        <Address
          address={address}
          setAddress={setAddress}
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Selecione o Método de Pagamento",
      component: (
        <Payment
          orderType={orderType}
          products={products}
          setOrderType={setOrderType}
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Sucesso!!",
      component: <SuccessMessage />,
    },
  ];

  if (products === null || products === undefined) {
    return <></>;
  }

  return (
    <>
      <div className="absolute h-screen w-[99vw] flex items-center justify-center">
        <div
          className="fixed bg-black w-[99vw] h-screen opacity-60 z-[100] cursor-pointer"
          onClick={closeModal}
        ></div>
        <div className="pb-9 px-4 bg-white rounded-lg z-[200] fixed overflow-auto shadow-2xl w-[95vw] max-w-[600px] ">
          <div className="sticky top-0">
            <div className="flex flex-row w-full items-center py-12 justify-center">
              <h4 className="font-semibold text-xl text-gray-800">
                {steps[currentStepIndex].name}
              </h4>
              <BsX
                className="my-8 cursor-pointer absolute right-7"
                size={30}
                onClick={closeModal}
              />
            </div>
            {steps[currentStepIndex].component}
          </div>
        </div>
      </div>
    </>
  );
}
