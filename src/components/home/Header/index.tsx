import Image from "next/image";
import { FaStar, FaStarHalf, FaClock } from "react-icons/fa";
import { getDistance } from "geolib";
import { useEffect, useState } from "react";
import { IRestaurant } from "../../../types/home";
import Link from "next/link";
import { format } from "date-fns";

import RestaurantLocation from "./RestaurantLocation";

export default function Header({ restaurant }: { restaurant: IRestaurant }) {
  return (
    <div className="">
      <div className="flex flex-row items-center px-4 pt-4">
        <RestaurantAvatar />
        <div className="ml-10">
          <RestaurantLocation />
        </div>
        {/* <RestaurantInfo restaurant={restaurant} /> */}
      </div>
      <div className="w-full flex items-center my-5 border-t border-b border-gray-300">
        <div className="flex flex-row  mx-4">
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStar className="text-yellow-300 w-6 h-6" />
          <FaStarHalf className="text-yellow-300 w-6 h-6 mr-2" />
        </div>

        <span className="font-normal text-[0.8rem]">
          Avalidado por 356 clientes
        </span>
      </div>
    </div>
  );
}

function RestaurantAvatar() {
  return (
    <div className="flex items-center justify-center w-32 h-32 rounded-md">
      <Image
        src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
        alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
        className="rounded-md"
        width={200}
        height={200}
      />
    </div>
  );
}