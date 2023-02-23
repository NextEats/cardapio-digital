import addProduct from './actions/addProduct';

export function productsReducer(state: any, action: any) {
    switch (action.type) {
        case 'add':
            addProduct(state, action);
        case 'deleteProduct':
            const index = action.payload.index;
            return [...state.slice(0, index), ...state.slice(index + 1)];
        case 'addQuantity':
            return state.map((product: any, index: number) => {
                if (index === action.payload.index) {
                    return { ...product, quantity: product.quantity + 1 };
                }
                return product;
            });
        case 'subtractQuantity':
            return state.map((product: any, index: number) => {
                if (index === action.payload.index) {
                    return { ...product, quantity: product.quantity - 1 };
                }
                return product;
            });
    }
}
