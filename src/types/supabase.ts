export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName: string
          query: string
          variables: Json
          extensions: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      additionals: {
        Row: {
          created_at: string | null
          id: number
          name: string
          picture_url: string
          price: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          picture_url: string
          price: number
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          picture_url?: string
          price?: number
        }
      }
      addresses: {
        Row: {
          cep: string
          complement: string | null
          created_at: string | null
          google_maps_link: string | null
          id: number
          number: number
          reference_point: string | null
        }
        Insert: {
          cep: string
          complement?: string | null
          created_at?: string | null
          google_maps_link?: string | null
          id?: number
          number: number
          reference_point?: string | null
        }
        Update: {
          cep?: string
          complement?: string | null
          created_at?: string | null
          google_maps_link?: string | null
          id?: number
          number?: number
          reference_point?: string | null
        }
      }
      clients: {
        Row: {
          address_id: number
          contact_id: number
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          address_id: number
          contact_id: number
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          address_id?: number
          contact_id?: number
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      colors: {
        Row: {
          created_at: string | null
          hexadecimal_code: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          hexadecimal_code: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          hexadecimal_code?: string
          id?: number
          name?: string
        }
      }
      contacts: {
        Row: {
          created_at: string | null
          email: string | null
          id: number
          phone: number | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: number
          phone?: number | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: number
          phone?: number | null
        }
      }
      delivery_distance_fee: {
        Row: {
          created_at: string | null
          distance_in_meters: number
          fee_in_reais: number
          id: number
          restaurant_id: number
        }
        Insert: {
          created_at?: string | null
          distance_in_meters?: number
          fee_in_reais?: number
          id?: number
          restaurant_id: number
        }
        Update: {
          created_at?: string | null
          distance_in_meters?: number
          fee_in_reais?: number
          id?: number
          restaurant_id?: number
        }
      }
      ingredients: {
        Row: {
          created_at: string | null
          has_options: boolean
          id: number
          name: string
          picture_url: string
        }
        Insert: {
          created_at?: string | null
          has_options?: boolean
          id?: number
          name: string
          picture_url: string
        }
        Update: {
          created_at?: string | null
          has_options?: boolean
          id?: number
          name?: string
          picture_url?: string
        }
      }
      operating_time_restaurants: {
        Row: {
          created_at: string | null
          id: number
          restaurant_id: number
          weekday_operating_time_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          restaurant_id: number
          weekday_operating_time_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          restaurant_id?: number
          weekday_operating_time_id?: number
        }
      }
      order_status: {
        Row: {
          created_at: string | null
          id: number
          status_name: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          status_name?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          status_name?: string | null
        }
      }
      order_types: {
        Row: {
          id: number
          name: string | null
        }
        Insert: {
          id?: number
          name?: string | null
        }
        Update: {
          id?: number
          name?: string | null
        }
      }
      orders: {
        Row: {
          client_id: number | null
          created_at: string | null
          id: number
          order_type_id: number
          payment_method_id: number | null
          restaurant_id: number | null
        }
        Insert: {
          client_id?: number | null
          created_at?: string | null
          id?: number
          order_type_id: number
          payment_method_id?: number | null
          restaurant_id?: number | null
        }
        Update: {
          client_id?: number | null
          created_at?: string | null
          id?: number
          order_type_id?: number
          payment_method_id?: number | null
          restaurant_id?: number | null
        }
      }
      orders_products: {
        Row: {
          created_at: string | null
          id: number
          order_id: number
          order_status_id: number | null
          product_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          order_id: number
          order_status_id?: number | null
          product_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          order_id?: number
          order_status_id?: number | null
          product_id?: number
        }
      }
      payment_methods: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      payment_methods_restaurants: {
        Row: {
          created_at: string | null
          id: number
          payment_method_id: number
          restaurant_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          payment_method_id: number
          restaurant_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          payment_method_id?: number
          restaurant_id?: number
        }
      }
      product_additionals: {
        Row: {
          additional_id: number
          created_at: string | null
          id: number
          product_id: number
        }
        Insert: {
          additional_id: number
          created_at?: string | null
          id?: number
          product_id: number
        }
        Update: {
          additional_id?: number
          created_at?: string | null
          id?: number
          product_id?: number
        }
      }
      product_categories: {
        Row: {
          created_at: string | null
          id: number
          name: string
          restaurant_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
          restaurant_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
          restaurant_id?: number
        }
      }
      product_ingredients: {
        Row: {
          created_at: string | null
          id: number
          ingredient_id: number | null
          product_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          ingredient_id?: number | null
          product_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          ingredient_id?: number | null
          product_id?: number | null
        }
      }
      product_options: {
        Row: {
          created_at: string | null
          id: number
          is_default_value: boolean
          name: string
          picture_url: string
          select_id: number
        }
        Insert: {
          created_at?: string | null
          id?: number
          is_default_value?: boolean
          name: string
          picture_url: string
          select_id: number
        }
        Update: {
          created_at?: string | null
          id?: number
          is_default_value?: boolean
          name?: string
          picture_url?: string
          select_id?: number
        }
      }
      product_sales: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: number
          is_active: boolean
          product_id: number
          sale_price: number
          start_date: string | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: number
          is_active: boolean
          product_id: number
          sale_price: number
          start_date?: string | null
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: number
          is_active?: boolean
          product_id?: number
          sale_price?: number
          start_date?: string | null
        }
      }
      product_selects: {
        Row: {
          created_at: string | null
          id: number
          product_id: number | null
          select_id: number | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          select_id?: number | null
        }
        Update: {
          created_at?: string | null
          id?: number
          product_id?: number | null
          select_id?: number | null
        }
      }
      products: {
        Row: {
          category_id: number
          created_at: string | null
          description: string
          id: number
          name: string
          picture_url: string
          price: number
          restaurant_id: number | null
        }
        Insert: {
          category_id: number
          created_at?: string | null
          description: string
          id?: number
          name: string
          picture_url: string
          price: number
          restaurant_id?: number | null
        }
        Update: {
          category_id?: number
          created_at?: string | null
          description?: string
          id?: number
          name?: string
          picture_url?: string
          price?: number
          restaurant_id?: number | null
        }
      }
      restaurant_types: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      restaurants: {
        Row: {
          address_id: number
          banner_url: string | null
          created_at: string | null
          id: number
          name: string
          picture_url: string
          restaurant_type_id: number
          slug: string | null
        }
        Insert: {
          address_id: number
          banner_url?: string | null
          created_at?: string | null
          id?: number
          name: string
          picture_url: string
          restaurant_type_id: number
          slug?: string | null
        }
        Update: {
          address_id?: number
          banner_url?: string | null
          created_at?: string | null
          id?: number
          name?: string
          picture_url?: string
          restaurant_type_id?: number
          slug?: string | null
        }
      }
      selects: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      weekday_operating_time: {
        Row: {
          closing_time: string | null
          created_at: string | null
          id: number
          is_active: boolean
          opening_time: string | null
          restaurant_id: number
          weekday_id: number
        }
        Insert: {
          closing_time?: string | null
          created_at?: string | null
          id?: number
          is_active?: boolean
          opening_time?: string | null
          restaurant_id: number
          weekday_id: number
        }
        Update: {
          closing_time?: string | null
          created_at?: string | null
          id?: number
          is_active?: boolean
          opening_time?: string | null
          restaurant_id?: number
          weekday_id?: number
        }
      }
      weekdays: {
        Row: {
          created_at: string | null
          id: number
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: number
          name: string
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string
        }
      }
      whatsapp_code: {
        Row: {
          code: string
          created_at: string | null
          expiration_date: string
          id: number
          whatsapp_number: string
        }
        Insert: {
          code: string
          created_at?: string | null
          expiration_date: string
          id?: number
          whatsapp_number: string
        }
        Update: {
          code?: string
          created_at?: string | null
          expiration_date?: string
          id?: number
          whatsapp_number?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          created_at: string | null
          id: string
          name: string
          owner: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id: string
          name: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          owner?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          path_tokens: string[] | null
          updated_at: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      extension: {
        Args: { name: string }
        Returns: string
      }
      filename: {
        Args: { name: string }
        Returns: string
      }
      foldername: {
        Args: { name: string }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: { size: number; bucket_id: string }[]
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits: number
          levels: number
          offsets: number
          search: string
          sortcolumn: string
          sortorder: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
