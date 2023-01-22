import { supabase } from "../../../server/api";
import { getProductAdditionals } from "./getProductAdditionals";

describe("getProductAdditionals", () => {
  it("should return the correct product additionals", async () => {
    // Chamar a função com o id do produto desejado
    const result = await getProductAdditionals(9);

    // Verificar se o resultado é o esperado
    expect(result).toEqual([
      { id: 1, additional_id: 1 },
      { id: 2, additional_id: 2 },
      { id: 3, additional_id: 3 },
    ]);

    expect(supabase.from).toHaveBeenCalledWith("product_additionals");
    expect(supabase.from).toHaveBeenCalledWith("additionals");
  });
});
