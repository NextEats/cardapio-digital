import { BsArrowLeftCircle } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { iProduct } from "../../../types/types";
import Additionals from "./Additionals";
import ProductOptions from "./ProductOptions";
import SubmitButtons from "./SubmitButtons";

import {
  getProductAdditionals,
  iProductAdditional,
} from "./getProductAdditionals";

import {
  getProductSelectWithOptions,
  iProductSelectsWithOptions,
} from "./getProductSelectWithOptions";

export default function ProductModal({
  productModal,
  setProductModal,
}: {
  productModal: iProduct["data"] | undefined | null;
  setProductModal: Function;
}) {
  const [additionals, setAdditionals] = useState<iProductAdditional[]>();
  const [price, setPrice] = useState<number>(0);
  const [options, setOptions] = useState<iProductSelectsWithOptions[]>([]);

  useEffect(() => {
    if (!productModal) {
      return;
    }

    getProductSelectWithOptions(productModal.id).then((response) => {
      setOptions(response as iProductSelectsWithOptions[]);
    });
  }, [productModal]);

  useMemo(() => {
    if (!productModal) {
      return;
    }

    getProductAdditionals(productModal?.id).then((response) => {
      setAdditionals(response as iProductAdditional[]);
    });
  }, [productModal]);

  var body = document.getElementById("body");
  body?.classList.add("overflow-hidden");

  useMemo(() => {
    if (!productModal) {
      return;
    }

    setPrice(productModal.price);
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

          {options?.length != 0 && options && <ProductOptions data={options} />}

          {additionals?.length != 0 && additionals && (
            <Additionals data={additionals} setPrice={setPrice} />
          )}
          <SubmitButtons price={price} />
        </div>
      </div>
    </>
  );
}
