import { Database } from './supabase';
export interface iAddress {
  data: Database['public']['Tables']['addresses']['Row'];
}
export interface iAddresses {
  data: Array<Database['public']['Tables']['addresses']['Row']>;
}
export interface iInsertAddress {
  data: Database['public']['Tables']['addresses']['Insert'];
}
export interface iInsertAddresses {
  data: Array<Database['public']['Tables']['addresses']['Insert']>;
}
