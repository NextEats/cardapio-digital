import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import stringToNormalForm from "../../../helpers/stringToNormalForm";
import {
  getProductSelectWithOptions,
  iProductSelectsWithOptions,
} from "./getProductSelectWithOptions";

interface iProductOptions {
  data: Array<iProductSelectsWithOptions>;
}

export default function ProductOptions({ data }: iProductOptions) {
  return (
    <div>
      {data.map((select, index) => {
        return (
          <fieldset className="mb-5" key={index}>
            <h2 className="mb-4 font-semibold text-sm">{select.name}</h2>
            <div className="flex flex-wrap gap-2">
              {select.options?.map((option) => {
                return (
                  <div key={option.id}>
                    <label
                      className=""
                      htmlFor={stringToNormalForm(select.name) + option.id}
                    >
                      <div className="w-[99px] h-[94px] rounded-lg relative cursor-pointer ">
                        <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                        <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium ">
                          {option.name}
                        </span>
                        {option.picture_url && (
                          <Image
                            src={option.picture_url}
                            alt="carne malpassada"
                            className={
                              "wi-full h-full relative rounded-lg object-cover"
                            }
                            width={326}
                            height={358}
                          />
                        )}
                      </div>
                    </label>
                    <input
                      type="radio"
                      name={stringToNormalForm(select.name)}
                      id={stringToNormalForm(select.name) + option.id}
                      value={stringToNormalForm(select.name) + option.id}
                      defaultChecked={option.is_default_value}
                    />
                  </div>
                );
              })}
            </div>
          </fieldset>
        );
      })}
    </div>
  );
}
