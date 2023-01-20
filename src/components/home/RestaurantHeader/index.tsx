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
      <div
        style={{ background: "url(" + restaurant.banner_url + "" }}
        className="h-[230px] w-full"
      ></div>
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
