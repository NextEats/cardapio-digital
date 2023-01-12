import { Dispatch, SetStateAction } from "react";

export type productType = {
  picture_url: string;
  name: string;
  description: string;
  price: number;
};

export interface IAdditionalData {
  id: string;
  name: string;
  price: number;
  picture_url: string;
}

export interface option {
  id: string;
  name: string;
  picture_url: string;
  isSelected: boolean;
}

export interface IIngredientOptionsData {
  id: string;
  name: string;
  options: option[];
}

export interface IProductProps {
  showProduct: boolean;
  setShowProduct: Dispatch<SetStateAction<boolean>>;
  currentProduct: productType | undefined;
}
