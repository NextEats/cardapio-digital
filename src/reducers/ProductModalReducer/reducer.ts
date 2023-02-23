import { iProductAdditional } from '@/src/types/types';

export type tProductModalReducer = React.Reducer<iProductModalReducer, any>;

export interface iProductModalReducer {
    additionals?: iProductAdditional[];
    price: number;
    quantity: number;
    observation?: string | null;
}

export function ProductModalReducer(
    state: iProductModalReducer,
    action: any
): iProductModalReducer {
    switch (action.type) {
        case 'add':
            // ... logic to update the state based on the action
            return {
                ...state,
                // ... updated state properties
            };
        default:
            return state;
    }
}
