import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { getDistance } from 'geolib';
import { useCallback, useState } from "react";
import { api } from "../../../server/api";
import { IRestaurant } from "../../../types/home";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { format, getHours, isWithinInterval } from "date-fns";


export default function Header({ restaurant }: { restaurant: IRestaurant }) {
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

function RestaurantInfo({ restaurant }: { restaurant: IRestaurant }) {

  const [userPosition, setUserPosition] = useState<{ latitude: number; longitude: number }>({ latitude: 0, longitude: 0 });
  const { latitude, longitude, type, name, schedules } = restaurant
  let time

  useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => { setUserPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude }); },
      (error) => console.error(error),
      { enableHighAccuracy: true }
    );
  }, []);

  const restaurantPosition = { latitude, longitude };
  const distance = getDistance(userPosition, restaurantPosition) / 1000; // Distance in km

  function getDailySchedule() {
    const weekDay = format(new Date(), 'eeee')

    switch (weekDay) {
      case "Monday":
        return isOpen(schedules.monday.opensAt, schedules.monday.closesAt)
        break
      case "Tuesday":
        return isOpen(schedules.tuesday.opensAt, schedules.tuesday.closesAt)
        break
      case "Wednesday":
        return isOpen(schedules.wednesday.opensAt, schedules.wednesday.closesAt)
        break
      case "Thursday":
        return isOpen(schedules.thursday.opensAt, schedules.thursday.closesAt)
        break
      case "Friday":
        return isOpen(schedules.friday.opensAt, schedules.friday.closesAt)
        break
      case "Saturday":
        return isOpen(schedules.saturday.opensAt, schedules.saturday.closesAt)
        break
      case "Sunday":
        return isOpen(schedules.sunday.opensAt, schedules.sunday.closesAt)
        break
      default:
        return null
    }
  }


  function isOpen(scheduleDayOpensAt: string, scheduleDayClosesAt: string) {
    const openTime = scheduleDayOpensAt.split(":")
    const closeTime = scheduleDayClosesAt.split(":")

    const openDate = new Date();
    openDate.setHours(Number(openTime[0]), Number(openTime[1]), 0)
    
    const closeDate = new Date();
    closeDate.setHours(Number(closeTime[0]), Number(closeTime[1]), 0)

    if( closeTime[0] < openTime[0]){
      closeDate.setDate(closeDate.getDate() + 1);
    }
   
    const currentTime = new Date();

    if(!isWithinInterval(currentTime, { start: openDate, end: closeDate })) {
      time = scheduleDayOpensAt
      return false;
    }
    time = scheduleDayClosesAt
    return true;   
  }

  return (
    <div className="ml-3">
      <div className="font-bold text-xl">{name}</div>
      <Link target={"_blank"} href={"https://www.google.com/maps/place/Estreito,+Petrol%C3%A2ndia+-+State+of+Pernambuco,+56460-000/@-8.749198,-38.260343,15z/data=!3m1!4b1!4m5!3m4!1s0x709bc190fcc0b2b:0x5bb93f4caa4bf8ed!8m2!3d-8.7491958!4d-38.250044"}>
        <span className="text-gray-700 text-base "> {type} - </span> <span className="text-blue-500">{distance} km</span>
      </Link>
      <div className={`h-[20px] w-[108px] rounded flex items-center justify-center shadow-sm mt-3`}>
        <span className={`font-normal text-sm ${
          getDailySchedule() ? 'text-green-500' : 'text-red-500'}`}>{getDailySchedule() ? `fecha às ${time} ` : `Abre às ${time} `}
        </span>
      </div>
    </div>
  );
}
