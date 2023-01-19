import { Dispatch, SetStateAction } from "react";
import { AiFillEye } from "react-icons/ai";
import { RiPencilFill } from "react-icons/ri";
import { iProductCategories } from "../../../types/types";

interface iCategoriesProps {
    productCategories: iProductCategories["data"]
}

export default function Categories({ productCategories }: iCategoriesProps) {
    console.log(productCategories)
    return (
        <div className=" w-full ">
            <table className="w-full border-collapse">
                <tbody className="">
                    {productCategories.map(category => {
                        return (
                            <tr key={category.id} className="">
                                <td className=" border-t-4 border-solid border-transparent text-base text-gray-700 font-medium">{ category.name }</td>
                                <td className=" border-t-4 border-solid border-transparent text-base text-gray-700 font-medium"> 13 itens </td>
                                <td className=" border-t-4 border-solid border-transparent text-right">
                                    <div className="flex items-center justify-end">
                                        <button className="w-7 h-6 flex items-center justify-center rounded-bl-md rounded-tl-md hover:scale-110 transition-all ease-in-out bg-gray-400">
                                            <AiFillEye className="text-base text-white" />
                                        </button>
                                        <button className="w-7 h-6 flex items-center justify-center rounded-tr-md rounded-br-md hover:scale-110 transition-all ease-in-out bg-blue-500 ">
                                            <RiPencilFill className="text-base text-white" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )

                    })}
                </tbody>
            </table>
        </div>
    )
}