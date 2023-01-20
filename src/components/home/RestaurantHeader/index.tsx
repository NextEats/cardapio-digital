import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";

import { iRestaurant, iRestaurantType } from "./../../../types/types";

interface iRestaurantHeader {
  restaurant: iRestaurant["data"];
  restaurantType: iRestaurantType["data"] | null | undefined;
}

export default function RestaurantHeader({
  restaurant,
  restaurantType,
}: iRestaurantHeader) {
  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(to bottom, rgba(32, 32, 32, 0.106), rgba(24, 24, 24, 0.859)), url(" +
            restaurant.banner_url +
            ") no-repeat",
          backgroundSize: "cover",
        }}
        className="h-[230px] w-full"
      ></div>
      <div className="mx-3 my-7 flex flex-row">
        <Image
          src={restaurant.picture_url}
          alt={restaurant.name}
          width={130}
          height={130}
          className="rounded-md"
        />
        <div className="ml-5 mt-3">
          <h1 className="text-2xl font-semibold text-[#3e3e3e]">
            Quintal do Hambúrguer
          </h1>
          <span className="text-md text-[#676767]">{restaurantType?.name}</span>
          <RestaurantRate averageRating={4.5} />
        </div>
      </div>
    </div>
  );
}

function RestaurantRate({ averageRating }: { averageRating: number }) {
  // round the rating to the nearest half and store it in the variable rating
  let rating = Math.round(averageRating * 2) / 2;
  // create an empty array to store the stars
  let stars = [];

  // loop through 5 times, once for each star
  for (let i = 0; i < 5; i++) {
    // if the rating is greater than or equal to 1, it should be a full star
    if (rating >= 1) {
      stars.push(<FaStar className="text-yellow-400 text-2xl inline" />);
    }
    // if the rating is greater than or equal to 0.5 and less than 1, it should be a half star
    else if (rating >= 0.5) {
      stars.push(<FaStarHalf className="text-yellow-400 text-2xl inline" />);
    }
    // if the rating is less than 0.5, it should be no star
    else {
      stars.push(<></>);
    }
    // decrement the rating by 1
    rating--;
  }

  // return the div containing the stars
  return <div className="block mt-3">{stars}</div>;
}
