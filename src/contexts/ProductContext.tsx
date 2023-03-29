import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useMemo,
    useState,
} from 'react';
import {
    iAdditionalCategories,
    iAdditionalCategory,
    iAdditionals,
    iProductCategories,
    iProductCategory,
    iProductOptions,
    iProductsWithFKData,
    iRestaurant,
    iSelects,
} from '../types/types';

interface iProductContextProps {
    products: iProductsWithFKData[];
    restaurant: iRestaurant['data'];
    categories: iProductCategories["data"]
    additionals: iAdditionals["data"]
    selects: iSelects["data"]
    additional_categories: iAdditionalCategories["data"]
    product_options: iProductOptions["data"]
    //
    productSelected: iProductsWithFKData[]
    setUpdateCategoryState: Dispatch<SetStateAction<iProductCategory["data"] | iAdditionalCategory["data"] | null>>
    updateCategoryState: iProductCategory["data"] | iAdditionalCategory["data"] | null
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
    additionals: iAdditionals["data"]
    selects: iSelects["data"]
    additional_categories: iAdditionalCategories["data"]
    product_options: iProductOptions["data"]
}

export const ProductContext = createContext({} as iProductContextProps);

export default function ProductContextProvider({
    children,
    restaurant,
    products,
    categories,
    additionals,
    selects,
    additional_categories,
    product_options,
}: iProductContextProviderProps) {
    const [productSelected, setProductSelected] = useState<iProductsWithFKData[]>([])
    const [updateCategoryState, setUpdateCategoryState] = useState<iProductCategory["data"] | iAdditionalCategory["data"] | null>(null)

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
                additionals,
                selects,
                additional_categories,
                product_options,
                //           states
                updateCategoryState,
                setUpdateCategoryState,
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
