import { BsCheck, BsPerson } from "react-icons/bs";
import { CardapioDigitalButton } from "../cardapio-digital/CardapioDigitalButton";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FiTrash2 } from "react-icons/fi";
import { TableContext } from "@/src/contexts/TableControlContext";
import { useContext } from "react";
import { iProduct, iProducts } from "@/src/types/types";

interface iCustomerAtTheTableProps {
    product: iProduct["data"]
    isInProduction: boolean
}

export default function CustomerAtTheTable({ product, isInProduction }: iCustomerAtTheTableProps) {

    return (
        <div className="flex items-center justify-between pl-8" >
            <div className="flex items-center gap-2 ">
                {/* <Checkbox.Root className="bg-red-400 flex items-center justify-center border-gray-400">
                    <Checkbox.Indicator >
                        <BsCheck />
                    </Checkbox.Indicator>
                </Checkbox.Root> */}
                <span className={`text-base font-semibold w-28 sm:w-60 truncate ${isInProduction ? 'text-blue-500' : 'text-red-500'}`}> {product.name} </span>
            </div>
            <div className="flex items-center gap-2 ">
                <span className="text-base font-medium text-green-300 w-24"> R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <FiTrash2 size={24} className="text-red-400 cursor-pointer" />
            </div>
        </div>

    )
}