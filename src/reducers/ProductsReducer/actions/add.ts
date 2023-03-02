export default function add(state: any, action: any) {
    if (state) {
        return [
            ...state,
            {
                id: action.payload.id,
                selects: action.payload.selects,
                additionals: action.payload.additionals,
                observation: action.payload.observation,
                quantity: action.payload.quantity,
            },
        ];
    } else {
        return [
            {
                id: action.payload.id,
                selects: action.payload.selects,
                additionals: action.payload.additionals,
                observation: action.payload.observation,
                quantity: action.payload.quantity,
            },
        ];
    }
}
