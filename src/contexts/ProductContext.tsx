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
import { getProductAdditionalsFetch } from '../fetch/productAdditionals/getProductAdditionals';
import { getProductSelectsFetch } from '../fetch/productSelects/getProductSelects';
import { supabase } from '../server/api';

interface iProductContextProps {
    products: iProductsWithFKData[];
    setProducts: Dispatch<SetStateAction<iProductsWithFKData[]>>
    restaurant: iRestaurant['data'];
    categories: iProductCategories["data"]
    additionals: iAdditionals["data"]
    setAdditionals: Dispatch<SetStateAction<iAdditionals["data"]>>
    selectsState: [iSelects["data"] | null, Dispatch<SetStateAction<iSelects["data"] | null>>]
    additional_categories: iAdditionalCategories["data"]
    product_options_state: [iProductOptions["data"] | null, Dispatch<SetStateAction<iProductOptions["data"] | null>>]
    //

    selectSelectState: [iSelects["data"], Dispatch<SetStateAction<iSelects["data"]>>]
    selectAdditionalState: [iAdditionals["data"], Dispatch<SetStateAction<iAdditionals["data"]>>]
    updateProductState: [iProduct["data"] | null, Dispatch<SetStateAction<iProduct["data"] | null>>]
    isCreatingProductState: [boolean, Dispatch<SetStateAction<boolean>>]
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
    hanleViewProduct: (product: iProduct["data"]) => void
}
interface iProductContextProviderProps {
    children: ReactNode;
    restaurant: iRestaurant['data'];
    productsData: iProductsWithFKData[];
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
    productsData,
    categories,
    additionalsData,
    selectsData,
    additional_categories,
    product_optionsData,
}: iProductContextProviderProps) {
    const [products, setProducts] = useState<iProductsWithFKData[]>([])
    const [productSelected, setProductSelected] = useState<iProductsWithFKData[]>([])
    const [updateCategoryState, setUpdateCategoryState] = useState<iProductCategory["data"] | iAdditionalCategory["data"] | null>(null)
    const [additionals, setAdditionals] = useState<iAdditionals["data"]>([])
    const updateAdditionalState = useState<iAdditional["data"] | null>(null)
    const product_options_state = useState<iProductOptions["data"] | null>(null)
    const selectsState = useState<iSelects["data"] | null>(null)
    const isCreatingProductState = useState(false)
    const updateProductState = useState<iProduct["data"] | null>(null)

    const selectAdditionalState = useState<iAdditionals["data"]>([])
    const [selectAdditional, setSelectAdditional] = selectAdditionalState

    const selectSelectState = useState<iSelects["data"]>([])
    const [setectSelect, setSelectSelect] = selectSelectState

    const [selects, setSelects] = selectsState
    const [product_options, setProduct_options] = product_options_state
    const [isCreatingProduct, setIsCreatingProduct] = isCreatingProductState
    const [updateProduct, setUpdateProduct] = updateProductState

    useEffect(() => {
        setProducts(productsData)
        setAdditionals(additionalsData)
        setProduct_options(product_optionsData)
        setSelects(selectsData)
    }, [additionalsData, setProduct_options, productsData, product_optionsData, setSelects, selectsData])

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
    console.log(products, filteredProducts)
    // useEffect(() =>     setProducts(filteredProducts), [filteredProducts])


    const hanleViewProduct = async (product: iProduct["data"]) => {

        const [product_additionals, product_selects] = await Promise.all([
            supabase.from("product_additionals").select("*, additionals (*)").eq("product_id", product.id),
            supabase.from("product_selects").select("*, selects (*)").eq("product_id", product.id),
        ])
        setUpdateProduct(product)
        const selectsData = product_selects.data?.map(ps => ps.selects)
        if (selectsData)
            setSelectSelect([...selectsData as iSelects["data"]])
        const additinalsData = product_additionals.data?.map(ad => ad.additionals)
        if (additinalsData)
            setSelectAdditional([...additinalsData as iAdditionals["data"]])

    }


    return (
        <ProductContext.Provider
            value={{
                //           ferchs
                products: filteredProducts,
                setProducts,
                categories: !categories ? [] : categories,
                restaurant,
                additionals,
                setAdditionals,
                selectsState,
                additional_categories,
                product_options_state,
                //           states
                selectSelectState,
                selectAdditionalState,
                isCreatingProductState,
                updateProductState,
                updateAdditionalState,
                updateCategoryState,
                setUpdateCategoryState,
                productSelected,
                setProductSelected,
                filter,
                setFilter,
                hanleViewProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}
