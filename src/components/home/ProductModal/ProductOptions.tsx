import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import stringToNormalForm from "../../../helpers/stringToNormalForm";
import {
  getProductSelectWithOptions,
  iProductSelectsWithOptions,
} from "./getProductSelectWithOptions";

interface iProductOptions {
  selects: iProductSelectsWithOptions[];
  setSelects: Function;
}

interface iSelectedOption {
  select_id: number;
  selected_option: number;
}

export default function ProductOptions({
  selects,
  setSelects,
}: iProductOptions) {
  const handleOptionClick = (selectId: number, optionId: number) => {
    const newSelects = [...selects];
    const selectIndex = newSelects.findIndex(
      (select) => select.id === selectId
    );
    const select = newSelects[selectIndex];
    const options = select.options;

    if (!options) return;

    const newOptions = options.map((option) => {
      return {
        ...option,
        selected: option.id === optionId,
      };
    });

    newSelects[selectIndex] = {
      ...select,
      options: newOptions,
    };

    setSelects(newSelects);
  };

  return (
    <div>
      {selects.map((select, index) => {
        return (
          <fieldset className="mb-10" key={index}>
            <h2 className="mb-4 font-semibold text-sm">{select.name}</h2>
            <div className="flex flex-wrap gap-2">
              {select.options?.map((option) => {
                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      handleOptionClick(select.id, option.id);
                    }}
                  >
                    <label
                      className=""
                      htmlFor={stringToNormalForm(select.name) + option.id}
                    >
                      <div
                        className={`w-[130px] h-[130px] rounded-lg relative cursor-pointer ${
                          option.selected ? "selected" : "unselected"
                        }`}
                      >
                        <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                        <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium ">
                          {option.name}
                        </span>
                        {option.picture_url && (
                          <Image
                            src={option.picture_url}
                            alt={option.name}
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
                      value={stringToNormalForm(select.name) + option.id}
                      defaultChecked={option.is_default_value}
                      style={{ display: "none" }}
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
