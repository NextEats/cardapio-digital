import { BsArrowLeftCircle } from "react-icons/bs";
import { MouseEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { iCheckoutProduct, iProduct } from "../../../types/types";
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
  productsDispatch,
}: {
  productModal: iProduct["data"] | undefined | null;
  setProductModal: Function;
  productsDispatch: Function;
}) {
  // Preencher primeiras informações sobre o produto no objeto checkout

  const [additionals, setAdditionals] = useState<iProductAdditional[]>();
  const [price, setPrice] = useState<number>(0);
  const [selects, setSelects] = useState<iProductSelectsWithOptions[]>([]);
  const [selectedAdditionals, setSelectedAdditionals] = useState<any[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    setQuantity(1);
  }, []);

  useEffect(() => {
    if (!productModal) {
      return;
    }

    getProductSelectWithOptions(productModal.id).then((response) => {
      setSelects(response as iProductSelectsWithOptions[]);
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

  useMemo(() => {
    if (!productModal) {
      return;
    }

    setPrice(productModal.price);
  }, [productModal]);

  if (!productModal) {
    return <div>Carregando</div>;
  }

  function handleSubmit(e: MouseEvent) {
    e.preventDefault();

    productsDispatch({
      type: "add",
      payload: {
        id: productModal?.id,
        name: productModal?.name,
        price: productModal?.price,
        quantity: quantity,
        picture_url: productModal?.picture_url,
        additionals: selectedAdditionals,
        options: selects,
      },
    });

    // setProducts((prev: any) => {
    //   if (prev) {
    //     return [
    //       ...prev,
    //       {
    //         id: productModal?.id,
    //         name: productModal?.name,
    //         price: productModal?.price,
    //         quantity: quantity,
    //         picture_url: productModal?.picture_url,
    //         additionals: selectedAdditionals,
    //         options: selects,
    //       },
    //     ];
    //   } else {
    //     return [
    //       {
    //         id: productModal?.id,
    //         name: productModal?.name,
    //         price: productModal?.price,
    //         quantity: quantity,
    //         picture_url: productModal?.picture_url,
    //         additionals: selectedAdditionals,
    //         options: selects,
    //       },
    //     ];
    //   }
    // });

    setProductModal(null);
  }

  return (
    <>
      <div
        className="fixed bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
        onClick={() => {
          setProductModal(null);
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

          {selects?.length != 0 && selects && (
            <ProductOptions selects={selects} setSelects={setSelects} />
          )}

          {additionals?.length != 0 && additionals && (
            <Additionals
              data={additionals}
              setPrice={setPrice}
              selectedAdditionals={selectedAdditionals}
              setSelectedAdditionals={setSelectedAdditionals}
            />
          )}
          <SubmitButtons
            productModal={productModal}
            price={price}
            quantity={quantity}
            setQuantity={setQuantity}
            setPrice={setPrice}
            submitFunction={(e: MouseEvent) => handleSubmit(e)}
          />
        </div>
      </div>
    </>
  );
}
