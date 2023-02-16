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
            observation: action.payload.observation,
          },
        ];
      }
    case "deleteProduct":
      return state.reduce((acc: any, current: any) => {
        console.log(action.payload.id, current.id);
        if (current.id !== action.payload.id) {
          acc.push(current);
        }
        return acc;
      }, []);
    case "addQuantity":
      return state.reduce((acc: any, current: any) => {
        if (current.id == action.payload.id) {
          current.quantity += 1;
          acc.push(current);
        } else {
          acc.push(current);
        }
        return acc;
      }, []);
    case "subtractQuantity":
      return state.reduce((acc: any, current: any) => {
        if (current.id == action.payload.id) {
          current.quantity -= 1;
          acc.push(current);
        } else {
          acc.push(current);
        }
        return acc;
      }, []);
  }
}
