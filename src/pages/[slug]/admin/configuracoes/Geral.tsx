import InputWithLabel from "@/src/components/InputWithLabel";
import { useState } from "react";

export default function Geral() {
  const [restaurantName, setRestaurantName] = useState<string>(
    "Quintal do Hamburguer"
  );

  return (
    <div className="w-full max-w-[600px]">
      <InputWithLabel
        label="Nome do Restaurante"
        placeholder="Escreva aqui o nome do seu estabelecimento..."
        state={restaurantName}
        setState={setRestaurantName}
      />
    </div>
  );
}
