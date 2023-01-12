import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { api } from "../../server/api";

import { BsArrowLeftCircle } from "react-icons/bs";
import { AiOutlinePlus, AiOutlinePlusCircle } from "react-icons/ai";
import { MdAttachMoney } from "react-icons/md";
import Modal from "../../components/cart/modal";

interface IChosenItems {
  picture: string;
  name: string;
  description: string;
  price: number;
}

export default function Posduct() {
  const [chosenItems, setChosenItems] = useState<IChosenItems[]>([]);
  async function getChosenItems() {
    const chosenItemsData = await api.get("cart");
    setChosenItems(chosenItemsData.data);
  }

  useEffect(() => {
    getChosenItems();
  }, []);

  const [showModal, setShowModal] = useState<
  "name" | "cep" | "number" | "payment" | "checkOut" | ""
  >("");

  return (
    <div className="px-4 pb-8">
      <div className="flex flex-1 items-center ">
        <Link href="/">
          <BsArrowLeftCircle className="my-8 cursor-pointer" size={30} />
        </Link>
        <h1 className=" w-full text-center font-extrabold text-xl text-gray-800">
          {" "}
          Carrinho{" "}
        </h1>
      </div>
      <div>
        {chosenItems.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-row mb-5 border shadow-lg bg-white p-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300 hover:brightness-90"
            >
              <Link href={`/product/${item.price}`}>
                <Image
                  src={item.picture}
                  className="rounded-xl"
                  alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                  width={120}
                  height={120}
                />
              </Link>
              <div className="flex flex-1 flex-col ml-3 justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium">{item.name}</span>
                  <span className="text-lg font-medium ml-4 mr-2">2</span>
                </div>
                <span className="text-sm">{item.description}</span>
                <span className="text-normal font-semibold mt-2 before:content-['R$']">
                  {" "}
                  {item.price}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {showModal !== "" && (
        <Modal setShowModal={setShowModal} showModal={showModal} />
      )}

      <div className="w-full absolute bottom-0 left-0 px-4 pb-8 pt-4 bg-white ">
        <p className="text-base font-medium text-black mb-6">Total: R$ 35,00</p>

        <button className="w-full h-10 flex items-center justify-center gap-2 border-2 mb-3 border-black rounded-md text-sm uppercase text-gray-600 font-medium">
          <AiOutlinePlusCircle size={20} color="#3A3A3A" /> Adicionar
        </button>
        <button
          className="w-full h-10 flex items-center justify-center gap-2 bg-gray-700 rounded-md text-sm uppercase text-white-300 font-medium"
          onClick={() => setShowModal("name")}
        >
          <MdAttachMoney size={20} color="#F7F7F7" /> Fechar pedido
        </button>
      </div>
    </div>
  );
}
