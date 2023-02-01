import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { Database } from "../types/supabase";
import {
  iGroupedProducts,
  iProductCategory,
  iRestaurantType,
  ProductWithCategory,
} from "../types/types";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_KEY!
);

export const getGroupedProducts = async (restaurantId: number) => {
  // Cria um mapa para armazenar os nomes das categorias correspondentes a cada ID de categoria
  const categoryMap = new Map<number, string>();
  let groupedProducts;
  try {
    // Faz uma requisição para a tabela de categorias de produtos
    const res = await supabase
      .from("product_categories")
      .select("id, name")
      .eq("restaurant_id", restaurantId);
    if (!res.data) {
      return;
    }
    // Percorre os dados da resposta e adiciona os nomes das categorias ao mapa, usando o ID da categoria como chave
    for (const category of res.data) {
      categoryMap.set(category.id, category.name);
    }
    // Faz uma requisição para a tabela de produtos
    const resProduct = await supabase
      .from("products")
      .select("*")
      .eq("restaurant_id", restaurantId);
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

export async function createNewWhatsAppCode(
  whatsappNumber: string,
  restaurantName: string
) {
  try {
    const verificationCode = Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0");

    const expirationDate = new Date();

    expirationDate.setMinutes(expirationDate.getMinutes() + 5);

    await supabase.from("whatsapp_code").insert([
      {
        code: verificationCode,
        expiration_date: expirationDate.toLocaleString(),
        whatsapp_number: whatsappNumber,
      },
    ]);

    await axios
      .post(
        "https://api.z-api.io/instances/3B83B938A0A810B2F72A763E6F7F9F35/token/F0897214AC8EA63A77A36B5C/send-text",
        {
          phone: whatsappNumber,
          message: `😋 Olá, você fez um pedido no *${restaurantName}*\n\n▶ Seu código é: _*${verificationCode}*_`,
        }
      )
      .then(function (response: any) {
        return response;
      })
      .catch(function (error: any) {
        console.error(error);
      });

    return verificationCode;
  } catch (error) {
    console.error(error);
  }
}

export async function isWhatsappCodeValid(
  code: string,
  whatsappNumber: string
) {
  try {
    const supabaseConsult = await supabase
      .from("whatsapp_code")
      .select()
      .eq("code", code)
      .eq("whatsapp_number", whatsappNumber);

    if (!supabaseConsult.data || supabaseConsult.data.length === 0) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

export async function getPaymentMethodRestaurant(restaurantId: number) {
  const paymentMethodRestaurantData = await supabase
    .from("payment_methods_restaurants")
    .select()
    .eq("restaurant_id", restaurantId);
  return paymentMethodRestaurantData;
}
export async function getPaymentMethod() {
  const paymentMethodData = await supabase.from("payment_methods").select();
  return paymentMethodData;
}
