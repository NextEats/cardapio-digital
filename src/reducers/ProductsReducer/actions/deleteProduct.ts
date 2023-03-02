export default function deleteProduct(state: any, action: any) {
    const index = action.payload.index;
    return [...state.slice(0, index), ...state.slice(index + 1)];
}
