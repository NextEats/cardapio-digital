export default function addQuantity(state: any, action: any) {
    return state.reduce((acc: any, item: any, index: any) => {
        if (index === action.payload.index) {
            acc.push({ ...item, quantity: item.quantity + 1 });
        } else {
            acc.push(item);
        }
        return acc;
    }, []);
}
