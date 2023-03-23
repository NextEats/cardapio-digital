import { iAdditional, iAdditionals } from '@/src/types/types';

export type tState = {
    additionals: Array<iAdditional['data']>;
    quantityAdditionals: {
        quantity: number;
        price: number;
        additionalId: number;
    }[];
};

export const initialState: tState = {
    additionals: [],
    quantityAdditionals: [],
};

type tAction =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: Array<iAdditional['data']> }
    | { type: 'FETCH_FAILURE'; payload: string }
    | { type: 'ADD_ADDITIONAL'; payload: iAdditionals }
    | {
          type: 'CHANGEADDITIONALQUANTITY';
          payload: { isIncrement: boolean; additionalId: number };
      }
    | {
          type: 'SELECTADDITIONALS';
          payload: { additional: iAdditional['data'] };
      };

export default function AdditionalsReducer(
    state = initialState,
    action: any
): tState {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return {
                ...state,
                additionals: action.payload,
            };
        case 'ADD_ADDITIONAL':
            // return SelectOption(action, state)
            return state;
        case 'ADD_ADDITIONAL':
        case 'SELECTADDITIONALS':
            return {
                ...state,
                // additionals: [...state.additionals, action.payload.additional],
                // totalPrice: state.totalPrice + action.payload.additional.price,
                quantityAdditionals: [
                    ...state.quantityAdditionals,
                    {
                        quantity: 1,
                        price: action.payload.additional.price,
                        additionalId: action.payload.additional.id,
                    },
                ],
            };
        case 'CHANGEADDITIONALQUANTITY':
            const additional =
                state.quantityAdditionals[
                    state.quantityAdditionals.findIndex(
                        (aq) => aq.additionalId === action.payload.additionalId
                    )
                ];
            if (action.payload.isIncrement) {
                state.quantityAdditionals[
                    state.quantityAdditionals.findIndex(
                        (aq) => aq.additionalId === action.payload.additionalId
                    )
                ].quantity++;
                // state.totalPrice = state.totalPrice + additional.price
                return { ...state };
            } else {
                state.quantityAdditionals[
                    state.quantityAdditionals.findIndex(
                        (aq) => aq.additionalId === action.payload.additionalId
                    )
                ].quantity--;

                // state.totalPrice = state.totalPrice - additional.price
                if (additional.quantity <= 0) {
                    state.quantityAdditionals.splice(
                        state.quantityAdditionals.findIndex(
                            (aq) =>
                                aq.additionalId === action.payload.additionalId
                        ),
                        1
                    );
                    return { ...state };
                }
                return { ...state };
            }
        case 'CLEAR_ADDITIONALS':
            return { ...state, quantityAdditionals: [] };
        default:
            return state;
    }
}
