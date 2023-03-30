import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import cep from 'cep-promise';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { MdExpandMore, MdLocationOn } from 'react-icons/md';

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
        <>
            {restaurant.banner_url ? (
                <div
                    className="h-[230px] w-full flex justify-center items-center relative"
                    style={{
                        backgroundImage: `url(${restaurant.banner_url})`,
                        backgroundSize: 'auto 100%',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                    }}
                >
                    {/* <Image
                        src={restaurant.banner_url}
                        alt=""
                        width={2500}
                        height={430}
                    /> */}
                </div>
            ) : null}

            <div className="px-3 py-2 my-7 flex flex-row z-[0] bg-white relative">
                <Image
                    src={restaurant.picture_url}
                    alt={restaurant.name}
                    width={130}
                    height={130}
                    className="rounded-md"
                />
                <div className="ml-5 flex items-center justify-center h-[130px] py-2 flex-col">
                    <h1 className="text-2xl font-semibold text-[#3e3e3e]">
                        {restaurant.name}
                    </h1>
                </div>
            </div>
            <div className="flex flex-col 3xs:flex-row gap-2 mt-2 ml-3 pb-3 pr-2">
                {restaurant.addresses.google_maps_link ? (
                    <Link
                        href={restaurant.addresses.google_maps_link}
                        target="_blank"
                    >
                        <div className="flex items-center justify-center bg-gray-800 px-5 py-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                            <MdLocationOn className="inline text-white text-xl mr-2" />
                            <span className="text-white text-sm pr-2">
                                {street}, {restaurant.addresses.number}
                            </span>
                        </div>
                    </Link>
                ) : null}

                <div
                    onClick={() =>
                        modals?.set((prev) => {
                            return {
                                ...prev,
                                operatingTime: true,
                            };
                        })
                    }
                    className="flex items-center justify-center bg-green-800 px-5 py-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600"
                >
                    <FaClock className="inline text-white text-xl mr-2" />
                    <span className="text-white text-sm">
                        Horário de Funcionamento
                    </span>
                    <MdExpandMore className="inline text-white text-xl ml-2" />
                </div>
            </div>
        </>
    );
}
