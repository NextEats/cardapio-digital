import { BsArrowLeftCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { api } from "../../../server/api";
import { productType } from "../../../types/product";

interface IAdditionalData {
  id: string;
  name: string;
  price: number;
  picture: string;
}

interface ICategory {
  id: string;
  name: string;
  picture: string;
  isSelected: boolean;
}

interface IIngredientOptionsData {
  id: string;
  name: string;
  categorys: ICategory[];
}

interface IProductProps {
  showProduct: boolean;
  setShowProduct: Dispatch<SetStateAction<boolean>>;
  currentProduct: productType | undefined;
}

export default function Product({
  showProduct,
  setShowProduct,
  currentProduct,
}: IProductProps) {
  const [additional, setAdditional] = useState<IAdditionalData[]>([]);
  async function getAdditional() {
    const additionalData = await api.get("additional");
    setAdditional(additionalData.data);
  }

  const [ingredientsOption, setIngredientsOption] = useState<
    IIngredientOptionsData[]
  >([]);
  async function getIngredientsOption() {
    const ingredients = await api.get("ingredientOptions");
    setIngredientsOption(ingredients.data);
  }

  useEffect(() => {
    getIngredientsOption();
    getAdditional();
  }, []);

  if (showProduct && currentProduct) {
    return (
      <>
        <div
          className="absolute bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
          onClick={() => setShowProduct(false)}
        ></div>
        {showProduct && (
          <div
            className={`w-[545px] pb-9 px-4 bg-white top-0 right-0 z-[200] absolute overflow-auto shadow-2xl h-screen`}
          >
            <div className="sticky">
              <BsArrowLeftCircle
                className="my-8 cursor-pointer"
                size={30}
                onClick={() => setShowProduct(false)}
              />
              <div className="w-full flex items-center justify-center mb-9">
                <Image
                  src={currentProduct.picture}
                  alt="backgfroundheader"
                  width={500}
                  height={500}
                />
              </div>
              <div className="mb-9">
                <h1 className="font-extrabold text-xl text-gray-800 ">
                  {currentProduct.name}
                </h1>
                <p className="font-normal text-sm text-gray-800 ">
                  {currentProduct.description}
                </p>
              </div>

              {ingredientsOption.map((item) => {
                return (
                  <div className="mb-5" key={item.id}>
                    <h2 className="mb-4 font-semibold text-sm">{item.name}</h2>
                    <div className="flex flex-wrap gap-2">
                      {item.categorys.map((category) => {
                        return (
                          <label
                            onClick={() => getAdditional()}
                            key={category.id}
                          >
                            {/* <input hidden type="radio" onClick={() => }  name="input" id="" /> */}

                            <div className="w-[99px] h-[94px] rounded-lg relative cursor-pointer ">
                              <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-black via-transparent "></div>
                              <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium ">
                                {category.name}
                              </span>
                              <Image
                                src={category.picture}
                                alt="carne malpassada"
                                className={`wi-full h-full relative rounded-lg object-cover ${
                                  !category.isSelected && "contrast-50"
                                }`}
                                width={326}
                                height={358}
                              />
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              <div className="mb-24">
                <h2 className="mb-5 font-semibold text-sm">Adicionais</h2>
                {additional.map((item) => {
                  return (
                    <div key={item.id} className="flex flex-col mb-3">
                      <div className="flex flex-1 items-center justify-between pr-4 shadow-md rounded-md bg-white-300">
                        <div className="flex items-center gap-3">
                          <Image
                            src={item.picture}
                            alt="backgfroundheader"
                            width={91}
                            height={200}
                          />
                          <div className="">
                            <p className="font-extrabold text-black text-sm ">
                              {item.name}
                            </p>
                            <p className="font-semibold text-xs text-black">
                              R$ {item.price}
                            </p>
                          </div>
                        </div>
                        <BsFillPlusCircleFill
                          className="cursor-pointer"
                          color="3A3A3A"
                          size={25}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-1 items-center">
                <div className="w-[98px] h-10 flex items-center justify-between mr-2 px-3 bg-white-300 shadow-md rounded-md ">
                  <AiOutlinePlus size={12} className="cursor-pointer" />
                  <span className="text-xl text-gray-700 font-normal">1</span>
                  <AiOutlineMinus size={12} className="cursor-pointer" />
                </div>
                <div className=" h-10 flex flex-1 items-center gap-2 bg-gray-700 shadow-md rounded-md ">
                  <BsFillPlusCircleFill
                    className="ml-5"
                    color="#F7F7F7"
                    size={20}
                  />
                  <div className=" cursor-pointer">
                    <p className="uppercase text-white text-xs font-bold leading-4">
                      Adicionar ao pedido{" "}
                    </p>
                    <span className="text-white text-xs font-normal leading-3">
                      {" "}
                      R$ 27,00{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  } else {
    return <></>;
  }
}
