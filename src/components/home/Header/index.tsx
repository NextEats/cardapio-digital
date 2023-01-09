import Image from "next/image";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { MdLocationOn, MdExpandMore } from "react-icons/md";

export default function Header() {
    return (
        <div className="">

            <div className="flex flex-row items-center px-4 pt-4">
                <RestaurantAvatar />
                <RestaurantInfo />
            </div>
            <div className="w-full flex items-center my-5 border-t border-b border-gray-300">

                <div className="flex flex-row  mx-4">
                    <FaStar className="text-yellow-300 w-6 h-6" />
                    <FaStar className="text-yellow-300 w-6 h-6" />
                    <FaStar className="text-yellow-300 w-6 h-6" />
                    <FaStar className="text-yellow-300 w-6 h-6" />
                    <FaStarHalf className="text-yellow-300 w-6 h-6 mr-2" />
                </div>

                <span className="font-normal text-[0.8rem]" >Avalidado por 356 clients</span>

                {/* <div className="mr-1 inline bg-gray-800 px-5 py-1 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                    <MdLocationOn className="inline text-white w-6 h-6 mr-2" />
                    <span className="text-white text-xs">Rua das Flores, 4321</span>
                    <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
                </div>
                <div className="inline bg-gray-800 px-5 py-1 rounded-full cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-600">
                    <FaClock className="inline text-white w-5 h-5 mr-2" />
                    <span className="text-white text-xs">Aberto até 23h</span>
                    <MdExpandMore className="inline text-white w-6 h-6 ml-2" />
                </div> */}
            </div>
        </div>

    )
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

function RestaurantInfo() {
    return (
        <div className="ml-3">
            <div className="font-bold text-xl">Quintal do Hambúrguer</div>
            <p className="text-gray-700 text-base">Hamburgueria</p>

        </div>
    );
}
