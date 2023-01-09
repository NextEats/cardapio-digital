import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

interface ITopItems {
  setShowProduct: Dispatch<SetStateAction<boolean>>;
}
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
  {
    picture:
      "https://i.ibb.co/XZ8pbQq/ac748309-cf8d-47df-829c-0c31512de298.jpg",
    name: "Combo X-Duplo Cheddar + Fritas",
    description: "2 Hambúrguer 150g, cebola caramelizada e cheddar",
    price: 35,
  },
  {
    picture:
      "https://i.ibb.co/XZ8pbQq/ac748309-cf8d-47df-829c-0c31512de298.jpg",
    name: "Combo X-Duplo Cheddar + Fritas",
    description: "2 Hambúrguer 150g, cebola caramelizada e cheddar",
    price: 35,
  },
];

export default function TopItems({ setShowProduct }: ITopItems) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 12,
    },
  });

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-3 text-gray-800 ">Destaques</h2>
      <div ref={sliderRef} className="keen-slider">
        {topItemsData.map((item, index) => {
          return (
            <div
              key={index}
              className="keen-slider__slide flex flex-col mb-5 border shadow-lg bg-white p-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300 hover:brightness-90"
              // onClick={() => setShowProduct(true)}
            >
              <Link href={`#`}>
                <Image
                  src={item.picture}
                  className="w-full h-full rounded-xl"
                  alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                  width={120}
                  height={120}
                />
              </Link>
              <span className="text-lg text-gray-600 font-extrabold">
                {item.name}
              </span>
              <span className="text-base font-semibold text-green-100 before:content-['R$']">
                {" "}
                {item.price}{" "}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
