import {
    iAdditionals,
    iInsertSelect,
    iProductOptions, iSelect, iSelects,
} from "../../types/types";
import { tableReducerAction } from "./action";

export interface iTableReducer {
    additionals: iAdditionals["data"]
    quantityAdditionals: { quantity: number, price: number, additionalId: number }[]
    selects: iSelects["data"]
    optionsSelected: iProductOptions["data"]
    totalPrice: number
}

export function tableReducer(state: iTableReducer, action: any) {
    switch (action.type) {

        case tableReducerAction.PRODUCT:
            if (action.payload.product === null) {
                return { ...state, totalPrice: 0 }
            }
            return { ...state, totalPrice: action.payload.product.price };

        case tableReducerAction.ADDITIONALS:
            return {
                ...state,
                additionals: [...state.additionals, action.payload.additional],
                totalPrice: state.totalPrice + action.payload.additional.price,
                quantityAdditionals: [...state.quantityAdditionals,
                { quantity: 1, price: action.payload.additional.price, additionalId: action.payload.additional.id }]
            }

        case tableReducerAction.CHANGEADDITIONALQUANTITY:

            const additional = state.quantityAdditionals[state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId)]
            if (action.payload.isIncrement) {
                state.quantityAdditionals[state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId)].quantity++
                state.totalPrice = state.totalPrice + additional.price
                return { ...state }
            } else {
                state.quantityAdditionals![state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId)].quantity--
                state.totalPrice = state.totalPrice - additional.price
                if (additional.quantity <= 0) {
                    state.quantityAdditionals.splice(state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId), 1)
                    // state.totalPrice = state.totalPrice - additional.price
                    return { ...state }
                }
                return { ...state }
            }

        default:
            return state;
    }
}


export const tableReducerDefaultValues = {
    additionals: [],
    quantityAdditionals: [],
    selects: [],
    optionsSelected: [],
    totalPrice: 0
}