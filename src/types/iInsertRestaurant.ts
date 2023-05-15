import { Database } from './supabase';
export interface iInsertRestaurantOrderType {
  data: Database['public']['Tables']['restaurant_order_type']['Insert'];
}

export interface iInsertRestaurantOrderTypes {
  data: Array<Database['public']['Tables']['restaurant_order_type']['Insert']>;
}
export interface iInsertRestaurant {
  data: Database['public']['Tables']['restaurants']['Insert'];
}

export interface iInsertRestaurants {
  data: Array<Database['public']['Tables']['restaurants']['Insert']>;
}
