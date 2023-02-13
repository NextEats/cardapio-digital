import { iCheckoutProduct } from "../../types/types";
import InputMask from "react-input-mask";
import { useState } from "react";
import { CEP } from "cep-promise";

interface iAddress {
  address: (CEP & { number: number | undefined }) | undefined;
  setAddress: Function;
  nextStepIndex: Function;
  previousStepIndex: Function;
}
export function Address({
  address,
  setAddress,
  nextStepIndex,
  previousStepIndex,
}: iAddress) {
  const [number, setNumber] = useState("");
  const [hasError, setHasError] = useState(false);

  const backStep = () => {
    previousStepIndex();
  };

  const nextStep = () => {
    if (number.length === 0) {
      setHasError(true);
    } else {
      setAddress((prev: CEP & { number: number | undefined }) => {
        prev.number = parseInt(number);
        return prev;
      });
      nextStepIndex();
    }
  };

  const inputClasses =
    "border-2 px-4 py-2 rounded-sm w-full mt-4 text-gray-500";

  return (
    <>
      <div className="min-h-[400px] gap-y-2 flex flex-col">
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
    </>
  );
}
