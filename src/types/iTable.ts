import { iPaymentMethod } from './iPaymentMethod';
import { Database } from './supabase';

export interface iTable {
  data: Database['public']['Tables']['tables']['Row'];
}

export interface iTables {
  data: Array<Database['public']['Tables']['tables']['Row']>;
}
export interface iTablePayment {
  data: Database['public']['Tables']['table_payments']['Row'];
}

export interface iTablePayments {
  data: Array<Database['public']['Tables']['table_payments']['Row']>;
}
export type iTablePaymentMethodsWithPaymentFKData = iTablePayment['data'] & {
  payment_methods: iPaymentMethod['data'];
};

export type iTablePaymentWithPaymentFKData = iTablePayment['data'] & {
  payment_methods: iPaymentMethod['data'];
};
export interface iInsertTable {
  data: Database['public']['Tables']['tables']['Insert'];
}

export interface iInsertTables {
  data: Array<Database['public']['Tables']['tables']['Insert']>;
}
