import { Database } from './supabase';
export interface iPaymentMethod {
  data: Database['public']['Tables']['payment_methods']['Row'];
}
export interface iPaymentMethods {
  data: Array<Database['public']['Tables']['payment_methods']['Row']>;
}

export interface iPaymentMethodsRestaurants {
  data: Database['public']['Tables']['payment_methods_restaurants']['Row'];
}
export interface iPaymentMethodsRestaurantss {
  data: Array<
    Database['public']['Tables']['payment_methods_restaurants']['Row']
  >;
}

export type iPaymentMethodsRestaurantsWithFKData =
  iPaymentMethodsRestaurants['data'] & {
    payment_methods: iPaymentMethod['data'];
  };
