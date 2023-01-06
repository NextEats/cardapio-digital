
import Image from "next/image";
import Header from "../components/pages/home/Header";
import { BiSearch } from "react-icons/bi";
import { useState } from "react"
import TopItems from "../components/pages/home/TopItems";
import Product from "../components/pages/home/product";

type categoryType = {
  name: string;
  imageUrl: string;
};

const categoriesData: categoryType[] = [
  {
    name: "Bebidas",
    imageUrl: "https://i.ibb.co/k8b1xLG/Inserir-um-subt-tulo-500-121-px.jpg",
  },
];


export default function HomePage() {

  const [showProduct, setShowProduct] = useState(false)
  
  return (  
    <div className="bg-gray-100">
      <Product setShowProduct={setShowProduct} showProduct={showProduct} />
      <div className="w-full  ">
        <Image
          className="w-full max-h-60"
          src="https://i.ibb.co/1sZhKFg/backgfroundheader.png"
          alt="backgfroundheader"
          width={200}
          height={200}
        />
      </div>
      <div className="">
        <Header />

        <hr className="border border-solid mt-6" />

        <div className="flex items-center gap-2 ml-4 mt-4 p-2 border rounded-md ">
          <BiSearch size={20}  />
          <input type="text" placeholder="Pesquisar" className="flex flex-1 bg-transparent outline-0 font-medium" />
        </div>

        <div className="p-4">
          <h2 className="text-xl font-bold mb-3 text-gray-800">Super promoção</h2>
        <Image
          className="w-full max-h-60"
          src="https://i.ibb.co/bNC5FbQ/promocao-desconto.jpg"
          alt="backgfroundheader"
          width={200}
          height={200}
        />
        </div>

        <div className="mt-5">
          <TopItems setShowProduct={setShowProduct} />
        </div>
        {/* <div className="mt-9">
          <Categories />
        </div> */}
      </div>
    </div>
  );
}

// function TopItems() {
//   return (
//     <div className="">
//       <h3 >Destaques</h3>
      
//     </div>
//   );
// }


// function Categories() {
//   return (
//     <div>
//       <h3 className="text-2xl font-bold mb-3 text-gray-800">Categorias</h3>
//       <div>
//         {categoriesData.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="flex flex-row mb-5 rounded-sm cursor-pointer transition-all ease-in-out duration-300 hover:bg-gray-200"
//             >
//               <Image
//                 src={item.imageUrl}
//                 className="rounded-xl cursor-pointer transition-all ease-in-out duration-300 hover:brightness-75"
//                 alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
//                 width={500}
//                 height={121}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
