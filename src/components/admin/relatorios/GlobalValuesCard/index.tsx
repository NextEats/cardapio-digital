import { Card } from "../../Card";

import { format } from "date-fns"
import { iProducts, iProductCategories, iOrders, iOrdersProducts, iProduct, iOrdersStatus, iOrderProduct } from "../../../../types/types";

interface iGlobalValuesCardProps {
    globalValuesData: {
        orders: iOrders["data"],
        products: iProducts["data"],
        productCategories: iProductCategories["data"],
        ordersProducts: iOrdersProducts["data"],
        ordersStatus: iOrdersStatus["data"],
    }
}

export function GlobalValuesCard({ globalValuesData }: iGlobalValuesCardProps) {

    const { orders, products, ordersProducts, ordersStatus } = globalValuesData

    // function billing() {
    //     const ordersProductId = ordersProducts.map(ordersProduct => ordersProduct.product_id)
    //     const selectedProduct = ordersProductId.map(productId => products[products.findIndex(product => productId === product.id)])
    //     return selectedProduct.reduce((acc, product) => acc + product.price, 0)
    // }
    const statusId = ordersStatus.find(s => s.status_name === 'entregue')
    const ordersProductFiltered = ordersProducts.filter(ordersProduct => statusId?.id === ordersProduct.order_status_id)
    function billing() {
        const ordersProductId = ordersProductFiltered.map(ordersProduct => ordersProduct.product_id)
        const selectedProduct = ordersProductId.map(productId => products[products.findIndex(product => productId === product.id)])
        return selectedProduct.reduce((acc, product) => acc + product.price, 0)
    }

    const ordersAmount = Array.from(new Set(ordersProductFiltered.map(order => order.order_id))).length;

    return (
        <>
            <div className="grid 2xs:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
                <Card color="red" name="Faturamento" value={"R$" + billing()} />
                <Card color="green" name="Pedidos" value={`${ordersAmount}`} />
                <Card color="yellow" name="Produtos no Cardápio" value={`${products.length}`} />
                <Card color="blue" name="Ingredientes em Falta" value={"0"} />
            </div>
        </>
    )
}