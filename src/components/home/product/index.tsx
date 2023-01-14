import { BsArrowLeftCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import Image from "next/image";
import { productType } from "../../../types/product";

import {
  IAdditionalData,
  IIngredientOptionsData,
  option,
} from "../../../types/product";

function toNormalForm(str: string) {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function Product({
  showProduct,
  setShowProduct,
  currentProduct,
  ingredients,
  additionals,
}: {
  showProduct: boolean;
  setShowProduct: Dispatch<SetStateAction<boolean>>;
  currentProduct: productType | undefined;
  ingredients: IIngredientOptionsData[];
  additionals: IAdditionalData[];
}) {
  if (showProduct && currentProduct) {
    return (
      <>
        <div
          className="absolute bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
          onClick={() => setShowProduct(false)}
        ></div>
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
                className="rounded-3xl"
                src={currentProduct.picture_url}
                alt="backgfroundheader"
                width={500}
                height={500}
              />
            </div>
            <div className="mb-9">
              <h1 className="font-extrabold text-xl text-gray-800 ">
                {currentProduct.name}
              </h1>
              <p className="font-normal text-md text-gray-800 mt-3">
                {currentProduct.description}
              </p>
            </div>

            <Ingredients data={ingredients} />
            <Additionals data={additionals} />
            <SubmitButtons />
          </div>
        </div>
      </>
    );
  } else {
    return <></>;
  }
}

function Ingredients({ data }: { data: IIngredientOptionsData[] }) {
  function Ingredient({
    ingredientData,
  }: {
    ingredientData: IIngredientOptionsData;
  }) {
    return (
      <fieldset className="mb-5" key={ingredientData.id}>
        <h2 className="mb-4 font-semibold text-sm">{ingredientData.name}</h2>
        <div className="flex flex-wrap gap-2">
          {ingredientData.options.map((option) => {
            return (
              <div key={option.id}>
                <label
                  className=""
                  htmlFor={toNormalForm(ingredientData.name) + option.id}
                >
                  <div className="w-[99px] h-[94px] rounded-lg relative cursor-pointer ">
                    <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                    <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium ">
                      {option.name}
                    </span>
                    <Image
                      src={option.picture_url}
                      alt="carne malpassada"
                      className={
                        "wi-full h-full relative rounded-lg object-cover"
                      }
                      width={326}
                      height={358}
                    />
                  </div>
                </label>
                <input
                  type="radio"
                  name={toNormalForm(ingredientData.name)}
                  id={toNormalForm(ingredientData.name) + option.id}
                  value={toNormalForm(ingredientData.name) + option.id}
                  defaultChecked={option.isSelected}
                />
              </div>
            );
          })}
        </div>
      </fieldset>
    );
  }

  return (
    <div>
      {data.map((ingredientData, index) => {
        return <Ingredient key={index} ingredientData={ingredientData} />;
      })}
    </div>
  );
}

function SubmitButtons() {
  return (
    <div className="flex flex-1 items-center">
      <div className="w-[98px] h-10 flex items-center justify-between mr-2 px-3 bg-white-300 shadow-md rounded-md ">
        <AiOutlinePlus size={12} className="cursor-pointer" />
        <span className="text-xl text-gray-700 font-normal">1</span>
        <AiOutlineMinus size={12} className="cursor-pointer" />
      </div>
      <div className=" h-10 flex flex-1 items-center gap-2 bg-gray-700 shadow-md rounded-md ">
        <BsFillPlusCircleFill className="ml-5" color="#F7F7F7" size={20} />
        <div className=" cursor-pointer">
          <p className="uppercase text-white text-xs font-bold leading-4">
            Adicionar ao pedido&nbsp;
          </p>
          <span className="text-white text-xs font-normal leading-3">
            &nbsp; R$ 27,00&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
}

function Additionals({ data }: { data: IAdditionalData[] }) {
  const [selectedAdditionals, setSelectedAdditionals] = useState<any[]>([]);

  if (data) {
    return (
      <div className="mb-24">
        <h2 className="mb-5 font-semibold text-sm">Adicionais</h2>
        {data.map((additional: IAdditionalData) => {
          return (
            <div key={additional.id} className="flex flex-col mb-3">
              <div className="flex flex-1 items-center justify-between pr-4 shadow-md rounded-md bg-white-300">
                <div className="flex items-center gap-3">
                  <Image
                    src={additional.picture_url}
                    alt="backgfroundheader"
                    width={91}
                    height={200}
                  />
                  <div className="">
                    <p className="font-extrabold text-black text-sm ">
                      {additional.name}
                    </p>
                    <p className="font-semibold text-xs text-black">
                      R$ {additional.price}
                    </p>
                  </div>
                </div>

                {selectedAdditionals.find((add) => add.id == additional.id) ? (
                  <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                    <button
                      className="w-6 text-md flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault();

                        let varSelectedAdditionals = selectedAdditionals;

                        let x = varSelectedAdditionals.findIndex(
                          (add) => add.id == additional.id
                        );

                        if (varSelectedAdditionals[x].quantity - 1 === 0) {
                          setSelectedAdditionals([
                            ...varSelectedAdditionals.filter(
                              (elem, index) => index !== x
                            ),
                          ]);
                        } else {
                          varSelectedAdditionals[x].quantity -= 1;
                          setSelectedAdditionals([...varSelectedAdditionals]);
                        }
                      }}
                    >
                      <FaMinus />
                    </button>
                    <span className="">
                      {
                        selectedAdditionals.find(
                          (add) => add.id == additional.id
                        ).quantity
                      }
                    </span>
                    <button
                      className="w-6 text-md flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault();

                        let varSelectedAdditionals = selectedAdditionals;

                        let x = varSelectedAdditionals.findIndex(
                          (add) => add.id == additional.id
                        );

                        varSelectedAdditionals[x].quantity += 1;

                        setSelectedAdditionals([...varSelectedAdditionals]);
                      }}
                    >
                      <FaPlus />
                    </button>
                  </div>
                ) : (
                  <BsFillPlusCircleFill
                    className="cursor-pointer"
                    color="3A3A3A"
                    size={25}
                    onClick={() =>
                      setSelectedAdditionals((prev: any) => {
                        return [...prev, { id: additional.id, quantity: 1 }];
                      })
                    }
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    return <>Carregando...</>;
  }
}
