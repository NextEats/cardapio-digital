import { Database } from './supabase';
export interface iAdditional {
  data: Database['public']['Tables']['additionals']['Row'];
}

export interface iAdditionals {
  data: Array<Database['public']['Tables']['additionals']['Row']>;
}
export interface iAdditionalCategory {
  data: Database['public']['Tables']['additional_categories']['Row'];
}

export interface iAdditionalCategories {
  data: Array<Database['public']['Tables']['additional_categories']['Row']>;
}
export interface IAdditionalsData {
  additionals_data: {
    quantity: number;
    additional_id: number;
  }[];
}
