import { Database } from './supabase';
export interface iInsertTablePayment {
  data: Database['public']['Tables']['table_payments']['Insert'];
}

export interface iInsertTablePayments {
  data: Array<Database['public']['Tables']['table_payments']['Insert']>;
}
export interface iInsertSelect {
  data: Database['public']['Tables']['selects']['Insert'];
}

export interface iInsertSelects {
  data: Array<Database['public']['Tables']['selects']['Insert']>;
}

export interface iInsertIngredient {
  data: Database['public']['Tables']['ingredients']['Insert'];
}
export interface iInsertIngredients {
  data: Array<Database['public']['Tables']['ingredients']['Insert']>;
}
// ====
export interface iInsertAdditional {
  data: Database['public']['Tables']['additionals']['Insert'];
}
export interface iInsertAdditionals {
  data: Array<Database['public']['Tables']['additionals']['Insert']>;
}
