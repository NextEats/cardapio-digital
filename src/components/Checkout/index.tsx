import { BsX } from "react-icons/bs";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { iCheckoutProduct } from "../../types/types";
import { FaMinus, FaPlus } from "react-icons/fa";

export default function Checkout({
  products,
  onClose,
}: {
  products: Array<iCheckoutProduct> | null | undefined;
  onClose: () => void;
}) {
  var body = document.getElementById("body");
  //   body?.classList.add("overflow-hidden");

  if (products === null || products === undefined) {
    return <></>;
  }

  return (
    <>
      <div className="absolute h-screen w-screen flex items-center justify-center">
        <div
          className="fixed bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
          onClick={() => {
            onClose();
            body?.classList.remove("overflow-hidden");
          }}
        ></div>
        <div className="pb-9 px-4 bg-white z-[200] fixed overflow-auto shadow-2xl w-full max-w-[600px]">
          <div className="sticky top-0">
            <BsX className="my-8 cursor-pointer" size={30} onClick={onClose} />
            <div className="w-full flex items-center justify-center mb-9">
              <h1 className="font-semibold text-xl text-gray-800 ">
                FINALIZAR PEDIDO
              </h1>
            </div>
            <div className="mb-9">
              <ul className="text-gray-800">
                {products.map((item) => (
                  <div key={item.id} className="flex items-center py-2">
                    <Image
                      src={item.picture_url}
                      alt={item.name}
                      width={200}
                      height={200}
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div className="flex-1">
                      <h2 className="font-medium text-lg text-gray-800">
                        {item.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {item.description}
                      </p>
                      <p className="text-sm text-gray-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: {item.price}
                      </p>
                      {item.selects &&
                        item.selects.map((select) => (
                          <div key={select.name}>
                            <p className="text-sm text-gray-600">
                              {select.name}:{" "}
                              {select.options
                                .filter((o) => o.selected)
                                .map((o) => o.name)}
                            </p>
                          </div>
                        ))}
                      {item.additionals &&
                        item.additionals.map((additional) => (
                          <div key={additional.id}>
                            <p className="text-sm text-gray-600">
                              {additional.name} x {additional.quantity} -{" "}
                              {additional.price}
                            </p>
                          </div>
                        ))}
                    </div>
                    <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                      <button
                        className="w-6 text-md flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <FaMinus />
                      </button>
                      <span className="">1</span>
                      <button
                        className="w-6 text-md flex items-center justify-center"
                        onClick={(e) => {
                          e.preventDefault();
                        }}
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="fixed bottom-0 left-0 right-0 px-4 py-2 bg-white">
                  <button className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600">
                    CONTINUAR
                  </button>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
