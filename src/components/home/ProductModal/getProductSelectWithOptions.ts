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
  const productSelects = await supabase
    .from("product_selects")
    .select("*")
    .eq("product_id", productId);

  // buscar por product_options para cada product_selects

  if (!productSelects.data || productSelects.error) {
    return;
  }

  const productSelectPromises = productSelects.data.map(
    async (productSelect) => {
      const productOptions = await supabase
        .from("product_options")
        .select("*")
        .eq("product_select_id", productSelect.id);

      return {
        id: productSelect.id,
        name: productSelect.name,
        options: productOptions.data,
      };
    }
  );

  const productSelectsWithOptions = await Promise.all(productSelectPromises);

  return productSelectsWithOptions;
}
