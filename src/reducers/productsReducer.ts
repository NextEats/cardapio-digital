export function productsReducer(state: any, action: any) {
  switch (action.type) {
    case "add":
      if (state) {
        return [
          ...state,
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
            picture_url: action.payload.picture_url,
            additionals: action.payload.additionals,
            options: action.payload.options,
            observation: action.payload.observation,
          },
        ];
      } else {
        return [
          {
            id: action.payload.id,
            name: action.payload.name,
            price: action.payload.price,
            quantity: action.payload.quantity,
            picture_url: action.payload.picture_url,
            additionals: action.payload.additionals,
            options: action.payload.options,
          },
        ];
      }
    case "deleteProduct":
      const index = action.payload.index;
      return [...state.slice(0, index), ...state.slice(index + 1)];
    case "addQuantity":
      return state.map((product: any, index: number) => {
        if (index === action.payload.index) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
    case "subtractQuantity":
      return state.map((product: any, index: number) => {
        if (index === action.payload.index) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
  }
}
