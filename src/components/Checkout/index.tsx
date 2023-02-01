import { BsX } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import { iCheckoutProduct, iRestaurant } from "../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";

import { ProductList } from "./ProductList";
import { SelectOrderType } from "./SelectOrderType";

import { TypeCEP } from "./TypeCEP";
import { Address } from "./Address";
import { Payment } from "./Payment";
import { WhatsappNumberInput } from "./WhatsappNumberInput";

export type iOrderType = "delivery" | "takeout" | "reserve";

export interface iPaymentOption {
  id: number;
  name: string;
}

export default function Checkout({
  products,
  onClose,
  restaurant,
  productsDispatch,
}: {
  products: Array<iCheckoutProduct> | null | undefined;
  onClose: () => void;
  productsDispatch: Function;
  restaurant: iRestaurant["data"];
}) {
  const [orderType, setOrderType] = useState<iOrderType>("delivery");
  const [cepState, setCepState] = useState<string>("");
  const [address, setAddress] = useState();
  const [whatsappNumber, setWhatsappNumber] = useState<number | undefined>(
    undefined
  );

  const [paymentOptions, setPaymentOptions] = useState<iPaymentOption[]>([
    {
      id: 1,
      name: "Cartão de Crédito",
    },
  ]);

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
      name: "Tipo de Pedido",
      component: (
        <SelectOrderType
          products={products}
          orderType={orderType}
          setOrderType={setOrderType}
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
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Digite seu Número de WhatsApp",
      component: (
        <WhatsappNumberInput
          restaurant={restaurant}
          whatsappNumber={whatsappNumber}
          setWhatsappNumber={setWhatsappNumber}
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Digite o Código",
      component: <></>,
    },
  ];

  if (products === null || products === undefined) {
    return <></>;
  }

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
