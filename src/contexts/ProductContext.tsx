import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';
import {
    iProductCategories,
    iProductsWithFKData,
    iRestaurant,
} from '../types/types';

interface iProductContextProps {
    products: iProductsWithFKData[];
    productSelected: iProductsWithFKData[]
    setProductSelected: Dispatch<SetStateAction<iProductsWithFKData[]>>
    categories: iProductCategories["data"]

}
interface iProductContextProviderProps {
    children: ReactNode;
    restaurant: iRestaurant['data'];
    products: iProductsWithFKData[];
    categories: iProductCategories["data"]

}

export const ProductContext = createContext({} as iProductContextProps);

export default function ProductContextProvider({
    children,
    restaurant,
    products,
    categories,
}: iProductContextProviderProps) {
    const [productSelected, setProductSelected] = useState<iProductsWithFKData[]>([])

    return (
        <ProductContext.Provider
            value={{
                // ferchs
                products,
                categories,
                productSelected,
                setProductSelected,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
