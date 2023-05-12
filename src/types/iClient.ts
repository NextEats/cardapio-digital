import { Database } from './supabase';
export interface iClient {
  data: Database['public']['Tables']['clients']['Row'];
}

export interface iClients {
  data: Array<Database['public']['Tables']['clients']['Row']>;
}
