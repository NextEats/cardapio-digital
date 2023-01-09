import { GetServerSideProps } from "next";

import Image from "next/image";
import Link from "next/link";

import { BiSearch } from "react-icons/bi";
import { useState } from "react";

import Header from "../components/home/Header";
import Product from "../components/home/product";

import { api } from "../server/api";

interface DataProps {
  data: itemType[];
}

type itemType = {
  picture: string;
  name: string;
  description: string;
  price: number;
};

export default function HomePage({ data }: DataProps) {
  const [showProduct, setShowProduct] = useState(false);

  console.log(data);

  return (
    <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
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

          <TopItems data={data} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const topItems = await api.get("topitems");

  return {
    props: {
      data: topItems.data,
    },
  };
};

function TopItems({ data }: { data: itemType[] }) {
  return (
    <div className="flex flex-row p-4 max-w-full overflow-x-auto overscroll-x-contain touch-manipulation overflow-hidden">
      {data.map((item, index) => {
        return (
          <div
            key={index}
            className="flex flex-col mr-3 mb-5 p-4
                    lg:min-w-[300px] lg:flex-row
                    min-w-[180px]
                    items-center border shadow-lg bg-whitep-4 rounded-lg cursor-pointer 
                    transition-all ease-in-out duration-300 hover:brightness-90"
          >
            <div className="max-w-32 max-h-32 h-full w-full">
              <Link href={`#`}>
                <Image
                  src={item.picture}
                  className="rounded-xl"
                  alt="208c90f0-5596-48a4-a1ce-aebb38cf789d"
                  width={120}
                  height={120}
                />
              </Link>
            </div>
            <div className="ml-3 flex flex-col">
              <span className="text-lg text-gray-600 font-extrabold mt-3 lg:mt-0">
                {item.name}
              </span>
              <span className="mt-2 text-base font-semibold text-green-100 before:content-['R$']">
                {" "}
                {item.price}{" "}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
