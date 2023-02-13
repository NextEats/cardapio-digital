import { iCashBoxes } from "@/src/types/types";
import { useState } from "react";
import { CardapioDigitalButton } from "../../cardapio-digital/CardapioDigitalButton";

interface iCashBoxButtons {
  cashBoxes: iCashBoxes["data"];
}

export default function CashBoxButtons({ cashBoxes }: iCashBoxButtons) {
  const [openCashBoxState, setOpenCashBoxState] = useState(false);

  async function handleOpenCashBox() {
    // const cashBox = await api.post("api/cash_boxes/open", {
    //   restaurant_id: restaurant.id,
    // });
    setOpenCashBoxState(true);
  }

  async function handleCloseCashBox() {
    // if (
    //   state.emAnaliseOrders.length > 0 ||
    //   state.aCaminhoOrders.length > 0 ||
    //   state.emProduçãoOrders.length > 0
    // ) {
    //   alert(
    //     "Ei vagabundo, crie um toast para avisar para algum desorientado que só pode fechar o caixa se todos os pedidos forem entregue!"
    //   );
    //   return;
    // }
    // const cashBox = await api.post("api/cash_boxes/close", {
    //   restaurant_id: restaurant.id,
    // });
    setOpenCashBoxState(false);
  }

  return (
    <div className="flex items-center gap-3">
      <CardapioDigitalButton
        name="Abrir caixa"
        h="h-10"
        w="w-40"
        disabled={
          openCashBoxState || cashBoxes.some((cb) => cb.is_open === true)
        }
        onClick={() => handleOpenCashBox()}
      />
      <CardapioDigitalButton
        name="Fechar caixa"
        h="h-10"
        w="w-40"
        disabled={!cashBoxes.some((cb) => cb.is_open === true)}
        onClick={() => handleCloseCashBox()}
      />
    </div>
  );
}
