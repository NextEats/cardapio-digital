import AdminWrapper from "../../../components/admin/AdminWrapper";
import ProductHorizontalScrollList from "../../../components/ProductHorizontalScrollList";
import Categories from "../../../components/admin/Categories";
import MenuProduct from "../../../components/admin/MenuProduct";
import Image from "next/image";
import { AiOutlinePlus } from "react-icons/ai";

type IngredientData = {
  id: number;
  name: string;
};

const Ingredients: IngredientData[] = [
  {
    id: 1,
    name: "Queijo Muçarela",
  },
  {
    id: 2,
    name: "Pão",
  },
];

type ProductData = {
  id: number;
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  profitMargin: number;
  ingredients: number[];
};

const products: ProductData[] = [
  {
    id: 0,
    imageUrl:
      "https://i.ibb.co/PwDK3Xn/208c90f0-5596-48a4-a1ce-aebb38cf789d.jpg",
    name: "Combo X-Bacon + Fritas",
    description:
      "Molho da casa, hambúrguer 150g, cebola roxa, picles, tomate, alface e queijo prato.",
    price: 22,
    profitMargin: 2,
    ingredients: [1, 2, 3],
  },
];

export default function AdminHomepage() {
  const tdClasses = "[&:not(:last-child)]:p-4";

  return (
    <AdminWrapper>
      <div className="flex gap-10">
        <div className="flex flex-col flex-1 ">
          <h2 className="text-xl font-bold text-gray-700"> Destaques </h2>

          <div className="flex items-center justify-between mb-5 mt-7">
            <h2 className="text-xl font-bold text-gray-700 "> Categorias </h2>
            <input type="text" placeholder="Pesquisar" 
              className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
            <button className="text-base font-semibold text-white flex items-center justify-center gap-1 h-6 w-20 rounded-md bg-green-300 ">
              Novo
              <AiOutlinePlus />
            </button>
          </div>
          <Categories />

          <div className="flex items-center justify-between mb-5 mt-7 mr-20">
            <h2 className="text-xl font-bold text-gray-700 "> itens em falta </h2>
            <input type="text" placeholder="Pesquisar" 
              className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
          </div>
          <MenuProduct />

          <div className="flex items-center justify-between mb-5 mt-7">
            <h2 className="text-xl font-bold text-gray-700 "> Itens do cardápio </h2>
            <input type="text" placeholder="Pesquisar" 
              className="mx-8 h-6 pb-1 max-w-64 px-2 text-gray-600 text-sm font-semibold placeholder:text-gray-500 rounded outline-none border border-solid border-gray-400" />
            <button className="text-base font-semibold text-white flex items-center justify-center gap-1 h-6 w-20 rounded bg-green-300 ">
              Novo
              <AiOutlinePlus />
            </button>
          </div>
          <MenuProduct />

        </div>
        <div className="w-[360px] fixed right-0 top-16 bg-white shadow-md rounded-md h-[calc(100vh-64px)] p-4 2md:sticky 2md:h-auto">
          <Image
            className="rounded-tl-md rounded-bl-md w-full"
            src="https://i.ibb.co/8KnTRXt/pao.png"
            alt=""
            width={40}
            height={40}
          />
        </div>
      </div>
    </AdminWrapper>
  );
}
