import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import {
    iProductCategories,
    iProductsWithFKData,
    iRestaurant,
} from '../types/types';

interface iProductContextProps {
    products: iProductsWithFKData[];
    restaurant: iRestaurant['data'];
    categories: iProductCategories["data"]
    productSelected: iProductsWithFKData[]
    setProductSelected: Dispatch<SetStateAction<iProductsWithFKData[]>>
    setFilter: Dispatch<SetStateAction<{
        name: string | null;
        category: number | null;
    }>>
    filter: {
        name: string | null;
        category: number | null;
    }
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

    const [filter, setFilter] = useState<{
        name: string | null;
        category: number | null;
    }>({
        name: null,
        category: 0,
    });


    const filteredProducts = useMemo(() => {
        if (!products) return [];
        console.log(products)
        return products.filter((product) => {
            if (filter.name !== null) {
                return product.name
                    .toLocaleLowerCase()
                    .includes(filter.name.toLocaleLowerCase());
            } else if (filter.category !== null) {
                if (filter.category === 0) {
                    return true;
                }
                return product.category_id.id === filter.category;
            }
        })
    }, [products, filter])


    return (
        <ProductContext.Provider
            value={{
                //           ferchs
                products: filteredProducts,
                categories: !categories ? [] : categories,
                restaurant,
                //           states
                productSelected,
                setProductSelected,
                filter,
                setFilter,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
