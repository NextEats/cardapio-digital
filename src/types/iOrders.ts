import { iAdditional } from './iAdditional';
import { iAddress } from './iAddress';
import { iCashBox } from './iCashBox';
import { iClient } from './iClient';
import { iContact } from './iContact';
import { iDeliveryFee } from './iDeliveryFee';
import { iPaymentMethod } from './iPaymentMethod';
import { iProduct, iProductOptions } from './iProducts';
import { iTable } from './iTable';
import { Database } from './supabase';

export interface iOrder {
  data: Database['public']['Tables']['orders']['Row'];
}
export interface iOrderTypes {
  data: Database['public']['Tables']['order_types']['Row'];
}
export interface iOrderProduct {
  data: Database['public']['Tables']['orders_products']['Row'];
}

export interface iOrdersTable {
  data: Database['public']['Tables']['orders_tables']['Row'];
}

export interface iOrdersTables {
  data: Array<Database['public']['Tables']['orders_tables']['Row']>;
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
export interface iOrders {
  data: Array<Database['public']['Tables']['orders']['Row']>;
}
export type iOrdersProductsWithFKProducdData = iOrderProduct['data'] & {
  products: iProduct['data'];
  additionals: {
    additional: iAdditional['data'];
    quantity: number;
  }[];
  selectsWithOptions: {
    id: number;
    options: iProductOptions['data'];
  }[];
};
export type iOrdersProductsWithFKDataToDelivery = iOrderProduct['data'] & {
  orders: iOrder['data'] & {
    order_status: iOrderStatus['data'];
    payment_methods: iPaymentMethod['data'];
    clients: iClient['data'] & {
      contacts: iContact['data'];
      addresses: iAddress['data'];
    };
    delivery_fees: iDeliveryFee['data'];
  };
  products: iProduct['data'];
  additionals: {
    additional: iAdditional['data'];
    quantity: number;
  }[];
  selectsWithOptions: {
    id: number;
    options: iProductOptions['data'];
  }[];
};

export type iOrdersTablesWithOrderFkData = iOrdersTable['data'] & {
  orders: iOrder['data'];
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
export type iOrdersWithStatusFKData = iOrder['data'] & {
  order_types: iOrderTypes['data'];
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

export type iOrdersProductsWithFKData = iOrderProduct['data'] & {
  orders: iOrder['data'] & {
    order_status: iOrderStatus['data'];
    payment_methods: iPaymentMethod['data'];
  };
  products: iProduct['data'];
  additionals: {
    additional: iAdditional['data'];
    quantity: number;
  }[];
  selectsWithOptions: {
    id: number;
    options: iProductOptions['data'];
  }[];
};

export interface iOrdersProductsView {
  data: Database['public']['Views']['orders_products_by_restaurant']['Row'];
}
export interface iInsertOrdersTable {
  data: Database['public']['Tables']['orders_tables']['Insert'];
}

export interface iInsertOrdersTables {
  data: Array<Database['public']['Tables']['orders_tables']['Insert']>;
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
