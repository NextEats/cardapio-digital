import { iProductOption } from "../../../types/types";
import { supabase } from "../../../server/api";

export interface iProductSelectsWithOptions {
  id: number;
  name: string;
  options: Array<iProductOption["data"]> | null;
}

export async function getProductSelectWithOptions(productId: number) {
  // buscar dados da tabela product_selects
  // filtrar apenas onde o product_id for igual ao produto atual
  const selects = await supabase
    .from("selects")
    .select("*")
    .eq("product_id", productId);

  // buscar por product_options para cada product_selects

  if (!selects.data || selects.error) {
    return;
  }

  const productSelectPromises = selects.data.map(async (selects) => {
    const productOptions = await supabase
      .from("product_options")
      .select("*")
      .eq("product_select_id", selects.id);

    return {
      id: selects.id,
      name: selects.name,
      options: productOptions.data,
    };
  });

  const productSelectsWithOptions = await Promise.all(productSelectPromises);

  return productSelectsWithOptions;
}
