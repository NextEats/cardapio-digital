import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext } from "react"
import { ProductsAction } from "./ProductsAction"
import { ProductTable } from "./ProductTable"

interface iProductsDataProps {
    styles?: string
}

export function ProductsData({ styles }: iProductsDataProps) {
    const { products } = useContext(ProductContext)

    return (
        <div className={`min-h-[400px] h-full bg-white shadow-md rounded-md ${styles} p-4`}>
            <ProductsAction />

            <ProductTable />
        </div>
    )
}