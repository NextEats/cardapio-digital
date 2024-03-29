import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions';
import { iAdditional } from '@/src/types/iAdditional';
import { iProduct } from '@/src/types/iProducts';

export enum tableReducerAction {
  PRODUCTSSELECTED = 'PRODUCTSSELECTED',
  REMOVEPRODUCTSSELECTED = 'REMOVEPRODUCTSSELECTED',
  PRODUCT = 'PRODUCT',
  ADDITIONALS = 'ADDITIONALS',
  CHANGEADDITIONALQUANTITY = 'CHANGEADDITIONALQUANTITY',
}

export function selectProductAction(product: iProduct['data'] | null) {
  return {
    type: tableReducerAction.PRODUCT,
    payload: { product },
  };
}
export function selectAdditionalAction(additional: iAdditional['data']) {
  return {
    type: tableReducerAction.ADDITIONALS,
    payload: { additional },
  };
}
export function changeAdditionalQuantityAction(
  isIncrement: boolean,
  additionalId: number
) {
  return {
    type: tableReducerAction.CHANGEADDITIONALQUANTITY,
    payload: { isIncrement, additionalId },
  };
}
export function addProductAction({
  product,
  productSelects,
  table_id,
  quantity,
  observation,
}: {
  product: iProduct['data'];
  productSelects: tSelectWithOptions[];
  table_id: number;
  quantity: number;
  observation: string;
}) {
  return {
    type: tableReducerAction.PRODUCTSSELECTED,
    payload: { product, productSelects, table_id, quantity, observation },
  };
}
export function removeProductAction(productId: number) {
  return {
    type: tableReducerAction.REMOVEPRODUCTSSELECTED,
    payload: { productId },
  };
}
