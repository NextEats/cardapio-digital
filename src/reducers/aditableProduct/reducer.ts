
export interface IEditableProductReducerData {

    productInformation: {
        name: string,
        description: string,
        price: string,
    }
    isEditingInfo: boolean,
    picture_url: string,
    isEditingPicture: boolean,
}

export function editableProductReducer(state: IEditableProductReducerData, action: any) {
    switch (action.type) {
        case "IS_EDITING_INFORMATION":
            return { ...state, isEditingInfo: action.payload.isEditingInfo }
            break
        case "ADD_PRODUCT_INFORMATION":
            return { 
                ...state,
                productInformation: {
                    name: action.payload.name,
                    description: action.payload.description,
                    price: action.payload.price,
                } }
            break
        case "IS_EDITING_PICTURE":
            return { ...state, isEditingPicture: action.payload.isEditingPicture }
            break
        case "SET_PICTURE_URL":
            console.log("ddd" + action.payload.picture_url)
            return { ...state, picture_url: action.payload.picture_url }
            break
        default:
            return state
    }
}