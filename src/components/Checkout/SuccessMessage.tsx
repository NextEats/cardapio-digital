import { iRestaurant } from "../../types/types";

interface iSuccessMessage {
  restaurant: iRestaurant["data"];
}
export function SuccessMessage({ restaurant }: iSuccessMessage) {
  return (
    <div className="mb-9">
      <div className="text-gray-800 flex flex-col gap-y-2 min-h-[400px] p-2">
        <h3 className="text-4xl font-bold">Fique de olho no seu WhatsApp!!</h3>
        <span className="w-96 mt-3 italic">
          Seu pedido foi recebido pelo restaurante e está na fila! Em breve você
          será atualizado com mais notícias.
        </span>
      </div>
    </div>
  );
}
