import { createContext } from 'react';
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
}

export const DigitalMenuContext = createContext({
    selectedProductId: undefined,
} as iDigitalMenuContext);
