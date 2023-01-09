import Image from "next/image";
import Header from "../components/home/Header";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import TopItems from "../components/home/TopItems";
import Product from "../components/home/product";

export default function HomePage() {
  const [showProduct, setShowProduct] = useState(false);

  return (
    <div className="bg-[#222] flex justify-center">
      <div className="bg-gray-100 max-w-7xl w-full">
        <Product setShowProduct={setShowProduct} showProduct={showProduct} />
        <div className="w-full  ">
          <Image
            className="w-full max-h-60"
            src="https://i.ibb.co/1sZhKFg/backgfroundheader.png"
            alt="backgfroundheader"
            width={600}
            height={600}
          />
        </div>
        <div>
          <Header />

          <hr className="border border-solid mt-6" />

          <div className="flex items-center gap-2 ml-4 mt-4 p-2 border rounded-md ">
            <BiSearch size={20} />
            <input
              type="text"
              placeholder="Pesquisar"
              className="flex flex-1 bg-transparent outline-0 font-medium"
            />
          </div>

          <div className="mt-5">
            <TopItems setShowProduct={setShowProduct} />
          </div>
        </div>
      </div>
    </div>
  );
}
