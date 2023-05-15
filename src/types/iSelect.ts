import { Database } from './supabase';
export interface iSelect {
  data: Database['public']['Tables']['selects']['Row'];
}

export interface iSelects {
  data: Array<Database['public']['Tables']['selects']['Row']>;
}
