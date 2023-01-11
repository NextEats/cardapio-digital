import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";

import { Dispatch, SetStateAction } from "react";
import { useKeenSlider } from "keen-slider/react";

import "keen-slider/keen-slider.min.css";

import { api } from "../../../server/api";
interface DataProps {
  data: itemType[];
}

type itemType = {
  picture_url: string;
  name: string;
  description: string;
  price: number;
};

export default function TopItems({ data }: DataProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 2.5,
      spacing: 12,
    },
  });

  console.log(data);

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold mb-3 text-gray-800 ">Destaques</h2>
      <div ref={sliderRef} className="keen-slider">
        {/* {topItems.map((item, index) => {
          return (
            <div
              key={index}
              className="keen-slider__slide flex flex-col mb-5 border shadow-lg bg-white p-2 rounded-lg cursor-pointer transition-all ease-in-out duration-300 hover:brightness-90"
              // onClick={() => setShowProduct(true)}
            >
              <Link href={`#`}>
                <Image
                  src={item.picture_url}
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
        })} */}
      </div>
    </div>
  );
}
