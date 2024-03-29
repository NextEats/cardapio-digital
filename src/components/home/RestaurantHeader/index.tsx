import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { isRestaurantOpenNow } from '@/src/helpers/isRestaurantOpenNow';
import { supabase } from '@/src/server/api';
import { iCashBox } from '@/src/types/iCashBox';
import { iWeekdayOperatingTimeWithFKData } from '@/src/types/iWeekday';

async function fetchAddressFromCep(cep: string) {
  try {
    const response = await fetch(`/api/get-address-from-cep?cep=${cep}`);

    if (!response.ok) {
      throw new Error('Failed to fetch address from CEP');
    }

    const { address } = await response.json();
    return address;
  } catch (error) {
    console.error('Error fetching address from CEP API:', error);
    return null;
  }
}

function RestaurantHeader() {
  const { modals, restaurant } = useContext(DigitalMenuContext);
  const [street, setStreet] = useState<string>('');
  const [currentCashbox, setCurrentCashbox] = useState<any>();
  const [operatingTimes, setOperatingTimes] = useState<
    iWeekdayOperatingTimeWithFKData[]
  >([]);

  useEffect(() => {
    async function fetchAddress() {
      if (restaurant?.addresses.cep) {
        const address = await fetchAddressFromCep(restaurant?.addresses.cep);

        if (address) {
          const [streetName] = address.split(',');
          setStreet(streetName.trim());
        }
      }
    }

    fetchAddress();
  }, [restaurant?.addresses.cep]);

  const handleOperatingTimeClick = () =>
    modals?.set(prev => ({
      ...prev,
      operatingTime: true,
    }));

  const iconsClasses =
    'flex items-center justify-center h-12 w-12 border border-gray-500 hover:text-white text-gray-500 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600';

  useEffect(() => {
    async function getCurrentCashbox() {
      const { data: currentCashBoxData } = await supabase
        .from('cash_boxes')
        .select('*')
        .match({ restaurant_id: restaurant!.id, is_open: true });

      const currentCashBox =
        currentCashBoxData![0] as unknown as iCashBox['data'];

      setCurrentCashbox(currentCashBox);
    }
    getCurrentCashbox();
  }, [restaurant]);

  useEffect(() => {
    async function fetchOperatingTimes() {
      const { data: operatingTimes } = await supabase
        .from('weekday_operating_time')
        .select('*, weekdays (*)')
        .match({ restaurant_id: restaurant?.id, is_active: true })
        .returns<iWeekdayOperatingTimeWithFKData[]>();
      setOperatingTimes(operatingTimes || []);
    }
    fetchOperatingTimes();
  }, [restaurant]);

  // function getDayName(weekDayIndex: number) {
  //   const days = [
  //     null,
  //     'domingo',
  //     'segunda',
  //     'terça',
  //     'quarta',
  //     'quinta',
  //     'sexta',
  //     'sábado',
  //   ];
  //   return days[weekDayIndex];
  // }

  // function isRestaurantOpenNow() {
  //   const now = new Date();
  //   const currentWeekDayIndex = now.getDay() + 1;
  //   const adjustedWeekDayIndex =
  //     currentWeekDayIndex === 0 ? 7 : currentWeekDayIndex;
  //   const currentWeekDayName = getDayName(adjustedWeekDayIndex);
  //   const currentTime = now.toTimeString().slice(0, 8);

  //   return operatingTimes.some(({ opening_time, closing_time, weekdays }) => {
  //     return (
  //       opening_time !== null &&
  //       closing_time !== null &&
  //       weekdays.name.split('-')[0].toLocaleLowerCase() ===
  //         currentWeekDayName &&
  //       currentTime >= opening_time &&
  //       currentTime <= closing_time
  //     );
  //   });
  // }
  // console.log(operatingTimes);
  // console.log(isRestaurantOpenNow({ operatingTimes }));

  if (!restaurant) return null;

  return (
    <div className="flex justify-center flex-col mb-5">
      {restaurant.banner_url && (
        <div
          className="h-[230px] w-full flex justify-center items-center xl:rounded relative xl:mt-3 "
          style={{
            backgroundImage: `url(${restaurant.banner_url})`,
            backgroundSize: 'auto 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
          }}
        />
      )}

      <div className="-mt-12 mx-auto w-[90%] bg-white p-5 rounded flex flex-col md:flex-row items-center z-[0] shadow-lg">
        <div className="flex flew-row">
          <Image
            src={restaurant.picture_url}
            alt={restaurant.name}
            width={130}
            height={130}
            className="rounded-md"
            priority={true}
          />
          <div className="ml-5 flex justify-center h-[130px] py-2 flex-col">
            <h1 className="text-2xl font-semibold text-[#3e3e3e]">
              {restaurant.name}
            </h1>
            {currentCashbox && isRestaurantOpenNow({ operatingTimes }) ? (
              <span className="mt-1 text-green-600 font-semibold">
                Aberto Agora
              </span>
            ) : (
              <span className="mt-1 text-red-600 font-semibold">
                Fechado Agora
              </span>
            )}
          </div>
        </div>
        <div className="mx-auto mt-7 sm;mt-0 sm:ml-auto sm:mr-0">
          <div className="flex flex-row gap-x-2">
            {restaurant.addresses.google_maps_link && (
              <Link
                href={restaurant.addresses.google_maps_link}
                target="_blank"
              >
                <div className={iconsClasses}>
                  <MdLocationOn className="inline text-3xl" />
                </div>
              </Link>
            )}

            <div className={iconsClasses} onClick={handleOperatingTimeClick}>
              <FaClock className="inline text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantHeader;
