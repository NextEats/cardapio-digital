import { createContext, Dispatch } from 'react';
import { tSelectWithOptions } from '../fetch/productSelects/getProductSelectWithOptions';
import { iRestaurantWithFKData } from '../types/types';
export interface iShowModalsState {
    checkout: boolean;
    operatingTime: boolean;
    product: boolean;
}

export interface iProductsReducer {
    id: number;
    observation: string;
    quantity: number;
    additionals?: Array<any>;
    selects?: Array<any>;
}

export interface iDigitalMenuContext {
    restaurant?: iRestaurantWithFKData;
    selectedProduct?: {
        state: string | undefined;
        set: React.Dispatch<React.SetStateAction<string | undefined>>;
    };
    products?: any;
    modals?: {
        state: iShowModalsState;
        set: React.Dispatch<React.SetStateAction<iShowModalsState>>;
    };
    selects?: {
        state: tSelectWithOptions[];
        set: React.Dispatch<React.SetStateAction<tSelectWithOptions[]>>;
    };
    productReducer?: {
        state: Array<iProductsReducer> | undefined | null;
        dispatch: Dispatch<any>;
    };
}

export const DigitalMenuContext = createContext({
    selectedProductId: undefined,
} as iDigitalMenuContext);
