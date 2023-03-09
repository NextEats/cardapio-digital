import { Card } from "../../Card";

import { format } from "date-fns"
import { iProducts, iProductCategories, iOrders, iOrdersProducts, iProduct, iOrdersStatus, iOrderProduct, iOrdersWithFKData, iAdditionals } from "../../../../types/types";
import { getOrdersProductsData } from "@/src/helpers/getOrdersProductsData";

interface iGlobalValuesCardProps {
    additionals: iAdditionals['data'];
    globalValuesData: {
        ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
        orders: iOrders["data"],
        products: iProducts["data"],
        productCategories: iProductCategories["data"],
        ordersProducts: iOrdersProducts["data"],
        ordersStatus: iOrdersStatus["data"],
    }
}

export function GlobalValuesCard({ globalValuesData, additionals }: iGlobalValuesCardProps) {

    const { orders, products, ordersProducts, ordersStatus, ordersGroupedByOrderStatus } = globalValuesData

    function billing() {
        let ordersProductFiltered;
        if (ordersGroupedByOrderStatus['entregue']) {
            ordersProductFiltered = ordersProducts.filter((op) =>
                ordersGroupedByOrderStatus['entregue'].some(
                    (o) => o.id === op.order_id
                )
            );

            const productIds = ordersProductFiltered.map(
                (ordersProduct) => ordersProduct.product_id
            );
            const selectedProduct = productIds.map(
                (productId) => products[products.findIndex((product) => productId === product.id)]
            );

            const totalPriceOfDeliveryFee = ordersGroupedByOrderStatus['entregue']
                .reduce((acc, item) => {
                    if (!item.delivery_fees) return acc;
                    return acc + item.delivery_fees.fee;
                }, 0);
            const totalAdditionalPrice = getOrdersProductsData({
                ordersProducts: ordersProductFiltered,
                additionals,
                products,
            }).reduce(
                (acc, item) => acc + item.totalAdditionalsPriceByProduct,
                0
            );
            return (
                selectedProduct.reduce(
                    (acc, product) => acc + product?.price!,
                    0
                ) +
                totalPriceOfDeliveryFee +
                totalAdditionalPrice
            );
        } else {
            return 0;
        }
    }

    return (
        <>
            <div className="grid 2xs:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
                <Card color="red" name="Faturamento" value={`${billing()}`} />
                <Card color="green" name="Pedidos" value={`${ordersGroupedByOrderStatus['entregue'] ? ordersGroupedByOrderStatus['entregue'].length : 0}`} />
                <Card color="yellow" name="Produtos no Cardápio" value={`${products.length}`} />
                <Card color="blue" name="Ingredientes em Falta" value={"0"} />
            </div>
        </>
    )
}