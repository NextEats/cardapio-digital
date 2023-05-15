import { Database } from './supabase';
export interface iDeliveryFee {
  data: Database['public']['Tables']['delivery_fees']['Row'];
}

export interface iDeliveryFees {
  data: Array<Database['public']['Tables']['delivery_fees']['Row']>;
}
export interface iDeliveryFees {
  data: Array<Database['public']['Tables']['delivery_fees']['Row']>;
}
export interface iInsertDeliveryFee {
  data: Database['public']['Tables']['delivery_fees']['Insert'];
}

export interface iInsertDeliveryFees {
  data: Array<Database['public']['Tables']['delivery_fees']['Insert']>;
}
