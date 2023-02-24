export default function add(state: any, action: any) {
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
}
