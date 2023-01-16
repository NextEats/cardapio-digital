
export interface IEditableProductReducerData {

    name: string,
    description: string,
    price: string,
    isEditingName: boolean,
    isEditingPrice: boolean,
}

export function editableProductReducer(state: IEditableProductReducerData, action: any) {
    switch (action.type) {
        case "ADD_PRODUCT_NAME":
            return { ...state, name: action.payload.name }
            break
        case "ADD_PRODUCT_DESCRIPTION":
            return { ...state, description: action.payload.description }
            break
        case "ADD_PRODUCT_PRICE":
            return { ...state, price: action.payload.price } 
            break
        case "IS_EDITING_INFORMATION":
            return { ...state, isEditingName: action.payload.isEditingName }
            break
        case "IS_EDITING_PRICE":
            return { ...state, isEditingPrice: action.payload.isEditingPrice }
            break
        default:
            return state
    }
}