import { FaStar, FaStarHalf, FaClock } from "react-icons/fa";
import { MdLocationOn, MdExpandMore } from "react-icons/md";

import Image from "next/image";

type itemType = {
  picture: string;
  name: string;
  description: string;
  price: number;
};

const topItemsData: itemType[] = [
  {
    picture:
      "https://i.ibb.co/PwDK3Xn/208c90f0-5596-48a4-a1ce-aebb38cf789d.jpg",
    name: "Combo X-Bacon + Fritas",
    description: "Molho da casa, hambúrguer 150g, bacon queijo prato.",
    price: 28,
  },
  {
    picture:
      "https://i.ibb.co/zFY95cV/d3a83eba-4052-48e5-963a-56f0ef52bf85.jpg",
    name: "Combo X-Salada + Fritas",
    description:
      "Molho da casa, hambúrguer 150g, cebola roxa, picles, tomate, alface e queijo prato.",
    price: 28,
  },
  {
    picture:
      "https://i.ibb.co/XZ8pbQq/ac748309-cf8d-47df-829c-0c31512de298.jpg",
    name: "Combo X-Duplo Cheddar + Fritas",
    description: "2 Hambúrguer 150g, cebola caramelizada e cheddar",
    price: 35,
  },
];

export default function HomePage() {
  return (
    <div>
      <Image
        src="https://i.ibb.co/cXbc9NV/Inserir-um-subt-tulo.jpg"
        alt="banner"
        width={640}
        height={200}
      />
      <div className="p-4">
        <RestaurantAvatar />
        <div className="flex flex-row items-center">
          <RestaurantInfo />
        </div>
        <div className="flex flex-row">
          <div className="mt-9 mr-1">
            <div className="inline bg-gray-800 px-5 py-3 rounded-full cursor-pointer">
              <MdLocationOn className="inline text-white w-6 h-6 mr-2" />
              <span className="text-white">Rua das Flores, 4321</span>
              <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
            </div>
          </div>
          <div className="mt-9">
            <div className="inline bg-gray-800 px-5 py-3 rounded-full cursor-pointer">
              <FaClock className="inline text-white w-5 h-5 mr-2" />
              <span className="text-white">Aberto até 23h</span>
              <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
            </div>
          </div>
        </div>
        <div className="mt-9">
          <TopItems />
        </div>
      </div>
    </div>
  );
}

function TopItems() {
  return (
    <div>
      {topItemsData.map((item, index) => {
        return (
          <div key={index} className="flex flex-col mb-5">
            <Image
              src={item.picture}
              alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
              width={200}
              height={200}
            />
            <span>{item.name}</span>
            <span>{item.description}</span>
            <span>{item.price}</span>
          </div>
        );
      })}
    </div>
  );
}

function RestaurantAvatar() {
  return (
    <div className="absolute -mt-20 flex items-center justify-center h-36 w-36 rounded-full border-solid border-4 border-gray-700 ">
      <Image
        src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
        alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
        className="rounded-full"
        width={200}
        height={200}
      />
    </div>
  );
}

function RestaurantInfo() {
  return (
    <div className="mt-20">
      <div className="flex flex-col">
        <div className="font-bold text-xl">Quintal do Hambúrguer</div>
        <p className="text-gray-700 text-base">Hamburgueria</p>
      </div>
      <div className="flex flex-row mt-4">
        <FaStar className="text-yellow-300 w-6 h-6" />
        <FaStar className="text-yellow-300 w-6 h-6" />
        <FaStar className="text-yellow-300 w-6 h-6" />
        <FaStar className="text-yellow-300 w-6 h-6" />
        <FaStarHalf className="text-yellow-300 w-6 h-6 mr-2" />
      </div>
    </div>
  );
}
