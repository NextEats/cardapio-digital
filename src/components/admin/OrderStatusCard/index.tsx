import Image from "next/image";
import { AiFillEye } from "react-icons/ai";
import { BiArrowFromLeft } from "react-icons/bi";

interface IOrderStatusCardProps {
  statusName: string;
}

export default function OrderStatusCard({ statusName }: IOrderStatusCardProps) {
  const tdStyle =
    "border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium";

  return (
    <div className="flex flex-1 min-h-[240px] flex-col shadow-sm px-4 pt-2 pb-4">
      <div className=" flex items-center justify-between mb-4">
        <h2 className="text-base font-bold"> {statusName} </h2>
        <span className="text-md font-medium">3</span>
      </div>

      <table className="w-full ">
        <tbody className="w-full border-collapse ">
          <tr className="w-full h-4 text-center ">
            <td>
              <Image
                src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
                alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                className="rounded-full mx-2"
                width={26}
                height={26}
              />
            </td>
            <td className="text-left h-4 text-sm font-medium border-l-2 border-gray-300 px-2">
              Fulano da silva
            </td>
            <td className={`${tdStyle} w-16`}>3</td>
            <td className={tdStyle}> 00 : 15 </td>
            <td className={`${tdStyle}`}>
              <div className="flex items-center justify-center gap-2">
                <div className="rounded-full pl-[1px] w-8 h-6 bg-gray-400 cursor-pointer flex items-center justify-center">
                  <AiFillEye className="text-xl text-white" />
                </div>
                <button className=" w-12 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center">
                  <BiArrowFromLeft className="text-xl text-white" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
