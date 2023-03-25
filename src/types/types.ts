import { Database } from './supabase';

export interface iProduct {
    data: Database['public']['Tables']['products']['Row'];
}

export interface iProducts {
    data: Array<Database['public']['Tables']['products']['Row']>;
}

export interface iRestaurant {
    data: Database['public']['Tables']['restaurants']['Row'];
}

export interface iRestaurants {
    data: Array<Database['public']['Tables']['restaurants']['Row']>;
}

export interface iIngredient {
    data: Database['public']['Tables']['ingredients']['Row'];
}

export interface iIngredients {
    data: Array<iIngredient>;
}

export interface iAdditional {
    data: Database['public']['Tables']['additionals']['Row'];
}

export interface iAdditionals {
    data: Array<Database['public']['Tables']['additionals']['Row']>;
}

export interface iRestaurantType {
    data: Database['public']['Tables']['restaurant_types']['Row'];
}

export interface iRestaurantTypes {
    data: Array<Database['public']['Tables']['restaurant_types']['Row']>;
}

export interface iProductCategory {
    data: Database['public']['Tables']['product_categories']['Row'];
}

export interface iProductCategories {
    data: Array<Database['public']['Tables']['product_categories']['Row']>;
}
export interface iOrder {
    data: Database['public']['Tables']['orders']['Row'];
}

export interface iOrders {
    data: Array<Database['public']['Tables']['orders']['Row']>;
}

export interface iOrderProduct {
    data: Database['public']['Tables']['orders_products']['Row'];
}

export interface iOrdersProducts {
    data: Array<Database['public']['Tables']['orders_products']['Row']>;
}
export interface iOrderStatus {
    data: Database['public']['Tables']['order_status']['Row'];
}

export interface iOrdersStatus {
    data: Array<Database['public']['Tables']['order_status']['Row']>;
}
export interface iCashBox {
    data: Database['public']['Tables']['cash_boxes']['Row'];
}

export interface iCashBoxes {
    data: Array<Database['public']['Tables']['cash_boxes']['Row']>;
}
export interface iSelect {
    data: Database['public']['Tables']['selects']['Row'];
}

