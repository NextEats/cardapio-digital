import { iCheckoutProduct } from "../types/types";

const products: Array<iCheckoutProduct> = [
  {
    category_id: 1,
    description: "A delicious and refreshing drink",
    id: 1001,
    name: "Soda",
    picture_url:
      "https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/ingredient-pictures/04129.jpg",
    price: 2.5,
    quantity: 3,
    selects: [
      {
        name: "Size",
        options: [
          {
            id: 1,
            name: "Small",
            selected: true,
          },
          {
            id: 2,
            name: "Medium",
            selected: false,
          },
          {
            id: 3,
            name: "Large",
            selected: false,
          },
        ],
      },
      {
        name: "Flavor",
        options: [
          {
            id: 4,
            name: "Coca-Cola",
            selected: true,
          },
          {
            id: 5,
            name: "Pepsi",
            selected: false,
          },
          {
            id: 6,
            name: "Sprite",
            selected: false,
          },
        ],
      },
    ],
    additionals: [
      {
        id: 7,
        name: "Extra Ice",
        price: 0.5,
        picture_url:
          "https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/ingredient-pictures/04129.jpg",
        quantity: 1,
      },
      {
        id: 8,
        name: "Extra Lime",
        picture_url:
          "https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/ingredient-pictures/04129.jpg",
        price: 0.2,
        quantity: 2,
      },
    ],
  },
  {
    category_id: 2,
    description: "A classic snack",
    id: 1002,
    name: "Chips",
    picture_url:
      "https://cceilpiizkukiqfodhec.supabase.co/storage/v1/object/public/ingredient-pictures/04129.jpg",
    price: 1.5,
    quantity: 1,
  },
];

export default products;
