import {
    iAdditionals,
    iInsertSelect,
    iProductOptions, iSelect, iSelects,
} from "../../types/types";
import { tableReducerAction } from "./action";

export interface iTableReducer {
    additionals: iAdditionals["data"]
    quantityAdditionals: { quantity: number, additionalId: number }[]
    selects: iSelects["data"]
    optionsSelected: iProductOptions["data"]
}

export function tableReducer(state: iTableReducer, action: any) {
    switch (action.type) {
        case tableReducerAction.OPTIONS:
            if (state.optionsSelected.some(o => o.id === action.payload.option.id)) {
                state.optionsSelected.splice(state.optionsSelected.findIndex(o => o.id === action.payload.option.id), 1)
                return { ...state }
            }
            if (state.selects.some(s => s.id === action.payload.select.id)) {
                state.selects.forEach(s => {
                    if (s.id === action.payload.option.select_id) {
                        state.optionsSelected.push(action.payload.option)
                    }
                })
                return { ...state }
            }

            return { ...state, selects: [...state.selects, action.payload.select], optionsSelected: [...state.optionsSelected, action.payload.option] };
        case tableReducerAction.ADDITIONALS:

            // if (state.quantityAdditionals.some(aq => aq.additionalId === action.payload.additional.id)) {

            //     state.quantityAdditionals[state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additional.id)].
            //         quantity++
            //     return { ...state }
            // }

            return {
                ...state,
                additionals: [...state.additionals, action.payload.additional],
                quantityAdditionals: [...state.quantityAdditionals, { quantity: 1, additionalId: action.payload.additional.id }]
            }
        case tableReducerAction.CHANGEADDITIONALQUANTITY:
            console.log(state.quantityAdditionals)
            const additional = state.quantityAdditionals[state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId)]
            if (action.payload.isIncrement) {
                state.quantityAdditionals[state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId)].quantity++
                return { ...state }
            } else {
                state.quantityAdditionals[state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId)].quantity--
                if (additional.quantity <= 0) {
                    state.quantityAdditionals.splice(state.quantityAdditionals.findIndex(aq => aq.additionalId === action.payload.additionalId), 1)
                    return { ...state }
                }
                return { ...state }
            }
            return { ...state }
        default:
            return state;
    }
}


export const tableReducerDefaultValues = {
    additionals: [],
    quantityAdditionals: [],
    selects: [],
    optionsSelected: []
}