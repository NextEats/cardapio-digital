import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function SubmitButtons({ price }: { price: number }) {
  return (
    <div className="flex flex-1 items-center">
      <div className="w-[98px] h-10 flex items-center justify-between mr-2 px-3 bg-white-300 shadow-md rounded-md ">
        <AiOutlineMinus size={12} className="cursor-pointer" />
        <span className="text-xl text-gray-700 font-normal">1</span>
        <AiOutlinePlus size={12} className="cursor-pointer" />
      </div>

      <div className="h-10 flex flex-1 items-center justify-center bg-gray-700 shadow-md rounded-md">
        <div className="flex cursor-pointer">
          <span className="uppercase text-white text-md font-normal opacity-80">
            Adicionar ao Pedido
          </span>
          <span className="text-white mx-3 font-extrabold ">·</span>
          <span className="text-white font-semibold">R$ {price}&nbsp;</span>
        </div>
      </div>
    </div>
  );
}
