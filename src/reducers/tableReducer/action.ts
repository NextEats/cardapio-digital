import { iAdditional, iInsertOrder, iProductOption, iSelect } from "src/types/types"


export enum tableReducerAction {
    OPTIONS = "OPTIONS",
    ADDITIONALS = "ADDITIONALS",
    CHANGEADDITIONALQUANTITY = "CHANGEADDITIONALQUANTITY",
}


export function selectOptionAction(option: iProductOption["data"], select: iSelect["data"]) {
    return {
        type: tableReducerAction.OPTIONS,
        payload: { option, select, }
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