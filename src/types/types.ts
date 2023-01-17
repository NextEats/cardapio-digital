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
