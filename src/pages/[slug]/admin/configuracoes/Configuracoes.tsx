import AdminWrapper from "../../../../components/admin/AdminWrapper";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import InputWithLabel from "../../../../components/InputWithLabel";

import {
  getPaymentMethodsAvailable,
  getPaymentMethodsForThisRestaurant,
} from "./../../../../server/api";
import { iPaymentMethod } from "../../../../types/types";
import Whatsapp from "./Whatsapp";

type iCurrentSection = "general" | "payment" | "distance_fee" | "whatsapp";

export default function Config() {
  const [currentSection, setCurrentSection] =
    useState<iCurrentSection>("general");

  return (
    <AdminWrapper>
      <>
        <div className="flex flex-row child:px-5 child:py-3 child:cursor-pointer child:border-b-4 child-hover:bg-[rgba(37, 100, 235, 0.164)] ">
          <div
            className={`${currentSection === "general"
                ? "border-b-blue-600"
                : "border-b-white"
              }`}
            onClick={() => setCurrentSection("general")}
          >
            Configurações Gerais
          </div>
          <div
            className={`${currentSection === "payment"
                ? "border-b-blue-600"
                : "border-b-white"
              }`}
            onClick={() => setCurrentSection("payment")}
          >
            Pagamento
          </div>
          <div
            className={`${currentSection === "distance_fee"
                ? "border-b-blue-600"
                : "border-b-white"
              }`}
            onClick={() => setCurrentSection("distance_fee")}
          >
            Taxas de Distâncias
          </div>
          <div
            className={`${currentSection === "whatsapp"
                ? "border-b-blue-600"
                : "border-b-white"
              }`}
            onClick={() => setCurrentSection("whatsapp")}
          >
            WhatsApp
          </div>
        </div>
        <div className="mt-8">
          {currentSection === "general" && <General />}
          {currentSection === "payment" && <Payment />}
          {currentSection === "distance_fee" && <DistanceFee />}
          {currentSection === "whatsapp" && <Whatsapp />}
        </div>
      </>
    </AdminWrapper>
  );
}

function General() {
  const [restaurantName, setRestaurantName] = useState<string>(
    "Quintal do Hamburguer"
  );

  return (
    <div className="w-full max-w-[600px]">
      <InputWithLabel
        label="Nome do Restaurante"
        placeholder="Escreva aqui o nome do seu estabelecimento..."
        state={restaurantName}
        setState={setRestaurantName}
      />
    </div>
  );
}

function Payment() {
  const [paymentMethodsAvailable, setPaymentMethodsAvailable] = useState<
    Array<iPaymentMethod["data"]> | undefined
  >(undefined);

  const [paymentMethods, setPaymentMethods] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const result = await getPaymentMethodsAvailable();
      if (!result.data) {
        return [];
      }
      const data = result.data as unknown as Array<iPaymentMethod["data"]>;
      setPaymentMethodsAvailable(data);

      const paymentMethodsForThisRestaurant =
        await getPaymentMethodsForThisRestaurant(3);
      setPaymentMethods(paymentMethodsForThisRestaurant);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h3 className="mb-4 font-semibold">Métodos de Pagamento Ativos</h3>
      {paymentMethods && (
        <div className="flex flex-col gap-y-3">
          {paymentMethods.data.map((paymentMethod: any, index: number) => {
            return (
              <div key={index}>
                <div className="ml-4 relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    type="checkbox"
                    name={paymentMethod.payment_methods.name}
                    id={paymentMethod.payment_methods.name}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor={paymentMethod.payment_methods.name}
                    className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
                <span className="uppercase">
                  {paymentMethod.payment_methods.name}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function DistanceFee() {
  return <div>general</div>;
}
