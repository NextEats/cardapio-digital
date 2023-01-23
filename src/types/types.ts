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

export interface iAdditional {
  data: Database["public"]["Tables"]["additionals"]["Row"];
}

export interface iAdditionals {
  data: Array<Database["public"]["Tables"]["additionals"]["Row"]>;
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
export interface iOrder {
  data: Database["public"]["Tables"]["orders"]["Row"];
}

export interface iOrders {
  data: Array<Database["public"]["Tables"]["orders"]["Row"]>;
}
export interface iOrderProduct {
  data: Database["public"]["Tables"]["orders_products"]["Row"];
}

export interface iOrdersProducts {
  data: Array<Database["public"]["Tables"]["orders_products"]["Row"]>;
}
export interface iOrderStatus {
  data: Database["public"]["Tables"]["order_status"]["Row"];
}

export interface iOrdersStatus {
  data: Array<Database["public"]["Tables"]["order_status"]["Row"]>;
}


//  INSERTS

export interface iInsertIngredient {
  data: Database["public"]["Tables"]["ingredients"]["Insert"];
}
export interface iInsertIngredients {
  data: Array<Database["public"]["Tables"]["ingredients"]["Insert"]>;
}
// ====
export interface iInsertAdditional {
  data: Database["public"]["Tables"]["additionals"]["Insert"];
}
export interface iInsertAdditionals {
  data: Array<Database["public"]["Tables"]["additionals"]["Insert"]>;
}
// ====
export interface iInsertProductCategory {
  data: Database["public"]["Tables"]["product_categories"]["Insert"];
}
export interface iInsertProductCategories {
  data: Array<Database["public"]["Tables"]["product_categories"]["Insert"]>;
}

// ====
export interface iInsertIngredinetOption {
  data: Database["public"]["Tables"]["ingredient_options"]["Insert"];
}
export interface iInsertIngredinetOptions {
  data: Array<Database["public"]["Tables"]["ingredient_options"]["Insert"]>;
}

