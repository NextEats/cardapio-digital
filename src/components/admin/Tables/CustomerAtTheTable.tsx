import { BsCheck, BsPerson } from "react-icons/bs";
import { CardapioDigitalButton } from "../cardapio-digital/CardapioDigitalButton";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FiTrash2 } from "react-icons/fi";
import { TableContext } from "@/src/contexts/TableControlContext";
import { useContext } from "react";

interface iCustomerAtTheTableProps {

}

export default function CustomerAtTheTable({ }: iCustomerAtTheTableProps) {

    const { isOpenedProductTableModal, setIsOpenedProductTableModal } = useContext(TableContext)

    return (
        <div>

            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 " >
                    <BsPerson size={32} />
                    <span className="text-lg font-medium"> 1 - Maria </span>
                </div>
                <CardapioDigitalButton name="Pedir" h="h-8" w="w-28" onClick={() => setIsOpenedProductTableModal(true)} />
            </div>

            <div className=" flex flex-col gap-2 mb-2">

                <div className="flex items-center justify-between pl-8" >
                    <div className="flex items-center gap-2 ">
                        <Checkbox.Root className="bg-red-400 flex items-center justify-center border-gray-400">
                            <Checkbox.Indicator >
                                <BsCheck />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        <span className="text-base font-semibold line-through w-28 sm:w-60 truncate"> X-Salada adsadas as das da dadasdasd sdasd asdas  </span>
                    </div>
                    <div className="flex items-center gap-2 ">
                        <span className="text-base font-medium text-green-300 w-24"> R$ 300</span>
                        <FiTrash2 size={24} className="text-red-400 cursor-pointer" />
                    </div>
                </div>


            </div>
        </div>
    )
}