import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import {
  AiOutlineClose,
  AiOutlineBank,
  AiOutlineCreditCard,
} from "react-icons/ai";
import {
  FaRegMoneyBillAlt,
  FaMotorcycle,
  FaUtensils,
  FaWalking,
} from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { HiOutlineTicket } from "react-icons/hi";
import { BsCurrencyDollar } from "react-icons/bs";

import axios from "axios";
import { MdOutlineDeliveryDining } from "react-icons/md";

interface IModalProps {
  setShowModal: Dispatch<
    SetStateAction<"name" | "cep" | "number" | "payment" | "checkOut" | "">
  >;
  showModal: "name" | "cep" | "number" | "payment" | "checkOut" | "";
}

type IPaymentOtions =
  | "Dinheiro"
  | "Pix"
  | "Cartão de crédito"
  | "Cartão de Débito"
  | "Ticket Restaurante"
  | "VR Refeição"
  | "Sedexo refeição"
  | "ALELO REFEIÇÃO*";

type IWithdrawalOptions = "Mesa" | "Para Viagem" | "Entrega";

interface IAddress {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

const paymentOptions: IPaymentOtions[] = [
  "Dinheiro",
  "Pix",
  "Cartão de crédito",
  "Cartão de Débito",
  "Ticket Restaurante",
  "VR Refeição",
  "Sedexo refeição",
  "ALELO REFEIÇÃO*",
];
const withdrawalOptions: IWithdrawalOptions[] = [
  "Entrega",
  "Mesa",
  "Para Viagem",
];

export default function Modal({ setShowModal, showModal }: IModalProps) {
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [selectedPaymentValue, setSelectedPaymentValue] = useState("");
  const [cep, setCep] = useState("");
  const [cepError, setCepError] = useState(false);
  const [address, setAddress] = useState<IAddress>();
  const [name, setName] = useState<string>("");
  const [withdrawalOption, setWithdrawalOption] = useState<string>("Entrega");

  const labelClasses = "text-gray-700 font-semibold text-base mb-3";
  const inputClasses =
    "mt-3 w-full outline-none border border-gray-200 h-10 px-2 rounded-md font-normal";

  function handlePaymentOption(value: string) {
    setSelectedPaymentValue(() => {
      return value;
    });
  }

  async function getAddressByCEP(cep: string) {
    if (cep.length === 8) {
      return;
    }

    setCep(cep);

    const getCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    setAddress(getCep.data);
    if (getCep.data.erro) setCepError(true);
    else setCepError(false);
  }

  async function finalizeOrder() {

  }

  function Name() {
    return (
      <fieldset className="flex flex-col">
        <div className="mb-3">
          <label className={labelClasses} htmlFor="name">
            Nome Completo
          </label>
          <input
            type="text"
            className={inputClasses}
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            key="complete_name"
          />
        </div>

        <hr className="my-3" />

        <div className="flex flex-col">
          <label className={labelClasses} htmlFor="name">
            Como seu pedido vai chegar até você?
          </label>
          <div className="flex flex-col gap-y-2">
            {withdrawalOptions.map((item) => {
              return (
                <label
                  key={item}
                  className={`w-full h-10 cursor-pointer flex items-center pl-5 border-2 border-gray-200 rounded-md ${
                    item === withdrawalOption && "bg-gray-700"
                  } `}
                >
                  <div className="flex flex-row items-center gap-2">
                    {item === "Entrega" ? (
                      <FaMotorcycle
                        className={`text-gray-700 ${
                          item === withdrawalOption && "text-white"
                        }`}
                      />
                    ) : (
                      ""
                    )}
                    {item === "Mesa" ? (
                      <FaUtensils
                        className={`text-gray-700 ${
                          item === withdrawalOption && "text-white"
                        }`}
                      />
                    ) : (
                      ""
                    )}
                    {item === "Para Viagem" ? (
                      <FaWalking
                        className={`text-gray-700 ${
                          item === withdrawalOption && "text-white"
                        }`}
                      />
                    ) : (
                      ""
                    )}
                    <input
                      type="radio"
                      value={item}
                      hidden
                      checked={selectedPaymentValue === item}
                      onChange={(e) => setWithdrawalOption(e.target.value)}
                    />
                    <div className="flex items-center justify-center gap-4 text-sm text-black font-medium">
                      <span
                        className={`${
                          item === withdrawalOption
                            ? "text-white"
                            : "text-gray-700"
                        } font-normal`}
                      >
                        {item}
                      </span>
                    </div>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      </fieldset>
    );
  }

  function Cep() {
    return (
      <fieldset className="flex flex-col ">
        <label
          className="text-gray-700 font-bold text-base mb-1"
          htmlFor="name"
        >
          &nbsp;CEP&nbsp;
        </label>
        <input
          type="text"
          value={cep}
          className={inputClasses}
          autoFocus
          id="name"
          onChange={(e) => getAddressByCEP(e.target.value)}
          maxLength={8}
        />
        {cepError && (
          <span className="text-red-500 text-xs font-normal">
            Não encontramos o seu endereço, por favor verifique se o CEP está
            correto!
          </span>
        )}
      </fieldset>
    );
  }

  function Number() {
    return (
      <fieldset className="flex flex-col mb-3">
        <label
          className="text-gray-700 font-bold text-base mb-1"
          htmlFor="name"
        >
          &nbsp;Número&nbsp;
        </label>
        <input
          type="number"
          onChange={(e) => setNumber(e.target.value)}
          className="w-full outline-none border border-gray-500 h-10 px-2 rounded-md text-base font-medium"
          id="name"
          min={0}
        />
        <label
          className="text-gray-700 font-bold text-base mb-1"
          htmlFor="name"
        >
          &nbsp;Complemento&nbsp;
        </label>
        <input
          type="text"
          onChange={(e) => setComplement(e.target.value)}
          className={inputClasses}
          autoFocus
          id="name"
        />
      </fieldset>
    );
  }

  function Payment() {
    return (
      <div className="flex flex-col  gap-2">
        {paymentOptions.map((item, index) => {
          return (
            <div key={index}>
              <label
                className={`w-full h-8 flex items-center pl-5 gap-2 border-2 border-gray-700 rounded-md ${
                  item === selectedPaymentValue && "bg-gray-700"
                } `}
              >
                <input
                  type="radio"
                  value={item}
                  hidden
                  checked={selectedPaymentValue === item}
                  onChange={(e) => handlePaymentOption(e.target.value)}
                  id=""
                />
                <div className="flex items-center justify-center gap-4 text-sm text-black font-medium">
                  {item === "Dinheiro" && (
                    <FaRegMoneyBillAlt
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "Pix" && (
                    <AiOutlineBank
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "Cartão de Débito" && (
                    <AiOutlineBank
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "Cartão de crédito" && (
                    <AiOutlineCreditCard
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "Ticket Restaurante" && (
                    <HiOutlineTicket
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "VR Refeição" && (
                    <HiOutlineTicket
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "Sedexo refeição" && (
                    <HiOutlineTicket
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  {item === "ALELO REFEIÇÃO*" && (
                    <AiOutlineCreditCard
                      className="w-5 h-5"
                      color={
                        item === selectedPaymentValue ? "#FFFFFF" : "#8047F8"
                      }
                    />
                  )}
                  <span
                    className={` ${
                      item === selectedPaymentValue
                        ? "text-white"
                        : "text-gray-700"
                    } font-normal`}
                  >
                    {item}
                  </span>
                </div>
              </label>
              {item === "ALELO REFEIÇÃO*" ? (
                <span className="text-[10px] font-medium leading-[8px]">
                  *APENAS CARTÕES COM CHIP
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  }

  function Checkout() {
    return (
      <div className="flex flex-col gap-2">
        <div className="">
          <div className="flex gap-3 mb-5">
            <div className="w-7 h-7 rounded-full bg-purple-500 flex items-center justify-center ">
              <FiMapPin className="w-4 h-4" color="#FFFF" />
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-700">
                Endereço de entrega
              </h2>
              <span>
                Entrega em&nbsp;
                <strong>
                  {address?.logradouro}, {number}&nbsp;
                </strong>
                {address?.bairro} - {address?.localidade}, {address?.uf}
              </span>
            </div>
          </div>
          <div className="flex gap-3 mb-5">
            <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center ">
              <BsCurrencyDollar className="w-4 h-4" color="#FFFFFF" />
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-700">
                Endereço de entrega
              </h2>
              <span> {selectedPaymentValue} </span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center ">
              <MdOutlineDeliveryDining className="w-4 h-4" color="#FFFFFF" />
            </div>
            <div className="flex flex-col flex-1">
              <h2 className="text-xl font-bold text-gray-700">
                Forma de retirada
              </h2>
              <span> {withdrawalOption} </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form action="">
      <div className="w-screen h-screen flex items-center justify-center fixed inset-0 z-20 ">
        <div className="w-full h-full absolute inset-0 bg-black opacity-40 backdrop-blur-0"></div>

        <div className="max-w-[95vw] w-[700px] min-h-[490px] bg-white z-20 rounded-md shadow-2xl p-10">
          <div className="flex flex-1 items-center mb-9">
            <span className="w-full text-center text-gray-600 font-semibold text-xl">
              {showModal === "cep" && "number"
                ? " Endereço de Entrega "
                : showModal === "payment"
                ? " Forma de Pagamento "
                : "Confira os dados"}
            </span>
            <AiOutlineClose
              className="cursor-pointer w-5"
              onClick={() => setShowModal("")}
            />
          </div>
          <div className="h-[calc(100%-66px)] flex flex-col justify-between">
            {showModal === "name" && <Name />}
            {showModal === "cep" && <Cep />}
            {showModal === "number" && <Number />}
            {showModal === "payment" && <Payment />}
            {showModal === "checkOut" && <Checkout />}

            {showModal === "name" && (
              <Button
                data={{
                  cep,
                  cepError,
                  number,
                  selectedPaymentValue,
                  name,
                  withdrawalOption,
                }}
                name="Próximo"
                route="cep"
                setShowModal={setShowModal}
              />
            )}
            {showModal === "cep" && (
              <Button
                data={{
                  cep,
                  cepError,
                  number,
                  selectedPaymentValue,
                  name,
                  withdrawalOption,
                }}
                name="Próximo"
                route="number"
                setShowModal={setShowModal}
              />
            )}
            {showModal === "number" && (
              <Button
                data={{
                  cep,
                  cepError,
                  number,
                  selectedPaymentValue,
                  name,
                  withdrawalOption,
                }}
                name="Próximo"
                route="payment"
                setShowModal={setShowModal}
              />
            )}
            {showModal === "payment" && (
              <Button
                data={{
                  cep,
                  cepError,
                  number,
                  selectedPaymentValue,
                  name,
                  withdrawalOption,
                }}
                name="Próximo"
                route="checkOut"
                setShowModal={setShowModal}
              />
            )}
            {showModal === "checkOut" && (
              <button
                className="w-full h-10 flex items-center justify-center gap-2 border-2 disabled:cursor-not-allowed border-black rounded-md text-sm uppercase text-gray-600 font-medium"
                onClick={() => finalizeOrder()}
              >
                Concluir
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

interface IButtonProps {
  setShowModal: Dispatch<
    SetStateAction<"name" | "cep" | "number" | "payment" | "checkOut" | "">
  >;
  route: "name" | "cep" | "number" | "payment" | "checkOut" | "";
  name: string;
  data: {
    selectedPaymentValue: string;
    cep: string;
    number: string;
    cepError: boolean;
    name: string;
    withdrawalOption: string;
  };
}

function Button({ name, route, data, setShowModal }: IButtonProps) {
  return (
    <button
      className="mt-10 w-full h-10 flex items-center justify-center gap-2 border-2 disabled:cursor-not-allowed border-black rounded-md text-sm uppercase text-gray-600 font-medium"
      onClick={() => setShowModal(route)}
      disabled={
        route === "cep"
          ? data.name.length == 0 || data.withdrawalOption == ""
          : route == "number"
          ? data.cep.length < 8 || data.cepError
          : route == "payment"
          ? data.number.length == 0
          : route == "checkOut"
          ? data.selectedPaymentValue.length == 0
          : false
      }
    >
      {name}
    </button>
  );
}
