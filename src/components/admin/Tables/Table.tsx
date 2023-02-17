import { iTable } from "@/src/types/types";
import { BsPeople } from "react-icons/bs";
import { FaHome } from "react-icons/fa";

interface iTableProps {
    table: iTable["data"]
}

export default function Table({ table }: iTableProps) {
    const tableStatusColor = `
    ${table.is_occupied ? 'text-blue-400' :
            table.is_reserved ? 'text-red-400' : 'text-gray-400'
        }
    `

    return (
        <div className="flex flex-1 flex-col border-l-8 border-gray-400 rounded-md bg-white shadow-md py-2 pr-3 pl-4">
            <div className="flex flex-1 items-center justify-end ">
                <span className="text-sm font-medium flex items-center text-gray-500" > <span className="mr-2"> 3 </span> <BsPeople size={16} /> </span>
            </div>
            <div className="flex flex-1 gap-3 mb-4">
                <FaHome className="text-gray-350" size={32} />
                <div className="flex flex-col gap-4" >
                    <span className="text-lg font-bold ">Mesa {table.id}</span>
                    <span className="text-sm font-medium "> Aguadando cliente </span>
                </div>
            </div>
            <span className={`w-full  text-xs font-normal text-right` + tableStatusColor}>
                {
                    table.is_occupied ? 'Ocupada' :
                        table.is_reserved ? 'Reservada' : 'Livre'
                }
            </span>
        </div>
    )
}