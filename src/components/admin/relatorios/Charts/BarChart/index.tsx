import Image from "next/image";
import * as HoverCard from '@radix-ui/react-hover-card';

import { iOrders, iProducts, iProductCategories, iOrdersProducts, iOrdersStatus, iProduct } from "../../../../../types/types";

interface iBarCgart {
    globalValuesData: {
        orders: iOrders["data"],
        products: iProducts["data"],
        productCategories: iProductCategories["data"],
        ordersProducts: iOrdersProducts["data"],
        ordersStatus: iOrdersStatus["data"],
    }
}

const colors = [
    "bg-red-500",
    "bg-green-300",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-gray-400",

    "bg-red-500",
    "bg-green-300",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-gray-400",
];

export function BarChart({ globalValuesData }: iBarCgart) {

    const { ordersProducts, products, ordersStatus } = globalValuesData

    const statusEnTregue = ordersStatus.find(status => status.status_name === "entregue")
    const ordersProductWithStatusEntrega = ordersProducts.filter(orderProduct => orderProduct.order_status_id === statusEnTregue?.id)

    let productsThatHaveBeenDelivered: { [key: string]: { product: iProduct["data"], numberOfProductsPurchased: number } } = {}
    for (let i = 0; i < ordersProductWithStatusEntrega.length; i++) {
        const product = products.find(p => p.id === ordersProductWithStatusEntrega[i].product_id)
        if (productsThatHaveBeenDelivered[product?.name!] === undefined) {
            productsThatHaveBeenDelivered[product?.name!] = { product: product!, numberOfProductsPurchased: 0 }
        }
        productsThatHaveBeenDelivered[product?.name!].numberOfProductsPurchased++
    }
    const productsThatHaveBeenDeliveredArray = Object.values(productsThatHaveBeenDelivered)

    const top12ProductsThatHaveBeenDelivered = productsThatHaveBeenDeliveredArray.sort((menor, maior) => maior.numberOfProductsPurchased - menor.numberOfProductsPurchased).slice(0, 10)

    return (
        <div className="flex flex-col w-[600px] shadow-sm bg-white rounded-md px-4 pt-3 pb-4">
            <h2 className="text-xl font-bold text-blue-500 mb-3"> Dados dos produtos mais vendidos </h2>
            <div className=" h-[300px] flex items-end gap-3">
                {
                    top12ProductsThatHaveBeenDelivered.map(product => {

                        const percentageOfProducts = product.numberOfProductsPurchased * 100 / ordersProductWithStatusEntrega.length
                        const maxHeightOfbar = 224
                        const barHeight = maxHeightOfbar * percentageOfProducts / 100
                        const barColor = colors[Math.floor(Math.random() * colors.length) + 0]
                        return (
                            <div key={product.product.id} className="flex flex-col items-center gap-3 ">
                                <div style={{ height: `${barHeight}px` }} className={`w-6 transition-all ease-out duration-500 ${barColor}`}>
                                </div>
                                <div className="h-16 flex flex-col items-center justify-between">
                                    <span className="font-medium text-gray-500"> {Math.round(percentageOfProducts)}% </span>
                                    <HoverCard.Root openDelay={200} closeDelay={0}>
                                        <HoverCard.Trigger asChild>
                                            <Image
                                                className="rounded-md cursor-pointer"
                                                src={`${product.product.picture_url}`}
                                                alt=""
                                                width={40}
                                                height={40}
                                            />
                                        </HoverCard.Trigger>
                                        <HoverCard.Portal>
                                            <HoverCard.Content className="will-change-transform rounded-md bg-white p-5 shadow-md mx-6 ">
                                                <div className="flex flex-col gap-1">
                                                    <Image
                                                        className="rounded-full cursor-pointer"
                                                        src={`${product.product.picture_url}`}
                                                        alt=""
                                                        width={60}
                                                        height={60}
                                                    />
                                                    <div className="flex flex-col gap-4">
                                                        <span className="text-lg font-bold">  {product.product.name} </span>

                                                        <p className="text-base font-normal text-gray-600 truncate"> {product.product.description} </p>
                                                        <div style={{ display: 'flex', gap: 15 }}>
                                                            <div style={{ display: 'flex', gap: 5 }}>
                                                                <span className="text-lg font-bold text-gray-700"> {product.numberOfProductsPurchased} de {ordersProductWithStatusEntrega.length} </span> <span className="text-lg font-medium text-gray-500">Produtos vendidos </span>
                                                            </div>
                                                            <div style={{ display: 'flex', gap: 5 }}>
                                                                <span className="text-lg font-bold text-gray-700"> {percentageOfProducts.toFixed(2)}% </span> <span className="text-lg font-medium text-gray-500">Percentual de Produtos vendidos</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <HoverCard.Arrow className="fill-white" />
                                            </HoverCard.Content>
                                        </HoverCard.Portal>
                                    </HoverCard.Root>

                                </div>
                            </div>
                        )
                    })
                }

                <div></div>
            </div>
        </div>
    )
}