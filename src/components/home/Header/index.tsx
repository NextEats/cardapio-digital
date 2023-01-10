import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { getDistance } from 'geolib';
import { useEffect, useState } from "react";
import { api } from "../../../server/api";
import { IRestaurant } from "../../../types/home";
import { GetServerSideProps } from "next";

export default function Header( { restaurant }: { restaurant: IRestaurant } ) {
  return (
    <div className="">
      <div className="flex flex-row items-center px-4 pt-4">
        <RestaurantAvatar />
        <RestaurantInfo restaurant={restaurant} />
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

        {/* <div className="mr-1 inline bg-gray-800 px-5 py-1 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                    <MdLocationOn className="inline text-white w-6 h-6 mr-2" />
                    <span className="text-white text-xs">Rua das Flores, 4321</span>
                    <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
                </div>
                <div className="inline bg-gray-800 px-5 py-1 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                    <FaClock className="inline text-white w-5 h-5 mr-2" />
                    <span className="text-white text-xs">Aberto até 23h</span>
                    <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
                </div> */}
      </div>
    </div>
  );
}

function RestaurantAvatar( ) {
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

function RestaurantInfo({ restaurant }: { restaurant: IRestaurant }) {

  const [userPosition, setUserPosition] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
        (position) => { setUserPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude }); },
        (error) => console.error(error),
        { enableHighAccuracy: true }
    );
}, []);

console.log(restaurant)
const restaurantPosition = { latitude: restaurant.latitude , longitude: restaurant.longitude };
const distance = getDistance(userPosition, restaurantPosition) / 1000; // Distance in km

  return (
    <div className="ml-3">
      <div className="font-bold text-xl">{ restaurant.name }</div>
      <p className="text-gray-700 text-base"> {restaurant.type} - {distance} km</p>
    </div>
  );
}
