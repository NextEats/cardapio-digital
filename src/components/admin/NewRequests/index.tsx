import Image from "next/image";
import { AiFillEye, AiOutlineCheck } from "react-icons/ai";

export default function NewRequests() {
  const tdStyle =
    "border-collapse border-l-2 px-2 border-gray-300 text-sm font-medium";

  return (
    <div className="flex flex-1 flex-col min-h-[230px] bg-white w-auto shadow-sm px-6 pt-2 rounded-md ">
      <h2 className="text-base font-bold mb-4">Novos pedidos</h2>
      <div>
        <table className="w-full ">
          <tbody className="w-full border-collapse ">
            <tr className="w-full h-4 text-center">
              <td>
                <Image
                  src="https://i.ibb.co/d0MYCmv/Design-sem-nome.jpg"
                  alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                  className="rounded-full"
                  width={26}
                  height={26}
                />
              </td>
              <td className="text-left h-4 text-sm font-medium p-2">
                Fulano da silva
              </td>
              <td className={`${tdStyle} w-16 hidden 3xs:table-cell`}>3</td>
              <td className={`${tdStyle} hidden 3xs:table-cell`}>R$ 256,90</td>
              <td
                className={`${tdStyle} w-auto text-ellipsis whitespace-nowrap overflow-hidden hidden sm:table-cell`}
              >
                (87) 99999 - 9999
              </td>
              <td
                className={`${tdStyle} w-auto text-ellipsis whitespace-nowrap overflow-hidden hidden lg:table-cell`}
              >
                Rua Osvaldo de lima, 456 ...
              </td>
              <td className={`${tdStyle}`}>
                <div className="flex items-center justify-center gap-2">
                  <div className="rounded-full pl-[1px] w-8 h-6 bg-gray-400 cursor-pointer flex items-center justify-center">
                    <AiFillEye className="text-xl text-white" />
                  </div>
                  <button className=" w-10 h-6 pb-[1px] rounded-full  bg-green-400 text-white text-base font-bold flex items-center justify-center">
                    <AiOutlineCheck className="w-4 h-4 " />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
