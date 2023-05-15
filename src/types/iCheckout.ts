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
