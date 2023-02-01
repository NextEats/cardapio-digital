import { iCheckoutProduct } from "../../types/types";
import InputMask from "react-input-mask";
import { useState } from "react";
import { CEP } from "cep-promise";

interface iPayment {
  nextStepIndex: Function;
  previousStepIndex: Function;
}
export function Payment({ nextStepIndex, previousStepIndex }: iPayment) {
  const backStep = () => {
    previousStepIndex();
  };

  const nextStep = () => {
    nextStepIndex();
  };

  const inputClasses =
    "border-2 px-4 py-2 rounded-sm w-full mt-4 text-gray-500";

  return (
    <div className="mb-9">
      <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
        <div className="flex flex-col"></div>
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
