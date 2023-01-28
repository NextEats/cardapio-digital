import { iCheckoutProduct } from "../../types/types";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { iOrderType } from "./index";
import InputMask from "react-input-mask";
import { useState } from "react";
import cep from "cep-promise";

interface iTypeCEP {
  products: Array<iCheckoutProduct> | null | undefined;
  setCurrentStep: Function;
  cepState: string;
  setCepState: Function;
}
export function TypeCEP({
  products,
  setCurrentStep,
  cepState,
  setCepState,
}: iTypeCEP) {
  const [hasError, setHasError] = useState<boolean>(false);

  if (products === null || products === undefined) {
    return <></>;
  }

  const backStep = () => {
    setCurrentStep("orderType");
  };

  const nextStep = () => {
    function clearNumbers() {
      let onlyNumbersString = "";

      for (let i = 0; i < cepState.length; i++) {
        if (!isNaN(Number(cepState[i]))) {
          onlyNumbersString += cepState[i];
        }
      }
      return Number(onlyNumbersString);
    }

    cep(clearNumbers())
      .then((res) => {
        console.log(res);
        setHasError(false);
        setCurrentStep("payment");
      })
      .catch((err) => setHasError(true));
  };

  const handleCepChange = (e: any) => {
    setCepState(e.target.value);
  };

  return (
    <div className="mb-9">
      <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
        <div>
          <InputMask
            mask="99999-999"
            value={cepState}
            onChange={(e) => handleCepChange(e)}
            type="text"
            className="border-b-indigo-800 border-b-2 w-full py-2 text-3xl text-center"
            placeholder="Digite seu CEP"
          />
        </div>
        {hasError && (
          <span className="text-center w-full text-sm text-red-400">
            Este CEP não é válido, verifique se o número está correto.
          </span>
        )}
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
