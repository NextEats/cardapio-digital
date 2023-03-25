import { supabase } from "../server/api";
import { iProducts, iProductsWithFKData } from "../types/types";

export const updateProductPriceByChangeType = ({ changeType, products, changeAmount }: { changeAmount: number, products: iProducts["data"] | iProductsWithFKData[], changeType: "" | "increaseByAmount" | "reduceByAmount" | "setANewPrice" | "increaseByPercentage" | "reduceByPercentage"; }) => {
    switch (changeType) {
        case 'increaseByAmount':
            products.forEach(async (product) => {
                await supabase.from("products").update({
                    price: Number(product.price) + Number(changeAmount),
                }).eq('id', product.id)
            })
            break
        case 'reduceByAmount':
            products.forEach(async (product) => {
                await supabase.from("products").update({
                    price: Number(product.price) - Number(changeAmount),
                }).eq('id', product.id)
            })
            break
        case 'setANewPrice':
            products.forEach(async (product) => {
                await supabase.from("products").update({
                    price: Number(changeAmount),
                }).eq('id', product.id)
            })
            break
        case 'increaseByPercentage':
            products.forEach(async (product) => {
                await supabase.from("products").update({
                    price: Number(product.price) * Number('1.' + changeAmount),
                }).eq('id', product.id)
            })
            break
        case 'reduceByPercentage':
            products.forEach(async (product) => {
                await supabase.from("products").update({
                    price: Number(product.price) - (Number(product.price) * (Number(changeAmount) / 100)),
                }).eq('id', product.id)
            })
            break
        default:
            break
    }
}