import { ProductContext } from "@/src/contexts/ProductContext"
import { useContext } from "react"
import { ProductTable } from "./ProductTable"

interface iProductsDataProps {
    styles?: string
}

export function ProductsData({ styles }: iProductsDataProps) {
    const { products } = useContext(ProductContext)

    return (
        <div className={`min-h-[400px] h-full bg-white shadow-md rounded ${styles}`}>
            <ProductTable />
            {products ? products.map(product => {
                return <p key={product.id}>{product.name}</p>
            }) : null}
        </div>
    )
}