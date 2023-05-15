import { Database } from './supabase';
export interface iUserDetails {
  data: Database['public']['Tables']['user_details']['Row'];
}

export type tUserDetailsWithFKData =
  Database['public']['Tables']['user_details']['Row'] & {
    restaurants: Database['public']['Tables']['restaurants']['Row'];
  };
