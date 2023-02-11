import { FaUtensils } from "react-icons/fa";

export default function OpenCheckoutButton({ products }: { products: any }) {
  return (
    <div className="h-16 flex flex-row items-center justify-between bg-gray-900 cursor-pointer rounded-md">
      <FaUtensils className="text-white text-xl ml-10" />
      <span className="text-white text-lg block p-0 m-0 font-semibold pl-10">
        MEU PEDIDO
      </span>
      <span className="text-white mr-10 text-md">R$ </span>
    </div>
  );
}
