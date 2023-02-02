import { Database } from "./supabase";

export interface iProduct {
  data: Database["public"]["Tables"]["products"]["Row"];
}

export interface iProducts {
  data: Array<Database["public"]["Tables"]["products"]["Row"]>;
}

export interface iRestaurant {
  data: Database["public"]["Tables"]["restaurants"]["Row"];
}

export interface iRestaurants {
  data: Array<Database["public"]["Tables"]["restaurants"]["Row"]>;
}

export interface iIngredient {
  data: Database["public"]["Tables"]["ingredients"]["Row"];
}

export interface iIngredients {
  data: Array<iIngredient>;
}

export interface iAdditional {
  data: Database["public"]["Tables"]["additionals"]["Row"];
}

export interface iAdditionals {
  data: Array<Database["public"]["Tables"]["additionals"]["Row"]>;
}

export interface iRestaurantType {
  data: Database["public"]["Tables"]["restaurant_types"]["Row"];
}

export interface iRestaurantTypes {
  data: Array<Database["public"]["Tables"]["restaurant_types"]["Row"]>;
}

export interface iProductCategory {
  data: Database["public"]["Tables"]["product_categories"]["Row"];
}

export interface iProductCategories {
  data: Array<Database["public"]["Tables"]["product_categories"]["Row"]>;
}
export interface iOrder {
  data: Database["public"]["Tables"]["orders"]["Row"];
}

export interface iOrders {
  data: Array<Database["public"]["Tables"]["orders"]["Row"]>;
}

export interface iOrderProduct {
  data: Database["public"]["Tables"]["orders_products"]["Row"];
}

export interface iOrdersProducts {
  data: Array<Database["public"]["Tables"]["orders_products"]["Row"]>;
}
export interface iOrderStatus {
  data: Database["public"]["Tables"]["order_status"]["Row"];
}

export interface iOrdersStatus {
  data: Array<Database["public"]["Tables"]["order_status"]["Row"]>;
}

//  INSERTS
export interface iInsertContact {
  data: Database["public"]["Tables"]["contacts"]["Insert"];
}

export interface iInsertContacts {
  data: Array<Database["public"]["Tables"]["contacts"]["Insert"]>;
}
export interface iInsertClient {
  data: Database["public"]["Tables"]["clients"]["Insert"];
}

export interface iInsertClients {
  data: Array<Database["public"]["Tables"]["clients"]["Insert"]>;
}
export interface iInsertProduct {
  data: Database["public"]["Tables"]["products"]["Insert"];
}

export interface iInsertProducts {
  data: Array<Database["public"]["Tables"]["products"]["Insert"]>;
}

export interface iInsertRestaurant {
  data: Database["public"]["Tables"]["restaurants"]["Insert"];
}

export interface iInsertRestaurants {
  data: Array<Database["public"]["Tables"]["restaurants"]["Insert"]>;
}
export interface iInsertAddress {
  data: Database["public"]["Tables"]["addresses"]["Insert"];
}
export interface iInsertAddresses {
  data: Array<Database["public"]["Tables"]["addresses"]["Insert"]>;
}
export interface iInsertOrderProduct {
  data: Database["public"]["Tables"]["orders_products"]["Insert"];
}

export interface iInsertOrdersProducts {
  data: Array<Database["public"]["Tables"]["orders_products"]["Insert"]>;
}
export interface iInsertOrderStatus {
  data: Database["public"]["Tables"]["order_status"]["Insert"];
}

export interface iInsertOrderStatuss {
  data: Array<Database["public"]["Tables"]["order_status"]["Insert"]>;
}
export interface iInsertOrder {
  data: Database["public"]["Tables"]["orders"]["Insert"];
}

export interface iInsertOrders {
  data: Array<Database["public"]["Tables"]["orders"]["Insert"]>;
}
export interface iInsertSelect {
  data: Database["public"]["Tables"]["selects"]["Insert"];
}

export interface iInsertSelects {
  data: Array<Database["public"]["Tables"]["selects"]["Insert"]>;
}
export interface iInsertProductSelect {
  data: Database["public"]["Tables"]["product_selects"]["Insert"];
}

export interface iInsertProductSelects {
  data: Array<Database["public"]["Tables"]["product_selects"]["Insert"]>;
}
export interface iInsertIngredient {
  data: Database["public"]["Tables"]["ingredients"]["Insert"];
}
export interface iInsertIngredients {
  data: Array<Database["public"]["Tables"]["ingredients"]["Insert"]>;
}
// ====
export interface iInsertAdditional {
  data: Database["public"]["Tables"]["additionals"]["Insert"];
}
export interface iInsertAdditionals {
  data: Array<Database["public"]["Tables"]["additionals"]["Insert"]>;
}
// ====
export interface iInsertProductAdditional {
  data: Database["public"]["Tables"]["product_additionals"]["Insert"];
}
export interface iInsertProductAdditionals {
  data: Array<Database["public"]["Tables"]["product_additionals"]["Insert"]>;
}
// ====
export interface iInsertProductCategory {
  data: Database["public"]["Tables"]["product_categories"]["Insert"];
}
export interface iInsertProductCategories {
  data: Array<Database["public"]["Tables"]["product_categories"]["Insert"]>;
}
export interface iInsertProductOption {
  data: Database["public"]["Tables"]["product_options"]["Insert"];
}

export interface iInsertProductOptions {
  data: Array<Database["public"]["Tables"]["product_options"]["Insert"]>;
}
// ====
// export interface iInsertIngredinetOption {
//   data: Database["public"]["Tables"]["ingredient_options"]["Insert"];
// }
// export interface iInsertIngredinetOptions {
//   data: Array<Database["public"]["Tables"]["ingredient_options"]["Insert"]>;
// }
export interface iGroupedProducts {
  [key: number]: {
    category_name: string | "";
    products: ProductWithCategory[];
  };
}

export type ProductWithCategory = iProduct["data"] & {
  category_name: string;
};

export interface iProductOption {
  data: Database["public"]["Tables"]["product_options"]["Row"];
}

export interface iProductOptions {
  data: Array<iProduct>;
}

export interface iCheckoutProduct {
  category_id: number;
  description: string;
  id: number;
  name: string;
  picture_url: string;
  price: number;
  quantity: number;
  selects?: Array<{
    name: string;
    id: number;
    options: Array<{
      id: number;
      name: string;
      picture_url: string;
      is_default_value: boolean;
      selected: boolean;
    }>;
  }>;
  additionals?: Array<{
    id: number;
    name: string;
    picture_url: string;
    price: number;
    quantity: number;
  }>;
}

export interface iAddress {
  data: Database["public"]["Tables"]["addresses"]["Row"];
}

export interface iWeekdayOperatingTime {
  data: Database["public"]["Tables"]["weekday_operating_time"]["Row"];
}

export interface iWeekday {
  data: Database["public"]["Tables"]["weekdays"]["Row"];
}

export type iRestaurantWithFKData = iRestaurant["data"] & {
  addresses: iAddress["data"];
  weekday_operating_time: Array<
    iWeekdayOperatingTime["data"] & {
      weekdays: iWeekday["data"];
    }
  >;
};
