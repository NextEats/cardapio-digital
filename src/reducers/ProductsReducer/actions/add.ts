export default function add(state: any, action: any) {

    // console.log("enru")
    // console.log({
    //     id: action.payload.id,
    //     selects: action.payload.selects,
    //     additionals: action.payload.additionals,
    //     observation: action.payload.observation,
    // })
    if (state) {

        return [
            ...state,
            {
                id: action.payload.id,
                selects: action.payload.selects,
                additionals: action.payload.additionals,
                observation: action.payload.observation,
            },
        ];
    } else {
        return [
            {
                id: action.payload.id,
                selects: action.payload.selects,
                additionals: action.payload.additionals,
                observation: action.payload.observation,
            },
        ];

    }

    // additionals: additionals_data,
    // name: action.payload.name,
    // price: action.payload.price,
    // quantity: action.payload.quantity,
    // picture_url: action.payload.picture_url,
    // options: action.payload.options,
}
