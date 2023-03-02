export default function subtractQuantity(state: any, action: any) {
    return state.reduce((acc: any, item: any, index: any) => {
        if (index === action.payload.index) {
            if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
            }
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}
