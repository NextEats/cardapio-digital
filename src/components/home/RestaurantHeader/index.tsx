import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import cep from 'cep-promise';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaClock, FaDollarSign } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

export default function RestaurantHeader() {
    const { restaurant, modals } = useContext(DigitalMenuContext);

    const [street, setStreet] = useState<string>('');

    useEffect(() => {
        if (restaurant?.addresses.cep) {
            cep(restaurant?.addresses.cep).then((res) => {
                setStreet(res.street);
            });
        }
    }, [restaurant?.addresses.cep]);

    if (!restaurant) {
        return null;
    }

    return (
        <div className="flex justify-center flex-col mb-5">
            {restaurant.banner_url ? (
                <div
                    className="h-[230px] w-full flex justify-center items-center relative lg:mt-3"
                    style={{
                        backgroundImage: `url(${restaurant.banner_url})`,
                        backgroundSize: 'auto 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        borderRadius: '5px'
                    }}
                ></div>
            ) : null}

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
                <div className="ml-auto mr-0 ">
                    <div className="flex flex-row gap-x-2">
                        {restaurant.addresses.google_maps_link ? (
                            <Link
                                href={restaurant.addresses.google_maps_link}
                                target="_blank"
                            >
                                <div className="flex items-center justify-center h-12 w-12 bg-gray-700 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                                    <MdLocationOn className="inline text-white text-3xl" />
                                </div>
                            </Link>
                        ) : null}

                        <div
                            className="flex items-center justify-center h-12 w-12 bg-gray-700 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600"
                            onClick={() =>
                                modals?.set((prev) => {
                                    return {
                                        ...prev,
                                        operatingTime: true,
                                    };
                                })
                            }
                        >
                            <FaClock className="inline text-white text-2xl" />
                        </div>
                        <div className="flex items-center justify-center h-12 w-12 bg-gray-700 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                            <FaDollarSign className="inline text-white text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
