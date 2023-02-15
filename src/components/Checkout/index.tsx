import { BsX } from "react-icons/bs";
import { useContext, useState } from "react";
import { iAddresses, iCashBoxes, iCheckoutProduct, iClients, iOrders, iPaymentMethod } from "../../types/types";

import { ProductList } from "./ProductList";

import { TypeCEP } from "./TypeCEP";
import { Address } from "./Address";
import { Payment } from "./Payment";
import { SuccessMessage } from "./SuccessMessage";
import { api } from "@/src/server/api";
import { RestaurantContext } from "@/src/contexts/restaurantContext";

export type iOrderType = "delivery" | "takeout" | "reserve";
export type iPaymentMethodSelectedType = "pix" | "dinheiro"
export interface iPaymentOption {
  id: number;
  name: string;
}

export default function Checkout({
  products,
  onClose,
  productsDispatch,

}: {
  products: Array<iCheckoutProduct> | null | undefined;
  onClose: () => void;
  productsDispatch: Function;
}) {
  const [restaurant, setRestaurant] = useContext(RestaurantContext).restaurant;
  const [paymentMethodSelected, setPaymentMethodSelected] = useState<iPaymentMethod["data"] | null>(null);
  const [cepState, setCepState] = useState<string>("");
  const [address, setAddress] = useState({ cep: '', city: '', neighborhood: '', number: 0, service: '', state: '', street: '', });

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

  async function handleFinishOrder() {
    const cashBoxesData: iCashBoxes = await api.get("api/cash_boxes/" + restaurant!.id)
    const cashBoxOpened = cashBoxesData.data.find(cb => cb.is_open === true)
    if (!cashBoxOpened) {
      alert("O restaurante não está recebendo pedidos no momento!")
      return
    }
    const addressData: iAddresses = await api.post("api/addresses", {
      cep: cepState,
      number: address!.number,
      complement: '',
      google_maps_link: 'https://maps.google.com/maps',
      reference_point: 'Mecadinho do Zé',
    })
    if (!addressData) {
      alert("Desculpe, houve um erro com o seu pedido por favor tente novamente!")
      return
    }

    const clientData: iClients = await api.post("api/clients", {
      address_id: addressData.data[0]!.id,
      name: 'José',
      contact_id: 2,
    })

    if (!clientData) {
      alert("Desculpe, houve um erro com o seu pedido por favor tente novamente!")
      return
    }

    const orderData: iOrders = await api.post("api/orders/" + restaurant!.id, {
      order_type_id: 1,
      cash_box_id: cashBoxOpened.id,
      client_id: clientData.data[0]!.id,
      order_status_id: 2,
      payment_method_id: paymentMethodSelected!.id,
    })
    const createOrdersProdducts = async () => {
      products!.forEach(async p => {
        const orderProductData = await api.post("api/orders_products/", {
          product_id: p.id,
          order_id: orderData.data[0]!.id,
          observation: p.observation,
        })
      });
    }
    await createOrdersProdducts()
    // const orderProductData =
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
          handleFinishOrder={handleFinishOrder}
          restaurant={restaurant}
          paymentMethodSelected={paymentMethodSelected}
          products={products}
          setPaymentMethodSelected={setPaymentMethodSelected}
          nextStepIndex={nextStepIndex}
          previousStepIndex={previousStepIndex}
        />
      ),
    },
    {
      name: "Sucesso!!",
      component: <SuccessMessage />,
    },
  ];

  if (products === null || products === undefined) {
    return <></>;
  }

  return (
    <>
      <div className="absolute h-screen w-[99vw] flex items-center justify-center">
        <div
          className="fixed bg-black w-[99vw] h-screen opacity-60 z-[100] cursor-pointer"
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
