import { iAdditional, iAdditionals, IAdditionalsData, iOrdersProducts, iProduct, iProductOptions, iProducts, iSelect, iSelects } from "../types/types"

interface iGetOrdersProductsDataProps {
    ordersProducts: iOrdersProducts["data"];
    additionals: iAdditionals['data'];
    products: iProducts["data"];
    selects: iSelects["data"];
}

type ss = Array<iSelect["data"] & {
    options: iProductOptions["data"]
}>
export interface iOrdersProductsData {
    product: iProduct["data"]
    additionalsData: {
        additional: iAdditional["data"],
        totalPriceOfAdditionals: number;
        quantityOfAdditionals: number,
    }[]
    totalPrice: number;
    totalAdditionalsPriceByProduct: number
    selects: ss;
    observation: string | null;
    id: number;
    orderId: number;
}


export function getOrdersProductsData({ ordersProducts, additionals, products, selects }: iGetOrdersProductsDataProps) {

    const orderProductData = ordersProducts.reduce((acc: iOrdersProductsData[], item) => {

        const additionalsData = item.additionals_data as { quantity: number, additional_id: number }[]
        const selectsData = item.selects_data as {
            id: number
            options: {
                id: number
                is_default_value: boolean
                name: string
                picture_url: string
                select_id: number
                selected: boolean
            }[]
        }[] | undefined | null

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

        const selectsDataFiltered: ss = selectsData?.reduce((sAcc: any, sItem) => {
            const findSelectById = selects.find((s) => s.id == sItem.options[0].select_id);
            if (!findSelectById) return sAcc;
            return [...sAcc, { ...findSelectById, options: sItem.options }];
        }, []);

        const productFound = products.find(p => p.id === item.product_id)

        if (productFound) {
            return acc = [...acc, {
                product: productFound,
                additionalsData: additionalsDataFiltered,
                totalPrice: productFound.price + totalAdditionalsPriceByProduct,
                totalAdditionalsPriceByProduct,
                selects: selectsDataFiltered,
                observation: item.observation,
                id: item.id,
                orderId: item.order_id
            }]
        }
        return acc
    }, [])

    return orderProductData
}
