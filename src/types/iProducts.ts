import { Database } from './supabase';

export interface iProduct {
  data: Database['public']['Tables']['products']['Row'];
}

export interface iProducts {
  data: Array<Database['public']['Tables']['products']['Row']>;
}

export type iProductsWithFKData = iProduct['data'] & {
  category_id: iProductCategory['data'];
};

export interface iProductCategory {
  data: Database['public']['Tables']['product_categories']['Row'];
}

export interface iProductCategories {
  data: Array<Database['public']['Tables']['product_categories']['Row']>;
}
export interface iProductSelect {
  data: Database['public']['Tables']['product_selects']['Row'];
}

export interface iProductSelects {
  data: Array<Database['public']['Tables']['product_selects']['Row']>;
}
export interface iProductAdditional {
  data: Database['public']['Tables']['product_additionals']['Row'];
}

export interface iProductAdditionals {
  data: Array<Database['public']['Tables']['product_additionals']['Row']>;
}

export interface iProductOption {
  data: Database['public']['Tables']['product_options']['Row'];
}

export interface iProductOptions {
  data: Array<Database['public']['Tables']['product_options']['Row']>;
}
export interface iInsertProduct {
  data: Database['public']['Tables']['products']['Insert'];
}

export interface iInsertProducts {
  data: Array<Database['public']['Tables']['products']['Insert']>;
}
export interface iInsertProductSelect {
  data: Database['public']['Tables']['product_selects']['Insert'];
}

export interface iInsertProductSelects {
  data: Array<Database['public']['Tables']['product_selects']['Insert']>;
}
export interface iInsertProductAdditional {
  data: Database['public']['Tables']['product_additionals']['Insert'];
}
export interface iInsertProductAdditionals {
  data: Array<Database['public']['Tables']['product_additionals']['Insert']>;
}

export interface iInsertProductCategory {
  data: Database['public']['Tables']['product_categories']['Insert'];
}
export interface iInsertProductCategories {
  data: Array<Database['public']['Tables']['product_categories']['Insert']>;
}
export interface iInsertProductOption {
  data: Database['public']['Tables']['product_options']['Insert'];
}

export interface iInsertProductOptions {
  data: Array<Database['public']['Tables']['product_options']['Insert']>;
}
