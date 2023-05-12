import { Database } from './supabase';
export interface iIngredient {
  data: Database['public']['Tables']['ingredients']['Row'];
}

export interface iIngredients {
  data: Array<iIngredient>;
}
