import { iAdditional, iAdditionals, } from "../../types/types";
import { productsPageActions } from "./action";

export interface iProductsPageReducder {
    additionals: iAdditionals["data"]
}
export interface iProductsPageAction {
    type: productsPageActions
    payload: {
        additional: iAdditional["data"]
    }
}

export function productsPageReducder(state: iProductsPageReducder, action: iProductsPageAction) {
    switch (action.type) {
        case productsPageActions.ADDITIONALS:

            return { ...state, additonals: [...state.additionals, action.payload.additional] };
            break;
        default:
            return state;
    }
}

export const productsPageReducderDefaultValues = {
    additionals: []
}
