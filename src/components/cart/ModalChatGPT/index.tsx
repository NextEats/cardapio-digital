import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function ModalForm({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: boolean;
  setIsModalOpen: Function;
}) {
  const [step, setStep] = useState(1);
  const { register, handleSubmit, watch } = useForm();
  const router = useRouter();

  const onSubmit = (data: any) => {
    data;
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-red-500 text-white py-2 px-4 md"
      >
        Open Modal
      </button>
      <div
        className={`modal ${
          isModalOpen ? "block" : "hidden"
        } fixed w-full h-full top-0 left-0 flex items-center justify-center`}
      >
        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-70"></div>
        <div className="flex justify-between flex-col min-h-[500px] p-10 modal-container bg-white w-11/12 md:max-w-md mx-auto rounded-md shadow-lg z-50 overflow-y-auto">
          <div>
            <div className="modal-header py-2 flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-50 text-xl leading-none font-medium outline-none focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {step === 1 && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Tipo de Pedido
                  </label>
                  <div className="relative">
                    <input
                      value="pickup"
                      {...register("orderType")}
                      type="radio"
                      id="pickup"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="pickup" className="ml-3">
                      Retirada no Balcão
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      value="delivery"
                      {...register("orderType")}
                      type="radio"
                      id="delivery"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="delivery" className="ml-3">
                      Entrega
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      value="table"
                      {...register("orderType")}
                      type="radio"
                      id="table"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="table" className="ml-3">
                      Mesa
                    </label>
                  </div>
                </div>
              )}
              {step === 2 && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Endereço de Entrega
                  </label>
                  <div className="relative">
                    <input
                      placeholder="CEP"
                      {...register("cep")}
                      className="form-input w-full py-2 px-3 md border border-gray-300 placeholder-gray-500 text-gray-700 focus:bg-white focus:border-indigo-500 focus:text-indigo-500"
                    />
                  </div>
                  <div className="relative">
                    <input
                      placeholder="Número"
                      {...register("number")}
                      className="form-input w-full py-2 px-3 md border border-gray-300 placeholder-gray-500 text-gray-700 focus:bg-white focus:border-indigo-500 focus:text-indigo-500"
                    />
                  </div>
                  <div className="relative">
                    <input
                      placeholder="Complemento"
                      {...register("complement")}
                      className="form-input w-full py-2 px-3 md border border-gray-300 placeholder-gray-500 text-gray-700 focus:bg-white focus:border-indigo-500 focus:text-indigo-500"
                    />
                  </div>
                </div>
              )}
              {step === 3 && (
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Forma de Pagamento
                  </label>
                  <div className="relative">
                    <input
                      value="cash"
                      {...register("paymentMethod")}
                      type="radio"
                      id="cash"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="cash" className="ml-3">
                      Dinheiro
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      value="pix"
                      {...register("paymentMethod")}
                      type="radio"
                      id="pix"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="pix" className="ml-3">
                      Pix
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      value="creditCard"
                      {...register("paymentMethod")}
                      type="radio"
                      id="creditCard"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="creditCard" className="ml-3">
                      Cartão de Crédito
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      value="mealVoucher"
                      {...register("paymentMethod")}
                      type="radio"
                      id="mealVoucher"
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <label htmlFor="mealVoucher" className="ml-3">
                      Vale Refeição
                    </label>
                  </div>
                </div>
              )}
              {step === 4 && (
                <div>
                  <p>Confirmação dos Dados</p>
                  <p>Tipo de Pedido: {watch("orderType")}</p>
                  <p>
                    Endereço de Entrega: {watch("cep")}, {watch("number")},{" "}
                    {watch("complement")}
                  </p>
                  <p>Forma de Pagamento: {watch("paymentMethod")}</p>
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer py-2 ">
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="w-full bg-gray-300 text-gray-700 py-2 px-4 md"
              >
                Voltar
              </button>
            )}
            {step < 4 && (
              <button
                onClick={() => setStep(step + 1)}
                className="w-full bg-blue-500 text-white py-2 px-4 md"
              >
                Prosseguir
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="w-full bg-green-500 text-white py-2 px-4 md"
              >
                Enviar
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
