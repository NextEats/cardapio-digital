import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext } from "react"
import { ProductsAction } from "./ProductsAction"
import { ProductTable } from "./ProductTable"
import { CreateProduct } from "./CreateProduct"

interface iProductsDataProps {
}

export function ProductsData({ }: iProductsDataProps) {
    const { products, productScreenState } = useContext(ProductContext)
    const [productScreen, setProductScreen] = productScreenState


    return (
        <div>
            {!productScreen ?
                <div className={`min-h-[400px] h-full bg-white shadow-md rounded-md p-4`}>
                    <ProductsAction />
                    <ProductTable />
                </div>
                : null}
            {productScreen !== null ?
                // <div className="">
                <CreateProduct />
                // </div>
                : null}
        </div>
    )
}