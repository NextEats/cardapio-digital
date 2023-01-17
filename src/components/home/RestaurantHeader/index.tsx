import Image from "next/image";

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
      <div className="h-[230px] w-full bg-gradient-to-r from-sky-500 to-indigo-500"></div>
      <div className="m-3 flex flex-row">
        <Image
          src={restaurant.picture_url}
          alt={restaurant.name}
          width={130}
          height={130}
          className="rounded-md"
        />
        <div>
          <h1>Quintal do Hambúrguer</h1>
          {restaurantType?.name}
        </div>
      </div>
    </div>
  );
}
