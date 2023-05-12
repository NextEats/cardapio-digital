import { iProduct } from './iProducts';

export interface iGroupedProducts {
  [key: number]: {
    category_name: string | '';
    products: ProductWithCategory[];
  };
}

export type ProductWithCategory = iProduct['data'] & {
  category_name: string;
  category_order: number;
};
