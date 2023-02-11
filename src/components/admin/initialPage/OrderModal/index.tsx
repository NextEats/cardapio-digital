import { iStatusReducer } from "../../../../reducers/statusReducer/reducer";
import * as Dialog from "@radix-ui/react-dialog";
import { FiX } from "react-icons/fi";
import { CardapioDigitalButton } from "../../cardapio-digital/CardapioDigitalButton";
import { Dispatch, useMemo, useState } from "react";
import { showModalAction } from "../../../../reducers/statusReducer/action";
import { api } from "../../../../server/api";
import { DropdownMenuObservation } from "../DropDownMenuObservation";

interface iOrderModalProps {
  state: iStatusReducer;
  dispatch: Dispatch<any>;
}

export function OrderModal({ state, dispatch }: iOrderModalProps) {
  const [address, setAddress] = useState({ bairro: "", cep: "", complemento: "", ddd: "", gia: "", ibge: "", localidade: "", logradouro: "", siafi: "", uf: "", });

  // products
  const orderProductFiltered = state.ordersProducts.filter(
    (op) => op.order_id === state.orderId
  );
  const productsFiltered = orderProductFiltered.map((op) => {
    return state.products.find((p) => {
      return p.id === op?.product_id;
    });
  });
  const thereAnyObservation = orderProductFiltered.some(op => op.observation !== null)

  // data client
  const descriptionsStyles =
    "text-sm font-semibold text-gray-red-400 text-center mb-3 mt-6";
  const textStyles =
    "text-sm font-semibold text-gray-red-400 text-left leading-6";

  const orderFound = state.orders.find((order) => order.id === state.orderId);
  const clientFuound = state.clients.find(
    (client) => client.id === orderFound?.client_id
  );

  const contact = state.contacts.find(
    (contact) => contact.id === clientFuound?.contact_id
  );
  const addressFound = state.addresses?.find(
    (address) => address.id === clientFuound?.address_id
  );

  useMemo(() => {
    const getAddress = async () => {
      const res = await api.get(
        `https://viacep.com.br/ws/${addressFound?.cep}/json/`
      );
      setAddress(res.data);
    };
    getAddress();
  }, [addressFound]);

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

  return (
    <>
      <div>
        <Dialog.Root open={state.isOpenOrderModal}>
          <Dialog.Portal>
            <Dialog.Overlay
              className="bg-black opacity-40 fixed inset-0 transition-all ease-in-out duration-300"
              onClick={() => dispatch(showModalAction())}
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
                  &nbsp; Restaurante: <strong>Quintal do Hambúrguer</strong>
                  &nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Nº do pedido: <strong> 45452124 </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Data: <strong> 29/03/2023 </strong>&nbsp;
                </p>
              </div>

              <Dialog.Description className={`${descriptionsStyles}`}>
                Dados do cliente
              </Dialog.Description>

              <div>
                <p className={`${textStyles}`}>
                  &nbsp; Nome: <strong> {clientFuound?.name} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Telefone: <strong> {contact?.phone} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Email: <strong> {contact?.email} </strong>&nbsp;
                </p>
                <p className={`${textStyles}`}>
                  &nbsp; Endereço:&nbsp;
                  <strong>
                    &nbsp;
                    {address.logradouro}, {addressFound?.number}&nbsp;
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
                          &nbsp;
                          <strong> {product.count} </strong>&nbsp;
                        </td>
                        <td className={`${textStyles}`}>
                          &nbsp;
                          <strong> {product.name} </strong>&nbsp;
                        </td>
                        <td className={`${textStyles}`}>
                          &nbsp;
                          <strong> R$ {product.price} </strong>&nbsp;
                        </td>
                        {orderProductByProductId?.observation ?
                          <td className={`${textStyles}`}>
                            &nbsp;
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
                    &nbsp;
                    <strong> R$ {totalPriceOfProducts} </strong>&nbsp;
                  </span>
                </p>
                <p className="grid grid-cols-2 items-center gap-20">
                  <span className={`${textStyles} `}>Taxa de entrega:</span>
                  <span className={`${textStyles}`}>
                    &nbsp;
                    <strong> R$ {deliveryPrice} </strong>&nbsp;
                  </span>
                </p>
                <p className="grid grid-cols-2 items-center gap-20">
                  <span className={`${textStyles}`}>Total a pagar: </span>
                  <span className={`${textStyles} w-`}>
                    &nbsp;
                    <strong>
                      &nbsp; R$ {totalPriceOfProducts + deliveryPrice}&nbsp;
                    </strong>
                    &nbsp;
                  </span>
                </p>
              </div>

              <div className="flex flex-1 items-center justify-end mt-5">
                <CardapioDigitalButton name="Imprimir" w="w-28" h="h-8" />
              </div>

              <Dialog.Close asChild onClick={() => dispatch(showModalAction())}>
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
