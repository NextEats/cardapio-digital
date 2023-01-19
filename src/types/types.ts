import { Database } from "./supabase";

export interface iProduct {
  data: Database["public"]["Tables"]["products"]["Row"];
}

export interface iProducts {
  data: Array<Database["public"]["Tables"]["products"]["Row"]>;
}

export interface iRestaurant {
  data: Database["public"]["Tables"]["restaurants"]["Row"];
}

export interface iRestaurants {
  data: Array<Database["public"]["Tables"]["restaurants"]["Row"]>;
}

export interface iIngredient {
  data: Database["public"]["Tables"]["ingredients"]["Row"];
}

export interface iIngredients {
  data: Array<Database["public"]["Tables"]["ingredients"]["Row"]>;
}

export interface iAdditional {
  data: Database["public"]["Tables"]["additionals"]["Row"];
}

export interface iAdditionals {
  data: Array<Database["public"]["Tables"]["additionals"]["Row"]>;
}
export interface iInsertAdditional {
  data: Database["public"]["Tables"]["additionals"]["Insert"];
}

export interface iInsertAdditionals {
  data: Array<Database["public"]["Tables"]["additionals"]["Insert"]>;
}

export interface iRestaurantType {
  data: Database["public"]["Tables"]["restaurant_types"]["Row"];
}

export interface iRestaurantTypes {
  data: Array<Database["public"]["Tables"]["restaurant_types"]["Row"]>;
}

export interface iProductCategory {
  data: Database["public"]["Tables"]["product_categories"]["Row"];
}

export interface iProductCategories {
  data: Array<Database["public"]["Tables"]["product_categories"]["Row"]>;
}
export interface iInsertProductCategory {
  data: Database["public"]["Tables"]["product_categories"]["Insert"];
}
export interface iInsertProductCategories {
  data: Array<Database["public"]["Tables"]["product_categories"]["Insert"]>;
}