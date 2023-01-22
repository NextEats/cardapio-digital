import { BsArrowLeftCircle, BsFillPlusCircleFill } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaMinus, FaPlus } from "react-icons/fa";

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

import Image from "next/image";
import {
  iProduct,
  iIngredients,
  iAdditionals,
  iAdditional,
  iIngredient,
} from "../../../types/types";

import { supabase } from "./../../../server/api";

import stringToNormalForm from "./../../../helpers/stringToNormalForm";
import { Database } from "../../../types/supabase";
import {
  getProductAdditionals,
  iProductAdditional,
} from "./getProductAdditionals";
import { number } from "zod";

export default function ProductModal({
  productModal,
  setProductModal,
}: {
  productModal: iProduct["data"] | undefined | null;
  setProductModal: Function;
}) {
  const [additionals, setAdditionals] = useState<iProductAdditional[]>();
  const [price, setPrice] = useState<number>(0);

  var body = document.getElementById("body");
  body?.classList.add("overflow-hidden");

  useMemo(() => {
    if (!productModal) {
      return;
    }

    setPrice(productModal.price);
  }, [productModal]);

  useMemo(() => {
    if (!productModal) {
      return;
    }

    getProductAdditionals(productModal?.id).then((response) => {
      setAdditionals(response as iProductAdditional[]);
    });
  }, [productModal]);

  if (!productModal) {
    return <div>Carregando</div>;
  }

  return (
    <>
      <div
        className="fixed bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
        onClick={() => {
          setProductModal(null);
          body?.classList.remove("overflow-hidden");
        }}
      ></div>
      <div
        className={`max-w-[645px] pb-9 px-4 bg-white top-0 right-0 z-[200] fixed overflow-auto shadow-2xl h-screen`}
      >
        <div className="sticky">
          <BsArrowLeftCircle
            className="my-8 cursor-pointer"
            size={30}
            onClick={() => {
              setProductModal(null);
              body?.classList.remove("overflow-hidden");
            }}
          />
          <div className="w-full flex items-center justify-center mb-9">
            <Image
              className="rounded-3xl"
              src={productModal.picture_url}
              alt="backgfroundheader"
              width={500}
              height={500}
            />
          </div>
          <div className="mb-9">
            <h1 className="font-extrabold text-xl text-gray-800 ">
              {productModal.name}
            </h1>
            <p className="font-normal text-md text-gray-800 mt-3">
              {productModal.description}
            </p>
          </div>
          {/* <Ingredients data={ingredientsForThisProduct} /> */}
          <Additionals data={additionals} setPrice={setPrice} />
          <SubmitButtons price={price} />
        </div>
      </div>
    </>
  );
}

function Ingredients({ data }: { data: any }) {
  function Ingredient({ ingredientData }: { ingredientData: any }) {
    return (
      <fieldset className="mb-5" key={ingredientData.id}>
        <h2 className="mb-4 font-semibold text-sm">{ingredientData.name}</h2>
        <div className="flex flex-wrap gap-2">
          {ingredientData.options.map((option) => {
            return (
              <div key={option.id}>
                <label
                  className=""
                  htmlFor={stringToNormalForm(ingredientData.name) + option.id}
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
                  name={stringToNormalForm(ingredientData.name)}
                  id={stringToNormalForm(ingredientData.name) + option.id}
                  value={stringToNormalForm(ingredientData.name) + option.id}
                  defaultChecked={option.isSelected}
                />
              </div>
            );
          })}
        </div>
      </fieldset>
    );
  }

  if (!data) {
    return <>Carregando</>;
  }

  return (
    <div>
      {data.map((ingredientData, index) => {
        return <Ingredient key={index} ingredientData={ingredientData} />;
      })}
    </div>
  );
}

function Additionals({
  data,
  setPrice,
}: {
  data: iProductAdditional[];
  setPrice: Function;
}) {
  const [selectedAdditionals, setSelectedAdditionals] = useState<any[]>([]);

  if (data) {
    return (
      <div className="mb-24">
        <h2 className="mb-5 font-semibold text-sm">Adicionais</h2>
        {data.map(({ additionals }) => {
          return (
            <div key={additionals.id} className="flex flex-col mb-3">
              <div className="flex flex-1 items-center justify-between pr-4 shadow-md rounded-md bg-white-300">
                <div className="flex items-center gap-3">
                  <Image
                    src={additionals.picture_url}
                    alt="backgfroundheader"
                    width={91}
                    height={200}
                  />
                  <div className="">
                    <p className="font-extrabold text-black text-sm ">
                      {additionals.name}
                    </p>
                    <p className="font-semibold text-xs text-black">
                      R$ {additionals.price}
                    </p>
                  </div>
                </div>

                {selectedAdditionals.find((add) => add.id == additionals.id) ? (
                  <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                    <button
                      className="w-6 text-md flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault();

                        setPrice((prev: any) => (prev -= additionals.price));

                        let varSelectedAdditionals = selectedAdditionals;

                        let x = varSelectedAdditionals.findIndex(
                          (add) => add.id == additionals.id
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
                          (add) => add.id == additionals.id
                        ).quantity
                      }
                    </span>
                    <button
                      className="w-6 text-md flex items-center justify-center"
                      onClick={(e) => {
                        e.preventDefault();

                        setPrice((prev: any) => (prev += additionals.price));

                        let varSelectedAdditionals = selectedAdditionals;

                        let x = varSelectedAdditionals.findIndex(
                          (add) => add.id == additionals.id
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
                    onClick={() => {
                      setPrice((prev: any) => (prev += additionals.price));
                      setSelectedAdditionals((prev: any) => {
                        return [...prev, { id: additionals.id, quantity: 1 }];
                      });
                    }}
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

function SubmitButtons({ price }: { price: number }) {
  return (
    <div className="flex flex-1 items-center">
      <div className="w-[98px] h-10 flex items-center justify-between mr-2 px-3 bg-white-300 shadow-md rounded-md ">
        <AiOutlinePlus size={12} className="cursor-pointer" />
        <span className="text-xl text-gray-700 font-normal">1</span>
        <AiOutlineMinus size={12} className="cursor-pointer" />
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
