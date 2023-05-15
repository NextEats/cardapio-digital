import { Database } from './supabase';
export interface iContact {
  data: Database['public']['Tables']['contacts']['Row'];
}

export interface iContacts {
  data: Array<Database['public']['Tables']['contacts']['Row']>;
}
export interface iInsertContact {
  data: Database['public']['Tables']['contacts']['Insert'];
}

export interface iInsertContacts {
  data: Array<Database['public']['Tables']['contacts']['Insert']>;
}
export interface iInsertClient {
  data: Database['public']['Tables']['clients']['Insert'];
}

export interface iInsertClients {
  data: Array<Database['public']['Tables']['clients']['Insert']>;
}
