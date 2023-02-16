import { iCheckoutProduct, iPaymentMethod, iPaymentMethods, iPaymentMethodsRestaurants, iPaymentMethodsRestaurantss, iRestaurantWithFKData } from "../../types/types";
import { iOrderType, iPaymentMethodSelectedType } from "./index";
import { useState, useMemo, useContext, useEffect } from "react";
import { CEP } from "cep-promise";
import { FaMotorcycle, FaShoppingBag } from "react-icons/fa";
import { MdRestaurant } from "react-icons/md";
import { GetServerSideProps } from "next";
import { api } from "../../server/api";
import Push from "push.js";
import { RestaurantContext } from "@/src/contexts/restaurantContext";

interface iPayment {
  products: Array<iCheckoutProduct> | null | undefined;
  paymentMethodSelected: iPaymentMethod["data"] | null;
  setPaymentMethodSelected: Function;
  nextStepIndex: Function;
  previousStepIndex: Function;
  restaurant: iRestaurantWithFKData | undefined
  handleFinishOrder(): Promise<void>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // PASS DATA TO PAGE
  return {
    props: {
      data: {},
    },
  };
};

export function Payment({
  paymentMethodSelected,
  nextStepIndex,
  previousStepIndex,
  setPaymentMethodSelected,
  restaurant,
  handleFinishOrder
}: iPayment) {
  // const [restaurant, setRestaurant] = useContext(RestaurantContext).restaurant;
  const [paymentMethods, setPaymentMethods] = useState<iPaymentMethods["data"]>([]);

  useEffect(() => {

    const getPaymentMethods = async () => {
      const getPaymentMethodsRestaurant: iPaymentMethodsRestaurantss = await api.get("api/payment_methods_restaurants/" + restaurant!.id)
      const getPaymentMethods: iPaymentMethods = await api.get("api/payment_method")
      const filterPaymentMethodsRestaurant = getPaymentMethodsRestaurant.data.map(pmr => {
        return getPaymentMethods.data[getPaymentMethods.data.findIndex(pm => pm.id === pmr.payment_method_id)]
      })
      // console.log(filterPaymentMethodsRestaurant)
      setPaymentMethods(filterPaymentMethodsRestaurant)
    }
    getPaymentMethods()
  }, [restaurant])


  const backStep = () => {
    previousStepIndex();
  };

  const nextStep = async () => {
    Push.create("Pedido Feito ", {
      body: "Seu pedido está em analise!",
      icon: restaurant?.picture_url,
      timeout: 4000,

      onClick: function () {
        window.focus();
        close();
      },
    });
    await handleFinishOrder()
    nextStepIndex();
  };


  const inputClasses =
    "border-2 px-4 py-2 rounded-sm w-full mt-4 text-gray-500";
  const cssSelectItemsText = "text-xl";
  const cssSelectItemsIcon = "text-4xl mr-4";

  // const returnClassName = (currentOrderType: iOrderType) => {
  //   if (true) {
  //     return "bg-indigo-800";
  //   } else {
  //   }
  // };

  return (
    <>
      <div className="min-h-[400px] gap-y-2 flex flex-col">
        <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px]">
          {
            paymentMethods.map(paymentMethod => {
              return (

                <div key={paymentMethod.id}
                  className={`border-2 border-indigo-800 w-full h-16 hover:bg-indigo-800 flex items-center pl-6 cursor-pointer hover:text-white rounded-md 
                  ${paymentMethodSelected === null ? '' : paymentMethodSelected!.name === paymentMethod.name ? 'bg-indigo-800 text-white' : 'text-indigo-800'}`}
                  onClick={() => {
                    setPaymentMethodSelected(paymentMethod);
                  }}
                >
                  {/* <FaMotorcycle className={cssSelectItemsIcon} /> */}
                  <span className={cssSelectItemsText}>{paymentMethod.name}</span>
                </div>
              )
            })
          }
          {/*<div
          className={returnClassName("takeout")}
          onClick={() => {
              setOrderType("takeout");
            }}
          >
            <FaShoppingBag className={cssSelectItemsIcon} />
            <span className={cssSelectItemsText}>Retirada</span>
          </div>
          <div
            className={returnClassName("reserve")}
            onClick={() => {
              setOrderType("reserve");
            }}
          >
            <MdRestaurant className={cssSelectItemsIcon} />
            <span className={cssSelectItemsText}>Reservar Mesa</span>
          </div> */}
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
