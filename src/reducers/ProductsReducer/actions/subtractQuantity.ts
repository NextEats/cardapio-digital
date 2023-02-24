export default function subtractQuantity(state: any, action: any) {
    return state.map((product: any, index: number) => {
        if (index === action.payload.index) {
            return { ...product, quantity: product.quantity - 1 };
        }
        return product;
    });
}
