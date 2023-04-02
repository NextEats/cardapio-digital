import cepPromise from 'cep-promise';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';

function RestaurantHeader() {
    const { modals, restaurant } = useContext(DigitalMenuContext);
    const [street, setStreet] = useState<string>('');

    useEffect(() => {
        async function fetchAddress() {
            if (restaurant?.addresses.cep) {
                const address = await cepPromise(restaurant?.addresses.cep);
                setStreet(address.street);
            }
        }
        fetchAddress();
    }, [restaurant?.addresses.cep]);

    const handleOperatingTimeClick = () =>
        modals?.set((prev) => ({
            ...prev,
            operatingTime: true,
        }));

    const iconsClasses =
        'flex items-center justify-center h-12 w-12 border border-gray-500 hover:text-white text-gray-500 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600';

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
                    />
                    <div className="ml-5 flex justify-center h-[130px] py-2 flex-col">
                        <h1 className="text-2xl font-semibold text-[#3e3e3e]">
                            {restaurant.name}
                        </h1>
                        <span className="mt-1 text-green-600 font-semibold">
                            Aberto Agora
                        </span>
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

                        <div
                            className={iconsClasses}
                            onClick={handleOperatingTimeClick}
                        >
                            <FaClock className="inline text-2xl" />
                        </div>
                        {/* <div className={iconsClasses}>
                            <FaDollarSign className="inline text-2xl" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RestaurantHeader;
