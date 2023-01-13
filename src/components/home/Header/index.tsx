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

// function RestaurantInfo({ restaurant }: { restaurant: IRestaurant }) {
//   const [userPosition, setUserPosition] = useState<{
//     latitude: number;
//     longitude: number;
//   }>({ latitude: 0, longitude: 0 });
//   const { latitude, longitude, type, name, schedules } = restaurant;

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setUserPosition({
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//         });
//       },
//       (error) => console.error(error),
//       { enableHighAccuracy: true }
//     );
//   }, []);

//   const restaurantPosition = { latitude, longitude };
//   const distance = getDistance(userPosition, restaurantPosition) / 1000; // Distance in km

//   function getDailySchadule() {
//     const weekDay = format(new Date(), "eeee");
//     console.log(schedules);

//     switch (weekDay) {
//       case "Monday":
//         return ` ${schedules.monday} `;
//       case "Tuesday":
//         return closedOrOpened(
//           schedules.tuesday.opensAt,
//           schedules.tuesday.closesAt
//         );
//         break;
//       case "Wednesday":
//         return closedOrOpened(
//           schedules.tuesday.opensAt,
//           schedules.tuesday.closesAt
//         );
//       case "Thursday":
//         return closedOrOpened(
//           schedules.tuesday.opensAt,
//           schedules.tuesday.closesAt
//         );
//       case "Friday":
//         return closedOrOpened(
//           schedules.friday.opensAt,
//           schedules.friday.closesAt
//         );
//       case "Saturday":
//         return closedOrOpened(
//           schedules.tuesday.opensAt,
//           schedules.tuesday.closesAt
//         );
//       case "Sunday":
//         return closedOrOpened(
//           schedules.tuesday.opensAt,
//           schedules.tuesday.closesAt
//         );
//       default:
//         return null;
//     }
//   }

//   function closedOrOpened(
//     scheduleDayOpensAt: string,
//     scheduleDayClosesAt: string
//   ) {
//     const currentHours = new Date().getHours();
//     const openHours = Number(scheduleDayOpensAt.split(":")[0]);
//     const closeHours = Number(scheduleDayClosesAt.split(":")[0]);
//     console.log(openHours, closeHours, currentHours);
//     return currentHours >= openHours && currentHours < closeHours
//       ? `fecha às ${scheduleDayClosesAt}`
//       : `Abre às ${scheduleDayOpensAt}`;
//   }

//   return (
//     <div className="ml-3">
//       <div className="font-bold text-xl">{name}</div>
//       <Link
//         target={"_blank"}
//         href={
//           "https://www.google.com/maps/place/Estreito,+Petrol%C3%A2ndia+-+State+of+Pernambuco,+56460-000/@-8.749198,-38.260343,15z/data=!3m1!4b1!4m5!3m4!1s0x709bc190fcc0b2b:0x5bb93f4caa4bf8ed!8m2!3d-8.7491958!4d-38.250044"
//         }
//       >
//         <span className="text-gray-700 text-base "> {type} - </span>{" "}
//         <span className="text-blue-500">{distance} km</span>
//       </Link>
//       <div
//         className={`h-[20px] w-[108px] rounded flex items-center justify-center shadow-sm mt-3`}
//       >
//         <span
//           className={`font-normal text-sm ${
//             getDailySchadule()![0] == "f" ? "text-green-500" : "text-red-500"
//           }`}
//         >
//           {getDailySchadule()}
//         </span>
//       </div>
//     </div>
//   );
// }
