import { iAdditional, iAdditionals, IAdditionalsData, iOrdersProducts, iProduct, iProducts } from "../types/types"

interface iGetOrdersProductsDataProps {
    ordersProducts: iOrdersProducts["data"];
    additionals: iAdditionals['data'];
    products: iProducts["data"];
}

export interface iOrdersProductsData {
    product: iProduct["data"]
    additionalsData: {
        additional: iAdditional["data"],
        totalPriceOfAdditionals: number;
        quantityOfAdditionals: number,
    }[]
    totalPrice: number;
    totalAdditionalsPriceByProduct: number
}

export function getOrdersProductsData({ ordersProducts, additionals, products }: iGetOrdersProductsDataProps) {


    const orderProductData = ordersProducts.reduce((acc: iOrdersProductsData[], item) => {

        const additionalsData = item.additionals_data as { quantity: number, additional_id: number }[]

        const additionalsDataFiltered = additionalsData.reduce((accAdd: iOrdersProductsData["additionalsData"], addData) => {

            const additionalFound = additionals.find(add => addData.additional_id === add.id)

            if (additionalFound) {

                return accAdd = [...accAdd, {
                    additional: additionalFound,
                    quantityOfAdditionals: addData.quantity,
                    totalPriceOfAdditionals: addData.quantity * additionalFound.price
                }]

            }

            return accAdd
        }, [])
        const totalAdditionalsPriceByProduct = additionalsDataFiltered.reduce((addAcc, addItem) => addAcc + addItem.totalPriceOfAdditionals, 0)

        const productFound = products.find(p => p.id === item.product_id)

        if (productFound) {
            return acc = [...acc, {
                product: productFound,
                additionalsData: additionalsDataFiltered,
                totalPrice: productFound.price + totalAdditionalsPriceByProduct,
                totalAdditionalsPriceByProduct,
            }]
        }
        return acc
    }, [])

    return orderProductData
}
