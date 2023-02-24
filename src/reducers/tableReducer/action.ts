import { iAdditional, iInsertOrder, iProduct, iProductOption, iSelect } from "src/types/types"


export enum tableReducerAction {
    PRODUCTSSELECTED = "PRODUCTSSELECTED",
    PRODUCT = "PRODUCT",
    ADDITIONALS = "ADDITIONALS",
    CHANGEADDITIONALQUANTITY = "CHANGEADDITIONALQUANTITY",
}


export function selectProductAction(product: iProduct["data"] | null) {
    return {
        type: tableReducerAction.PRODUCT,
        payload: { product }
    }
}
export function selectAdditionalAction(additional: iAdditional["data"]) {
    return {
        type: tableReducerAction.ADDITIONALS,
        payload: { additional }
    }
}
export function changeAdditionalQuantityAction(isIncrement: boolean, additionalId: number) {
    return {
        type: tableReducerAction.CHANGEADDITIONALQUANTITY,
        payload: { isIncrement, additionalId }
    }
}
export function addProductAction(product: iProduct["data"]) {
    return {
        type: tableReducerAction.PRODUCTSSELECTED,
        payload: { product }
    }
}