import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import Image from 'next/image';
import { useContext } from 'react';

export default function RestaurantInfoHeader() {
  const { restaurant } = useContext(DigitalMenuContext);

  return (
    <div className="flex flex-row items-center px-6">
      <Image
        src={restaurant!.picture_url}
        alt={restaurant!.name}
        width={40}
        height={40}
        className="rounded"
      />
      <div className="ml-3">
        <span className="text-md font-semibold">{restaurant!.name}</span>
      </div>
    </div>
  );
}
