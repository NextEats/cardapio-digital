import { iProductSelect, iProductOption, iSelect } from "./../../types/types";
import { supabase } from "../../server/api";

export interface tSelectWithOptions {
  id: number;
  max_selected_options: number;
  name: string;
  options: Array<iProductOption["data"] & { selected?: boolean }>;
}

async function getSelectWithOptions(select: any) {
  const options = await supabase
    .from("product_options")
    .select("*")
    .eq("select_id", select.select_id);
  return { ...select, options: options };
}

export async function getProductSelectWithOptions(productId: number) {
  const { data: relationalTableOptionsSelectsData } = await supabase
    .from("product_selects")
    .select(
      `
          id,
          select_id,
          selects!inner(*)
      `
    )
    .eq("product_id", productId);

  if (!relationalTableOptionsSelectsData) {
    return;
  }

  const promises = relationalTableOptionsSelectsData.map((select, index) =>
    getSelectWithOptions(select)
  );

  const data = await Promise.all(promises);

  const formattedData = data.map((select: any) => {
    return {
      id: select.id,
      max_selected_options: select.selects.max_selected_options,
      name: select.selects.name,
      options: select.options.data,
    };
  });

  return formattedData;
}
