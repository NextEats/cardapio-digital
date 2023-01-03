import { FaStar, FaStarHalf, FaClock } from "react-icons/fa";
import { MdLocationOn, MdExpandMore } from "react-icons/md";

import Image from "next/image";

type categoryType = {
  name: string;
  imageUrl: string;
};

const categoriesData: categoryType[] = [
  {
    name: "Bebidas",
    imageUrl: "https://i.ibb.co/k8b1xLG/Inserir-um-subt-tulo-500-121-px.jpg",
  },
];

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
            <div className="inline bg-gray-800 px-5 py-2 rounded-full cursor-pointer">
              <MdLocationOn className="inline text-white w-6 h-6 mr-2" />
              <span className="text-white text-xs">Rua das Flores, 4321</span>
              <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
            </div>
          </div>
          <div className="mt-9">
            <div className="inline bg-gray-800 px-5 py-2 rounded-full cursor-pointer">
              <FaClock className="inline text-white w-5 h-5 mr-2" />
              <span className="text-white text-xs">Aberto até 23h</span>
              <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
            </div>
          </div>
        </div>
        <div className="mt-9">
          <TopItems />
        </div>
        <div className="mt-9">
          <Categories />
        </div>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <div>
      {categoriesData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-row mb-5 rounded-sm cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-200"
          >
            <Image
              src={item.imageUrl}
              className="rounded-xl"
              alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
              width={500}
              height={121}
            />
          </div>
        );
      })}
    </div>
  );
}

function TopItems() {
  return (
    <div>
      {topItemsData.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-row mb-5 bg-gray-100 p-2 rounded-sm cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-200"
          >
            <Image
              src={item.picture}
              className="rounded-xl"
              alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
              width={120}
              height={120}
            />
            <div className="flex flex-col ml-3 justify-center">
              <span className="text-lg font-medium">{item.name}</span>
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
        <div className="flex flex-row mt-2">
          <div className="font-bold text-xl mr-3">Quintal do Hambúrguer</div>
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStarHalf className="text-yellow-300 w-6 h-6 mr-2" />
        </div>
        <p className="text-gray-700 text-base">Hamburgueria</p>
      </div>
    </div>
  );
}
