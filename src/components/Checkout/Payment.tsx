import { iCheckoutProduct } from "../../types/types";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { iOrderType } from "./index";
import InputMask from "react-input-mask";
import { useState } from "react";
import cep, { CEP } from "cep-promise";

interface iAddress {
  products: Array<iCheckoutProduct> | null | undefined;
  setCurrentStep: Function;
  cepState: string;
  setCepState: Function;
  address: (CEP & { number: number | undefined }) | undefined;
  setAddress: Function;
}
export function Payment({
  products,
  setCurrentStep,
  cepState,
  setCepState,
  address,
  setAddress,
}: iAddress) {
  const [number, setNumber] = useState("");
  const [hasError, setHasError] = useState(false);

  const backStep = () => {
    setCurrentStep("cepInput");
  };

  const nextStep = () => {
    if (number.length === 0) {
      setHasError(true);
    } else {
      setAddress((prev: CEP & { number: number | undefined }) => {
        prev.number = parseInt(number);
        return prev;
      });
      setCurrentStep("address");
    }
  };

  const inputClasses =
    "border-2 px-4 py-2 rounded-sm w-full mt-4 text-gray-500";

  return (
    <div className="mb-9">
      <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
        <div className="flex flex-col">
          <div className="flex flex-row gap-x-3">
            <InputMask
              mask={"99999-999"}
              value={address?.cep}
              className={inputClasses}
              disabled
            />
          </div>
          <div className="flex flex-row gap-x-3">
            <input
              type="text"
              value={address?.state + " - " + address?.city}
              className={inputClasses}
              disabled
            />
          </div>
          <div className="flex flex-row gap-x-3">
            <input
              type="text"
              value={address?.neighborhood}
              className={inputClasses}
              disabled
            />
          </div>
          <div className="flex flex-row gap-x-3">
            <input
              type="text"
              value={address?.street}
              className={inputClasses}
              disabled
            />
          </div>
          <div className="flex flex-col gap-x-3">
            <input
              type="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              placeholder="Digite o seu número"
              className="border-2 px-4 py-2 rounded-sm w-full mt-4 text-black"
            />
            {hasError && (
              <span className="mt-2 w-full text-md text-red-400">
                Digite o número do local de entrega para continuar.
              </span>
            )}
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
