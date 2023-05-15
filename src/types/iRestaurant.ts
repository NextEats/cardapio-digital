import { iAddress } from './iAddress';
import { iOrderTypes } from './iOrders';
import { iWeekday, iWeekdayOperatingTime } from './iWeekday';
import { Database } from './supabase';
export interface iRestaurant {
  data: Database['public']['Tables']['restaurants']['Row'];
}

export interface iRestaurants {
  data: Array<Database['public']['Tables']['restaurants']['Row']>;
}
export interface iRestaurantType {
  data: Database['public']['Tables']['restaurant_types']['Row'];
}

export interface iRestaurantTypes {
  data: Array<Database['public']['Tables']['restaurant_types']['Row']>;
}
export interface iRestaurantOrderType {
  data: Database['public']['Tables']['restaurant_order_type']['Row'];
}

export interface iRestaurantOrderTypes {
  data: Array<Database['public']['Tables']['restaurant_order_type']['Row']>;
}
export type iRestaurantOrderTypesWithFKData = iRestaurantOrderType['data'] & {
  restaurants: iRestaurant['data'];
  order_types: iOrderTypes['data'];
};

export type iRestaurantWithFKData = iRestaurant['data'] & {
  addresses: iAddress['data'];
  restaurant_types: iRestaurantType['data'];
  weekday_operating_time: Array<
    iWeekdayOperatingTime['data'] & {
      weekdays: iWeekday['data'];
    }
  >;
};
