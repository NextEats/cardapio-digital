import { iRestaurantWithFKData } from '@/src/types/types';
import Image from 'next/image';

import useGeolocation from 'react-hook-geolocation';

interface iRestaurantInfoHeaderMobile
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  restaurant: iRestaurantWithFKData;
}

export default function RestaurantInfoHeader(
  props: iRestaurantInfoHeaderMobile
) {
  const geolocation = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 15000,
    timeout: 12000,
  });

  const { restaurant } = props;
  return (
    <div className="flex flex-row items-center px-6" {...props}>
      <Image
        src={restaurant.picture_url}
        alt={restaurant.name}
        width={40}
        height={40}
        className="rounded"
      />
      <div className="ml-3">
        <span className="text-md font-semibold">{restaurant.name}</span>
      </div>
    </div>
  );
}
