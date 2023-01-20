import { Card } from "../../Card";

import { format } from "date-fns"
import { iProducts, iProductCategories, iOrders, iOrdersProducts } from "../../../../types/types";
import { Console } from "console";

interface iGlobalValuesCardProps {
    globalValuesData: {
        orders: iOrders["data"],
        products: iProducts["data"],
        productCategories: iProductCategories["data"],
        ordersProducts: iOrdersProducts["data"],
    }
}


export function GlobalValuesCard({ globalValuesData }: iGlobalValuesCardProps) {

    const moment = new Date();
    const { orders, products, ordersProducts } = globalValuesData
    console.log(ordersProducts)
    // let filterProductsByOrderProduct: iProducts["data"] = []
    // ordersProducts.map(orderProduct => {
    //     filterProductsByOrderProduct.push(products.filter(product => product.id ===  orderProduct.product_id))
    // })
    // console.log(filterProductsByOrderProduct)   

    return (
        <>
            <p className="text-base font-medium mb-4"> {format(moment, 'HH')} {':'} {format(moment, 'mm')} {'-'} {format(moment, 'P')} </p>

            <div className="grid 2xs:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
                <Card color="red" name="Faturamento" value={"R$ 115,00"} />
                <Card color="green" name="Pedidos" value={`${orders.length}`}  />
                <Card color="yellow" name="Produtos no Cardápio" value={`${products.length}`} />
                <Card color="blue" name="Ingredientes em Falta" value={"0"} />
            </div>
        </>
    )
}