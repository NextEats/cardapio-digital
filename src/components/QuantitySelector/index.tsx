import React, { useReducer, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";

interface iQuantitySelector {
  value: number;
  addValue: Function;
  subtractValue: Function;
  deleteValue?: Function;
}

export function QuantitySelector({
  value,
  addValue,
  subtractValue,
  deleteValue,
}: iQuantitySelector) {
  const handleIncrementOnClick = () => {
    addValue();
  };

  const handleDecrementOnClick = () => {
    subtractValue();
  };

  const handleDeleteOnClick = () => {
    if (!deleteValue) return
    deleteValue();
  };

  return (
    <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
      <button
        className="w-6 text-md flex items-center justify-center"
        onClick={value == 1 ? handleDeleteOnClick : handleDecrementOnClick}
      >
        {value == 1 && deleteValue ? <FaTrash /> : null}
        {value > 1 ? <FaMinus /> : null}
      </button>
      <span className="">{value}</span>
      <button
        className="w-6 text-md flex items-center justify-center"
        onClick={handleIncrementOnClick}
      >
        <FaPlus />
      </button>
    </div>
  );
}
