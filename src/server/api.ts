import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/supabase";
import {
  iGroupedProducts,
  iProductCategory,
  iRestaurantType,
  ProductWithCategory,
} from "../types/types";

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const getGroupedProducts = async () => {
  // Cria um mapa para armazenar os nomes das categorias correspondentes a cada ID de categoria
  const categoryMap = new Map<number, string>();
  let groupedProducts;
  try {
    // Faz uma requisição para a tabela de categorias de produtos
    const res = await supabase.from("product_categories").select("id, name");
    if (!res.data) {
      return;
    }
    // Percorre os dados da resposta e adiciona os nomes das categorias ao mapa, usando o ID da categoria como chave
    for (const category of res.data) {
      categoryMap.set(category.id, category.name);
    }
    // Faz uma requisição para a tabela de produtos
    const resProduct = await supabase.from("products").select("*");
    if (!resProduct.data) {
      return;
    }
    // Armazena os dados da resposta em uma variável
    const products = resProduct.data;
    // Utiliza a função reduce para agrupar os produtos por categoria e adicionar o nome da categoria a cada produto agrupado
    groupedProducts = products.reduce((acc: iGroupedProducts, product) => {
      // Verifica se ja existe uma entrada para essa categoria no objeto agrupado
      if (!acc[product.category_id]) {
        acc[product.category_id] = {
          // Se não existir, adiciona uma nova entrada para essa categoria e coloca o nome da categoria recuperado do mapa
          category_name: categoryMap.get(product.category_id) || "",
          products: [],
        };
      }
      // Cria um objeto "productWithCategory" com as propriedades do produto e a categoria_name
      const productWithCategory: ProductWithCategory = {
        ...product,
        category_name: acc[product.category_id].category_name,
      };
      // Adiciona o objeto "productWithCategory" ao array de produtos da categoria
      acc[product.category_id].products.push(productWithCategory);
      return acc;
    }, {});
  } catch (error) {
  } finally {
    // retorna a variavel groupedProducts
    return groupedProducts;
  }
};

export async function returnRestaurantType(id: number) {
  const { data } = await supabase
    .from("restaurant_types")
    .select()
    .eq("id", id);

  return data as unknown as Array<iRestaurantType["data"]>;
}

export async function returnAllCategoriesForThisRestaurant(
  restaurantId: number
) {
  const { data } = await supabase
    .from("product_categories")
    .select("*")
    .eq("restaurant_id", restaurantId);

  return data as unknown as Array<iProductCategory["data"]>;
}
