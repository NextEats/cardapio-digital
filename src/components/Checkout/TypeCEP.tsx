import { iCheckoutProduct } from "../../types/types";
import InputMask from "react-input-mask";
import { useState } from "react";
import cep, { CEP } from "cep-promise";

interface iTypeCEP {
  products: Array<iCheckoutProduct> | null | undefined;
  cepState: string;
  setCepState: Function;
  setAddress: Function;
  nextStepIndex: Function;
  previousStepIndex: Function;
}
export function TypeCEP({
  products,
  cepState,
  setCepState,
  setAddress,
  nextStepIndex,
  previousStepIndex,
}: iTypeCEP) {
  const [hasError, setHasError] = useState<boolean>(false);

  if (products === null || products === undefined) {
    return <></>;
  }

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
        setAddress(res);
        setHasError(false);
        nextStepIndex("address");
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
        onClick={() => previousStepIndex()}
        className="font-semibold border-indigo-600 border-2 hover:text-white text-indigo-600 px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-5"
      >
        VOLTAR
      </button>
      <button
        onClick={() => nextStep()}
        className="font-semibold bg-indigo-500 text-white px-4 py-2 rounded-sm hover:bg-indigo-800 w-full mt-1"
      >
        CONTINUAR
      </button>
    </div>
  );
}
