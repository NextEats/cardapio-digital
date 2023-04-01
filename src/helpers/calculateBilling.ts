import {
    iAdditionals,
    iOrdersProducts,
    iProducts,
    iSelects,
} from '@/src/types/types';
import { getOrdersProductsData } from './getOrdersProductsData';

interface CalculateBillingProps {
    ordersGroupedByOrderStatus: { [key: string]: any[] } | undefined;
    ordersProductsData: iOrdersProducts['data'];
    additionals: iAdditionals['data'];
    products: iProducts['data'];
    selects: iSelects['data'];
}

export const calculateBilling = ({
    ordersGroupedByOrderStatus,
    ordersProductsData,
    additionals,
    products,
    selects,
}: CalculateBillingProps): number => {
    if (
        !ordersGroupedByOrderStatus ||
        !ordersGroupedByOrderStatus['entregue']
    ) {
        return 0;
    }

    const ordersProductFiltered = ordersProductsData.filter((op) =>
        ordersGroupedByOrderStatus['entregue'].some((o) => o.id === op.order_id)
    );

    const productIds = ordersProductFiltered.map(
        (ordersProduct) => ordersProduct.product_id
    );
    const selectedProduct = productIds.map(
        (productId) =>
            products[products.findIndex((product) => productId === product.id)]
    );

    const totalPriceOfDeliveryFee = ordersGroupedByOrderStatus[
        'entregue'
    ].reduce((acc, item) => {
        if (!item.delivery_fees) return acc;
        return acc + item.delivery_fees.fee;
    }, 0);
    const totalAdditionalPrice = getOrdersProductsData({
        ordersProducts: ordersProductFiltered,
        additionals,
        products,
        selects,
    }).reduce((acc, item) => acc + item.totalAdditionalsPriceByProduct, 0);

    return (
        selectedProduct.reduce((acc, product) => acc + product?.price!, 0) +
        totalPriceOfDeliveryFee +
        totalAdditionalPrice
    );
};
