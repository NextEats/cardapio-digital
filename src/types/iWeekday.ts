import { iRestaurantWithFKData } from './iRestaurant';
import { Database } from './supabase';
export interface iWeekdayOperatingTime {
  data: Database['public']['Tables']['weekday_operating_time']['Row'];
}

export interface iWeekday {
  data: Database['public']['Tables']['weekdays']['Row'];
}
export type iWeekdayOperatingTimeWithFKData = iWeekdayOperatingTime['data'] & {
  weekdays: iWeekday['data'];
};

export interface iDigitalMenuData {
  restaurant: iRestaurantWithFKData;
  groupedProducts: any;
}