export interface iSelects {
    data: Array<Database['public']['Tables']['selects']['Row']>;
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
export interface iClient {
    data: Database['public']['Tables']['clients']['Row'];
}

export interface iClients {
    data: Array<Database['public']['Tables']['clients']['Row']>;
}
export interface iContact {
    data: Database['public']['Tables']['contacts']['Row'];
}

export interface iContacts {
    data: Array<Database['public']['Tables']['contacts']['Row']>;
}
export interface iTable {
    data: Database['public']['Tables']['tables']['Row'];
}

export interface iTables {
    data: Array<Database['public']['Tables']['tables']['Row']>;
}
export interface iOrdersTable {
    data: Database['public']['Tables']['orders_tables']['Row'];
}

export interface iOrdersTables {
    data: Array<Database['public']['Tables']['orders_tables']['Row']>;
}
export interface iDeliveryFee {
    data: Database['public']['Tables']['delivery_fees']['Row'];
}

export interface iDeliveryFees {
    data: Array<Database['public']['Tables']['delivery_fees']['Row']>;
}
export interface iAdditionalCategory {
    data: Database['public']['Tables']['additional_categories']['Row'];
}

export interface iAdditionalCategories {
    data: Array<Database['public']['Tables']['additional_categories']['Row']>;
}

export interface iRestaurantOrderType {
    data: Database['public']['Tables']['restaurant_order_type']['Row'];
}

export interface iRestaurantOrderTypes {
    data: Array<Database['public']['Tables']['restaurant_order_type']['Row']>;
}

// ==================   INSERTS  =====================

export interface iInsertRestaurantOrderType {
    data: Database['public']['Tables']['restaurant_order_type']['Insert'];
}

export interface iInsertRestaurantOrderTypes {
    data: Array<
        Database['public']['Tables']['restaurant_order_type']['Insert']
    >;
}

export interface iInsertDeliveryFee {
    data: Database['public']['Tables']['delivery_fees']['Insert'];
}

export interface iInsertDeliveryFees {
    data: Array<Database['public']['Tables']['delivery_fees']['Insert']>;
}
export interface iInsertOrdersTable {
    data: Database['public']['Tables']['orders_tables']['Insert'];
}

export interface iInsertOrdersTables {
    data: Array<Database['public']['Tables']['orders_tables']['Insert']>;
}
export interface iInsertTable {
    data: Database['public']['Tables']['tables']['Insert'];
}

export interface iInsertTables {
    data: Array<Database['public']['Tables']['tables']['Insert']>;
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
export interface iInsertProduct {
    data: Database['public']['Tables']['products']['Insert'];
}

export interface iInsertProducts {
    data: Array<Database['public']['Tables']['products']['Insert']>;
}

export interface iInsertRestaurant {
    data: Database['public']['Tables']['restaurants']['Insert'];
}

export interface iInsertRestaurants {
    data: Array<Database['public']['Tables']['restaurants']['Insert']>;
}
export interface iInsertAddress {
    data: Database['public']['Tables']['addresses']['Insert'];
}
export interface iInsertAddresses {
    data: Array<Database['public']['Tables']['addresses']['Insert']>;
}
export interface iInsertOrderProduct {
    data: Database['public']['Tables']['orders_products']['Insert'];
}

export interface iInsertOrdersProducts {
    data: Array<Database['public']['Tables']['orders_products']['Insert']>;
}
export interface iInsertOrderStatus {
    data: Database['public']['Tables']['order_status']['Insert'];
}

export interface iInsertOrderStatuss {
    data: Array<Database['public']['Tables']['order_status']['Insert']>;
}
export interface iInsertOrder {
    data: Database['public']['Tables']['orders']['Insert'];
}

export interface iInsertOrders {
    data: Array<Database['public']['Tables']['orders']['Insert']>;
}
export interface iInsertSelect {
    data: Database['public']['Tables']['selects']['Insert'];
}

export interface iInsertSelects {
    data: Array<Database['public']['Tables']['selects']['Insert']>;
}
export interface iInsertProductSelect {
    data: Database['public']['Tables']['product_selects']['Insert'];
}

export interface iInsertProductSelects {
    data: Array<Database['public']['Tables']['product_selects']['Insert']>;
}
export interface iInsertIngredient {
    data: Database['public']['Tables']['ingredients']['Insert'];
}
export interface iInsertIngredients {
    data: Array<Database['public']['Tables']['ingredients']['Insert']>;
}
// ====
export interface iInsertAdditional {
    data: Database['public']['Tables']['additionals']['Insert'];
}
export interface iInsertAdditionals {
    data: Array<Database['public']['Tables']['additionals']['Insert']>;
}
// ====
export interface iInsertProductAdditional {
    data: Database['public']['Tables']['product_additionals']['Insert'];
}
export interface iInsertProductAdditionals {
    data: Array<Database['public']['Tables']['product_additionals']['Insert']>;
}
// ====
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

export interface iGroupedProducts {
    [key: number]: {
        category_name: string | '';
        products: ProductWithCategory[];
    };
}

export type ProductWithCategory = iProduct['data'] & {
    category_name: string;
    category_order: number;
};

export interface iProductOption {
    data: Database['public']['Tables']['product_options']['Row'];
}

export interface iProductOptions {
    data: Array<Database['public']['Tables']['product_options']['Row']>;
}
export interface IAdditionalsData {
    additionals_data: {
        quantity: number;
        additional_id: number;
    }[];
}

export interface iCheckoutProduct {
    category_id: number;
    description: string;
    observation: string;
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
    data: Database['public']['Tables']['addresses']['Row'];
}
export interface iAddresses {
    data: Array<Database['public']['Tables']['addresses']['Row']>;
}

export interface iWeekdayOperatingTime {
    data: Database['public']['Tables']['weekday_operating_time']['Row'];
}

export interface iWeekday {
    data: Database['public']['Tables']['weekdays']['Row'];
}

export interface iPaymentMethod {
    data: Database['public']['Tables']['payment_methods']['Row'];
}
export interface iPaymentMethods {
    data: Array<Database['public']['Tables']['payment_methods']['Row']>;
}

export interface iPaymentMethodsRestaurants {
    data: Database['public']['Tables']['payment_methods_restaurants']['Row'];
}
export interface iPaymentMethodsRestaurantss {
    data: Array<
        Database['public']['Tables']['payment_methods_restaurants']['Row']
    >;
}

export type iPaymentMethodsRestaurantsWithFKData =
    iPaymentMethodsRestaurants['data'] & {
        payment_methods: iPaymentMethod['data'];
    };
export type iRestaurantOrderTypesWithFKData = iRestaurantOrderType['data'] & {
    restaurants: iRestaurant['data'];
    order_types: iOrderTypes['data'];
};

export type iRestaurantWithFKData = iRestaurant['data'] & {
    addresses: iAddress['data'];
    restaurant_types: iRestaurantType['data'];
    weekday_operating_time: Array<
        iWeekdayOperatingTime['data'] & {
            weekdays: iWeekday['data'];
        }
    >;
};

export interface iOrderTypes {
    data: Database['public']['Tables']['order_types']['Row'];
}

export interface iDeliveryFees {
    data: Array<Database['public']['Tables']['delivery_fees']['Row']>;
}

export type iProductsWithFKData = iProduct['data'] & {
    category_id: iProductCategory["data"]
};

export type iOrdersWithFKData = iOrder['data'] & {
    payment_methods: iPaymentMethod['data'];
    order_types: iOrderTypes['data'];
    clients: {
        id: number;
        name: string;
        contacts: iContact['data'];
        addresses: iAddress['data'];
    };
    order_status: iOrderStatus['data'];
    delivery_fees: iDeliveryFee['data'];
};

export type iOrdersTablesWithFkData = iOrdersTable['data'] & {
    orders: {
        id: number;
        cash_boxes: iCashBox['data'];
        order_status: iOrderStatus['data'];
    };
    tables: iTable['data'];
};
export interface iDigitalMenuData {
    restaurant: iRestaurantWithFKData;
    groupedProducts: any;
}

export interface iUserDetails {
    data: Database['public']['Tables']['user_details']['Row'];
}

export type tUserDetails = {
    id: number;
    restaurant_id: number;
    user_id: string;
    is_waiter: boolean;
    restaurants: {
        id: number;
        name: string;
        slug: string;
    };
};
