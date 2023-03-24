import {
    createContext,
    ReactNode,
} from 'react';
import {
    iProductsWithFKData,
    iRestaurant,
} from '../types/types';

interface iProductContextProps {
    products: iProductsWithFKData[];
}
interface iProductContextProviderProps {
    children: ReactNode;
    restaurant: iRestaurant['data'];
    products: iProductsWithFKData[];

}

export const ProductContext = createContext({} as iProductContextProps);

export default function ProductContextProvider({
    children,
    restaurant,
    products,
}: iProductContextProviderProps) {


    return (
        <ProductContext.Provider
            value={{
                products
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
