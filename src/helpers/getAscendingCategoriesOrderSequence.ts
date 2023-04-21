import { iProductCategories } from '../types/types';

export function getAscendingCategoriesOrderSequence(
  categories: iProductCategories['data']
) {
  // Obtém os números de ordem das categorias e ordena em ordem crescente.
  const numbersOfCategoryOrder = categories
    .map(category => category.category_order)
    .sort((a, b) => a - b);

  // Calcula o maior número da sequência e gera a sequência.
  const maximo = numbersOfCategoryOrder[numbersOfCategoryOrder.length - 1] + 5;
  const sequencia = Array.from({ length: maximo }, (_, index) => index + 1);
  // console.log("numbersOfCategoryOrder", maximo)

  return sequencia;
}
