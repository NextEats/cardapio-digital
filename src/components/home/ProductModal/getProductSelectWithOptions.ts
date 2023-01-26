import { iProductOption } from "../../../types/types";
import { supabase } from "../../../server/api";

export interface iProductSelectsWithOptions {
  id: number;
  name: string;
  options: Array<iProductOption["data"] & { selected: boolean }> | null;
}

export async function getProductSelectWithOptions(productId: number) {
  // buscar dados da tabela product_selects
  // filtrar apenas onde o product_id for igual ao produto atual
  const productSelects = await supabase
    .from("product_selects")
    .select("*")
    .eq("product_id", productId);

  // buscar por selects para cada product_selects
  if (!productSelects.data || productSelects.error) {
    return;
  }

  const productSelectPromises = productSelects.data.map(
    async (productSelect) => {
      const select = await supabase
        .from("selects")
        .select("*")
        .eq("id", productSelect.select_id);

      if (select.data) {
        const options = await supabase
          .from("product_options")
          .select("*")
          .eq("select_id", productSelect.select_id);

        if (options.data) {
          const optionsWithSelected = options.data.map((option) => {
            return {
              ...option,
              selected: option.is_default_value,
            };
          });

          return {
            id: select.data[0].id,
            name: select.data[0].name,
            options: optionsWithSelected,
          };
        }
      }
    }
  );

  const productSelectsWithOptions = await Promise.all(productSelectPromises);

  return productSelectsWithOptions;
}
