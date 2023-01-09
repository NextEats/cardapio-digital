import { BsArrowLeftCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { api } from "../../../server/api";

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
}

export default function Product({
  showProduct,
  setShowProduct,
}: IProductProps) {
  // const additionalData: IAdditionalData[] = [
  //     {
  //         id: "1",
  //         name: "alface",
  //         price: 3,
  //         picture: "https://i.ibb.co/ZKDbV8f/alface.png"
  //     },
  //     {
  //         id: "2",
  //         name: "tomate",
  //         price: 4,
  //         picture: "https://i.ibb.co/JrpMwRN/tomate.png"
  //     },
  //     {
  //         id: "3",
  //         name: "Queijo Mussarela",
  //         price: 5,
  //         picture: "https://i.ibb.co/jGWnZf7/Queijo.png"
  //     },
  // ]

  // const IngredientOptions: IIngredientOptionsData[] = [
  //     {
  //         id: "1",
  //         name: "Carne",
  //         categorys: [
  //             {
  //                 id: "1",
  //                 name: "Malpassado",
  //                 picture: "https://i.ibb.co/BqpWd05/carne.png",
  //                 isSelected: false
  //             },
  //             {
  //                 id: "2",
  //                 name: "Ao ponto",
  //                 picture: "https://i.ibb.co/BqpWd05/carne.png",
  //                 isSelected: true
  //             },
  //         ]
  //     },
  //     {
  //         id: "2",
  //         name: "Pão",
  //         categorys: [
  //             {
  //                 id: "1",
  //                 name: "Francês",
  //                 picture: "https://i.ibb.co/8KnTRXt/pao.png",
  //                 isSelected: true
  //             },
  //             {
  //                 id: "2",
  //                 name: "Brioche",
  //                 picture: "https://i.ibb.co/8KnTRXt/pao.png",
  //                 isSelected: false
  //             },
  //             {
  //                 id: "3",
  //                 name: "Australiano",
  //                 picture: "https://i.ibb.co/8KnTRXt/pao.png",
  //                 isSelected: false
  //             },
  //             {
  //                 id: "4",
  //                 name: "Italiano",
  //                 picture: "https://i.ibb.co/8KnTRXt/pao.png",
  //                 isSelected: false
  //             },
  //         ]
  //     },
  // ]

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

  return (
    <>
      {/* <div className="w-screen h-screen bg-black fixed top-0 left-0 z-100 opacity-25"></div> */}
      {showProduct && (
        <div
          className={`w-[345px] pb-9 px-4 bg-white absolute top-0 right-0 z-10 overflow-y-auto shadow-2xl`}
        >
          <BsArrowLeftCircle
            className="my-8 cursor-pointer"
            size={30}
            onClick={() => setShowProduct(false)}
          />
          <div className="w-full flex items-center justify-center mb-9">
            <Image
              src="https://i.ibb.co/tMC45zZ/x-salada.png"
              alt="backgfroundheader"
              width={326}
              height={358}
            />
          </div>
          <div className="mb-9">
            <h1 className="font-extrabold text-xl text-gray-800 ">X-Salada</h1>
            <p className="font-normal text-sm text-gray-800 ">
              Molho especial da casa, hambúrguer artesanal 150g feito com carne
              bovina de alta qualidade, cebola roxa, picles, tomate, alface e
              queijo prato
            </p>
          </div>

          {ingredientsOption.map((item) => {
            return (
              <div className="mb-5" key={item.id}>
                <h2 className="mb-4 font-semibold text-sm">{item.name}</h2>
                <div className="flex flex-wrap gap-2">
                  {item.categorys.map((category) => {
                    return (
                      <label onClick={() => getAdditional()} key={category.id}>
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
      )}
    </>
  );
}
