import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { iProductsPageAction, iProductsPageReducder, productsPageReducder, productsPageReducderDefaultValues } from '../reducers/productsPageReducer/reducer';
import {
    iAdditional,
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
    setAdditionals: Dispatch<SetStateAction<iAdditionals["data"]>>
    selects: iSelects["data"]
    additional_categories: iAdditionalCategories["data"]
    product_options: iProductOptions["data"]
    //
    updateAdditionalState: [iAdditional["data"] | null, Dispatch<SetStateAction<iAdditional["data"] | null>>]
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
    additionalsData: iAdditionals["data"]
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
    additionalsData,
    selects,
    additional_categories,
    product_options,
}: iProductContextProviderProps) {
    const [productSelected, setProductSelected] = useState<iProductsWithFKData[]>([])
    const [updateCategoryState, setUpdateCategoryState] = useState<iProductCategory["data"] | iAdditionalCategory["data"] | null>(null)
    const [additionals, setAdditionals] = useState<iAdditionals["data"]>([])
    const updateAdditionalState = useState<iAdditional["data"] | null>(null)

    useEffect(() => {
        setAdditionals(additionalsData)
    }, [additionalsData])

    const [filter, setFilter] = useState<{ name: string | null, category: number | null }>({
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
                setAdditionals,
                selects,
                additional_categories,
                product_options,
                //           states
                updateAdditionalState,
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
