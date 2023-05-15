import { Database } from './supabase';
export interface iCashBox {
  data: Database['public']['Tables']['cash_boxes']['Row'];
}

export interface iCashBoxes {
  data: Array<Database['public']['Tables']['cash_boxes']['Row']>;
}
