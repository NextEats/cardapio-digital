import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions'
import { SelectOption, tSelectOption } from './actions/SelectOption'

export type tState = {
    productSelects: tSelectWithOptions[]
}

type tAction =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: tSelectWithOptions[] }
    | { type: 'FETCH_FAILURE'; payload: string }
    | tSelectOption

export const initialState: tState = {
    productSelects: [],
}

export default function productSelectReducer(
    state = initialState,
    action: tAction
): tState {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                productSelects: action.payload,
            }
        case 'SELECT_OPTION':
            return SelectOption(action, state)
        default:
            return state
    }
}
