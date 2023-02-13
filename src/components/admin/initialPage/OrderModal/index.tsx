import { iStatusReducer } from "../../../../reducers/statusReducer/reducer";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import { CardapioDigitalButton } from "../../cardapio-digital/CardapioDigitalButton";
import { Dispatch, useMemo, useState } from "react";
import { showModalAction } from "../../../../reducers/statusReducer/action";
import { api } from "../../../../server/api";
import { DropdownMenuObservation } from "../DropDownMenuObservation";
import { iInsertOrdersProducts, iInsertProducts, iRestaurantWithFKData } from "@/src/types/types";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale'

interface iOrderModalProps {
  ordersState: iStatusReducer;
  ordersDispatch: Dispatch<any>;
  restaurant: iRestaurantWithFKData;
  ordersProducts: iInsertOrdersProducts["data"];
  products: iInsertProducts["data"];
}

export function OrderModal({ ordersDispatch, ordersProducts, ordersState, products, restaurant }: iOrderModalProps) {
  const [address, setAddress] = useState({ bairro: "", cep: "", complemento: "", ddd: "", gia: "", ibge: "", localidade: "", logradouro: "", siafi: "", uf: "", });

  // products
  const orderProductFiltered = ordersProducts.filter(
    (op) => op.order_id === ordersState.orderId
  );
  const productsFiltered = orderProductFiltered.map((op) => {
    return products.find((p) => {
      return p.id === op?.product_id;
    });
  });
  const thereAnyObservation = orderProductFiltered.some(op => op.observation !== null)

  // data client
  const descriptionsStyles =
    "text-sm font-semibold text-gray-red-400 text-center mb-3 mt-6";
  const textStyles =
    "text-sm font-semibold text-gray-red-400 text-left leading-6";

  const orderFound = ordersState.orders.find((order) => order.id === ordersState.orderId);

  useMemo(() => {
    const getAddress = async () => {
      const res = await api.get(
        `https://viacep.com.br/ws/${orderFound?.clients.addresses.cep}/json/`
      );
      setAddress(res.data);
    };
    getAddress();
  }, [orderFound]);

  let countProducts: {
    [key: string]: {
      id: number | undefined;
      count: number;
      name: string;
      price: number;
    };
  } = {};
  for (let i = 0; i < productsFiltered.length; i++) {
    if (productsFiltered[i] === undefined) {
      return <></>;
    }

    if (!countProducts[productsFiltered[i]!.name]) {
      countProducts[productsFiltered[i]!.name] = {
        id: productsFiltered[i]!.id,
        count: 0,
        name: productsFiltered[i]!.name,
        price: 0,
      };
    }
    countProducts[productsFiltered[i]!.name].count += 1;
    countProducts[productsFiltered[i]!.name].price +=
      productsFiltered[i]!.price;
  }

  const result = Object.entries(countProducts).map(
    ([name, { id, count, price }]) => ({
      id,
      name,
      count,
      price,
    })
  );
  const totalPriceOfProducts = result.reduce(
    (acc, product) => acc + product.price,
    0
  );
  const deliveryPrice = 10;

  const orderDateFormated = format(new Date(`${orderFound?.created_at}`), "P", { locale: ptBR })
  return (
    <>
      <div>
        <Dialog.Root open={ordersState.isOpenOrderModal}>
          <Dialog.Portal>
            <Dialog.Overlay
              className="bg-black opacity-40 fixed inset-0 transition-all ease-in-out duration-300"
              onClick={() => ordersDispatch(showModalAction())}
            />
            <Dialog.Content className="bg-white shadow-bd w-[350px] md:w-[550px] fixed top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2  rounded-md p-6">
              <Dialog.Title className="text-xl font-bold text-center">
                Next Eats
              </Dialog.Title>

              <Dialog.Description className={`${descriptionsStyles}`}>
                Dados do restaurante
              </Dialog.Description>

              <div>
                <p className={`${textStyles} text`}>
                  &nbsp; Restaurante: <strong>{restaurant!.name}</strong>
                  &nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Nº do pedido: <strong> {orderFound?.id} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  Data:
                  <strong>
                    {orderDateFormated}
                  </strong>
                </p>
              </div>

              <Dialog.Description className={`${descriptionsStyles}`}>
                Dados do cliente
              </Dialog.Description>

              <div>
                <p className={`${textStyles}`}>
                  &nbsp; Nome: <strong> {orderFound?.clients?.name} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Telefone: <strong> {orderFound?.clients.contacts?.phone} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Email: <strong> {orderFound?.clients.contacts?.email} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Endereço:&nbsp;
                  <strong>
                    &nbsp;
                    {address.logradouro}, {orderFound?.clients.addresses?.number}&nbsp;
                  </strong>
                  &nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Bairro: <strong> {address.bairro} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Cidade:&nbsp;
                  <strong>
                    &nbsp;
                    {address.localidade}, {address.uf}&nbsp;
                  </strong>
                  &nbsp;
                </p>
              </div>

              <Dialog.Description className={`${descriptionsStyles}`}>
                Detalhes do pedido
              </Dialog.Description>

              <table className="mb-4 w-full">
                <thead>
                  <tr>
                    <td className={`${textStyles}`}> Qnt </td>
                    <td className={`${textStyles}`}> Item </td>
                    <td className={`${textStyles} w-24`}> Preço </td>
                    {thereAnyObservation ? <td className={`${textStyles} w-24`}> Obs. </td> : null}
                  </tr>
                </thead>
                <tbody>
                  {result.map((product) => {

                    const orderProductByProductId = orderProductFiltered.find((op) => op.product_id === product.id)

                    if (product === undefined) {
                      return;
                    }
                    return (
                      <tr key={product.id}>
                        <td className={`${textStyles}`}>
                          <strong> {product.count} </strong>
                        </td>
                        <td className={`${textStyles}`}>
                          <strong> {product.name} </strong>
                        </td>
                        <td className={`${textStyles}`}>
                          <strong> R$ {product.price} </strong>
                        </td>
                        {orderProductByProductId?.observation ?
                          <td className={`${textStyles}`}>
                            <strong> <DropdownMenuObservation observation={orderProductByProductId.observation} />  </strong>&nbsp;
                          </td> : null
                        }
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div>
                <p className="grid grid-cols-2 items-center gap-20">
                  <span className={`${textStyles}`}>sub-total:</span>
                  <span className={`${textStyles}`}>
                    <strong> R$ {totalPriceOfProducts} </strong>
                  </span>
                </p>
                <p className="grid grid-cols-2 items-center gap-20">
                  <span className={`${textStyles} `}>Taxa de entrega:</span>
                  <span className={`${textStyles}`}>
                    <strong> R$ {deliveryPrice} </strong>
                  </span>
                </p>
                <p className="grid grid-cols-2 items-center gap-20">
                  <span className={`${textStyles}`}>Total a pagar: </span>
                  <span className={`${textStyles} w-`}>
                    <strong> R$ {totalPriceOfProducts + deliveryPrice} </strong>
                  </span>
                </p>
              </div>

              <div className="flex flex-1 items-center justify-end mt-5">
                <CardapioDigitalButton name="Imprimir" w="w-28" h="h-8" />
              </div>

              <Dialog.Close asChild onClick={() => ordersDispatch(showModalAction())}>
                <button className="absolute top-3 right-3" aria-label="Close">
                  <FiX className="w-6 h-6" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}