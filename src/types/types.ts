import { Database } from "./supabase";

export interface iProduct {
  data: Database["public"]["Tables"]["products"]["Row"];
}

export interface iProducts {
  data: Array<iProduct>;
}

export interface iRestaurant {
  data: Database["public"]["Tables"]["restaurants"]["Row"];
}

export interface iRestaurants {
  data: Array<iRestaurant>;
}

export interface iIngredient {
  data: Database["public"]["Tables"]["ingredients"]["Row"];
}

export interface iIngredients {
  data: Array<iIngredient>;
}

export interface iAdditional {
  data: Database["public"]["Tables"]["additionals"]["Row"];
}

export interface iAdditionals {
  data: Array<iAdditional>;
}

export interface iRestaurantType {
  data: Database["public"]["Tables"]["restaurant_types"]["Row"];
}
export interface iProductCategory {
  data: Database["public"]["Tables"]["product_categories"]["Row"];
}

export interface iProductCategories {
  data: Array<iProductCategory>;
}

export interface iGroupedProducts {
  [key: number]: {
    category_name: string | "";
    products: ProductWithCategory[];
  };
}

export type ProductWithCategory = iProduct["data"] & {
  category_name: string;
};

export interface iProductOption {
  data: Database["public"]["Tables"]["product_options"]["Row"];
}

export interface iProductOptions {
  data: Array<iProduct>;
}
