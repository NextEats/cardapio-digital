import InputWithLabel from "@/src/components/InputWithLabel";
import { AdminContext } from "@/src/contexts/adminContext";
import { useContext, useReducer, useState } from "react";
import Image from "next/image";

export default function Geral() {
  const restaurant = useContext(AdminContext);

  const handleSubmit = () => {
    console.log(restaurant);
  };

  if (!restaurant.restaurant) {
    return <></>;
  }

  return (
    <div className="w-full max-w-[600px]">
      {restaurant.restaurant && (
        <div className="flex flex-col gap-y-5">
          <Image
            src={restaurant.restaurant.picture_url}
            alt={restaurant.restaurant.picture_url}
            width={100}
            height={100}
          />
          <InputWithLabel
            label="Nome do Estabelecimento"
            placeholder="Escreva aqui o nome do seu estabelecimento..."
            state={restaurant.restaurant.name}
          />
          <InputWithLabel label="Slug" state={restaurant.restaurant.slug} />
          <InputWithLabel
            label="CEP"
            state={restaurant.restaurant.addresses.cep}
          />
        </div>
      )}

      {/* <button
        onClick={handleSubmit}
        className="rounded-sm mt-12 bg-indigo-500 py-2 px-7 font-semibold text-[white]"
      >
        SALVAR
      </button> */}
    </div>
  );
}
