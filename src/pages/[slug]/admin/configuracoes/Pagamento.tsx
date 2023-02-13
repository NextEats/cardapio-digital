import { useEffect, useState } from "react";
import {
  getPaymentMethodsAvailable,
  getPaymentMethodsForThisRestaurant,
} from "./../../../../server/api";
import { iPaymentMethod } from "../../../../types/types";

export default function Payment() {
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
