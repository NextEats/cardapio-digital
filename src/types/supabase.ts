export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never;
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      graphql: {
        Args: {
          operationName: string;
          query: string;
          variables: Json;
          extensions: Json;
        };
        Returns: Json;
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
  public: {
    Tables: {
      additionals: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          picture_url: string;
          price: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          picture_url: string;
          price: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          picture_url?: string;
          price?: number;
        };
      };
      addresses: {
        Row: {
          cep: string;
          complement: string | null;
          created_at: string | null;
          id: number;
          number: number;
          reference_point: string | null;
        };
        Insert: {
          cep: string;
          complement?: string | null;
          created_at?: string | null;
          id?: number;
          number: number;
          reference_point?: string | null;
        };
        Update: {
          cep?: string;
          complement?: string | null;
          created_at?: string | null;
          id?: number;
          number?: number;
          reference_point?: string | null;
        };
      };
      clients: {
        Row: {
          address_id: number;
          contact_id: number;
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          address_id: number;
          contact_id: number;
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          address_id?: number;
          contact_id?: number;
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      contacts: {
        Row: {
          created_at: string | null;
          email: string | null;
          id: number;
          phone: number | null;
        };
        Insert: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          phone?: number | null;
        };
        Update: {
          created_at?: string | null;
          email?: string | null;
          id?: number;
          phone?: number | null;
        };
      };
      ingredient_options: {
        Row: {
          created_at: string;
          id: number;
          id_default_value: boolean;
          ingredient_id: number;
          name: string;
          picture_url: string;
        };
        Insert: {
          created_at?: string;
          id: number;
          id_default_value?: boolean;
          ingredient_id: number;
          name: string;
          picture_url: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          id_default_value?: boolean;
          ingredient_id?: number;
          name?: string;
          picture_url?: string;
        };
      };
      ingredients: {
        Row: {
          created_at: string | null;
          has_options: boolean;
          id: number;
          name: string | null;
          picture_url: string | null;
        };
        Insert: {
          created_at?: string | null;
          has_options?: boolean;
          id?: number;
          name?: string | null;
          picture_url?: string | null;
        };
        Update: {
          created_at?: string | null;
          has_options?: boolean;
          id?: number;
          name?: string | null;
          picture_url?: string | null;
        };
      };
      order_types: {
        Row: {
          id: number;
          name: string | null;
        };
        Insert: {
          id?: number;
          name?: string | null;
        };
        Update: {
          id?: number;
          name?: string | null;
        };
      };
      orders: {
        Row: {
          created_at: string | null;
          id: number;
          order_type_id: number;
          payment_method_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          order_type_id: number;
          payment_method_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          order_type_id?: number;
          payment_method_id?: number | null;
        };
      };
      orders_products: {
        Row: {
          created_at: string | null;
          id: number;
          order_id: number | null;
          product_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          order_id?: number | null;
          product_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          order_id?: number | null;
          product_id?: number | null;
        };
      };
      payment_methods: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      product_categories: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
          restaurant_id: number;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
          restaurant_id: number;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
          restaurant_id?: number;
        };
      };
      product_ingredients: {
        Row: {
          created_at: string | null;
          id: number;
          ingredient_id: number | null;
          product_id: number | null;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          ingredient_id?: number | null;
          product_id?: number | null;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          ingredient_id?: number | null;
          product_id?: number | null;
        };
      };
      product_sales: {
        Row: {
          created_at: string | null;
          end_date: string | null;
          id: number;
          is_active: boolean;
          product_id: number;
          sale_price: number;
          start_date: string | null;
        };
        Insert: {
          created_at?: string | null;
          end_date?: string | null;
          id?: number;
          is_active: boolean;
          product_id: number;
          sale_price: number;
          start_date?: string | null;
        };
        Update: {
          created_at?: string | null;
          end_date?: string | null;
          id?: number;
          is_active?: boolean;
          product_id?: number;
          sale_price?: number;
          start_date?: string | null;
        };
      };
      products: {
        Row: {
          created_at: string | null;
          description: string;
          id: number;
          name: string;
          picture_url: string;
          price: number;
        };
        Insert: {
          created_at?: string | null;
          description: string;
          id?: number;
          name: string;
          picture_url: string;
          price: number;
        };
        Update: {
          created_at?: string | null;
          description?: string;
          id?: number;
          name?: string;
          picture_url?: string;
          price?: number;
        };
      };
      restaurant_types: {
        Row: {
          created_at: string | null;
          id: number;
          name: string;
        };
        Insert: {
          created_at?: string | null;
          id?: number;
          name: string;
        };
        Update: {
          created_at?: string | null;
          id?: number;
          name?: string;
        };
      };
      restaurants: {
        Row: {
          address_id: number;
          banner_url: string | null;
          created_at: string | null;
          id: number;
          name: string;
          picture_url: string;
          restaurant_type_id: number;
        };
        Insert: {
          address_id: number;
          banner_url?: string | null;
          created_at?: string | null;
          id?: number;
          name: string;
          picture_url: string;
          restaurant_type_id: number;
        };
        Update: {
          address_id?: number;
          banner_url?: string | null;
          created_at?: string | null;
          id?: number;
          name?: string;
          picture_url?: string;
          restaurant_type_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null;
          id: string;
          name: string;
          owner: string | null;
          public: boolean | null;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string | null;
          id: string;
          name: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string | null;
          id?: string;
          name?: string;
          owner?: string | null;
          public?: boolean | null;
          updated_at?: string | null;
        };
      };
      migrations: {
        Row: {
          executed_at: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Insert: {
          executed_at?: string | null;
          hash: string;
          id: number;
          name: string;
        };
        Update: {
          executed_at?: string | null;
          hash?: string;
          id?: number;
          name?: string;
        };
      };
      objects: {
        Row: {
          bucket_id: string | null;
          created_at: string | null;
          id: string;
          last_accessed_at: string | null;
          metadata: Json | null;
          name: string | null;
          owner: string | null;
          path_tokens: string[] | null;
          updated_at: string | null;
        };
        Insert: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
        Update: {
          bucket_id?: string | null;
          created_at?: string | null;
          id?: string;
          last_accessed_at?: string | null;
          metadata?: Json | null;
          name?: string | null;
          owner?: string | null;
          path_tokens?: string[] | null;
          updated_at?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      extension: {
        Args: { name: string };
        Returns: string;
      };
      filename: {
        Args: { name: string };
        Returns: string;
      };
      foldername: {
        Args: { name: string };
        Returns: string[];
      };
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>;
        Returns: { size: number; bucket_id: string }[];
      };
      search: {
        Args: {
          prefix: string;
          bucketname: string;
          limits: number;
          levels: number;
          offsets: number;
          search: string;
          sortcolumn: string;
          sortorder: string;
        };
        Returns: {
          name: string;
          id: string;
          updated_at: string;
          created_at: string;
          last_accessed_at: string;
          metadata: Json;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
