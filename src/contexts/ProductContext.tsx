import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    iAdditional,
    iAdditionalCategories,
    iAdditionalCategory,
    iAdditionals,
    iProduct,
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
    selectsState: [iSelects["data"] | null, Dispatch<SetStateAction<iSelects["data"] | null>>]
    additional_categories: iAdditionalCategories["data"]
    product_options_state: [iProductOptions["data"] | null, Dispatch<SetStateAction<iProductOptions["data"] | null>>]
    //

    selectAdditionalState: [iAdditionals["data"], Dispatch<SetStateAction<iAdditionals["data"]>>]
    productScreenState: [iProduct["data"] | "create_product" | null, Dispatch<SetStateAction<iProduct["data"] | "create_product" | null>>]
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
    selectsData: iSelects["data"]
    additional_categories: iAdditionalCategories["data"]
    product_optionsData: iProductOptions["data"]
}

export const ProductContext = createContext({} as iProductContextProps);

export default function ProductContextProvider({
    children,
    restaurant,
    products,
    categories,
    additionalsData,
    selectsData,
    additional_categories,
    product_optionsData,
}: iProductContextProviderProps) {
    const [productSelected, setProductSelected] = useState<iProductsWithFKData[]>([])
    const [updateCategoryState, setUpdateCategoryState] = useState<iProductCategory["data"] | iAdditionalCategory["data"] | null>(null)
    const [additionals, setAdditionals] = useState<iAdditionals["data"]>([])
    const updateAdditionalState = useState<iAdditional["data"] | null>(null)
    const product_options_state = useState<iProductOptions["data"] | null>(null)
    const selectsState = useState<iSelects["data"] | null>(null)
    const productScreenState = useState<iProduct["data"] | "create_product" | null>(null)

    const selectAdditionalState = useState<iAdditionals["data"]>([])

    const [selects, setSelects] = selectsState
    const [product_options, setProduct_options] = product_options_state

    useEffect(() => {
        setAdditionals(additionalsData)
        setProduct_options(product_optionsData)
        setSelects(selectsData)
    }, [additionalsData, setProduct_options, product_optionsData, setSelects, selectsData])

    const [filter, setFilter] = useState<{ name: string | null, category: number | null }>({
        name: null,
        category: 0,
    });


    const filteredProducts = useMemo(() => {
        if (!products) return [];

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
                selectsState,
                additional_categories,
                product_options_state,
                //           states
                selectAdditionalState,
                productScreenState,
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
