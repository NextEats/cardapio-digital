import { createContext } from 'react';
import { tSelectWithOptions } from '../fetch/productSelects/getProductSelectWithOptions';
import { iRestaurantWithFKData } from '../types/types';

export interface iShowModalsState {
    checkout: boolean;
    operatingTime: boolean;
    product: boolean;
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
}

export const DigitalMenuContext = createContext({
    selectedProductId: undefined,
} as iDigitalMenuContext);
