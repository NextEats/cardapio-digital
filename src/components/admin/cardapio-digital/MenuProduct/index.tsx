import Image from "next/image";
import { AiFillEye } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { iProduct  } from "../../../../types/types";

interface iMenuProduct {
    prosuctIsOutOfStock?: boolean;
    product: iProduct["data"]
}

export default function MenuProduct( { product }: iMenuProduct ) {
    return (
        <div className="flex flex-col gap-2">
            <div className="bg-white shadow-sm h-10 w-full flex items-center rounded-md  hover:shadow-md hover:transition-all ease-in-out">
                <Image
                    className="rounded-tl-md rounded-bl-md h-full"
                    src={product.picture_url}
                    alt=""
                    width={40}
                    height={40}
                />
                <div className="w-full flex items-center justify-between px-2">
                    <div className="flex flex-col items-start justify-start gap-1 overflow-hidden">
                        <span className="text-base font-bold text-gray-600 leading-3 truncate" > { product.name } </span>
                        <span className="text-xs font-semibold text-green-500 leading-3" > R$ { product.price } </span>
                    </div>
                    {/* <span className="text-base font-bold text-gray-600 mx-4 hidden 3xs:flex "> Falta ovo  </span> */}
                    <div className="flex items-center justify-end">
                        <button className="w-7 h-6 flex items-center justify-center rounded-bl-md rounded-tl-md hover:scale-110 transition-all ease-in-out bg-gray-400">
                            <AiFillEye className="text-base text-white" />
                        </button>
                        <button className="w-7 h-6 flex items-center justify-center rounded-tr-md rounded-br-md hover:scale-110 transition-all ease-in-out bg-blue-500 ">
                            <RiPencilFill className="text-base text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
