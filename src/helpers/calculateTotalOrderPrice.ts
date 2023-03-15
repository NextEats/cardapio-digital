import { api } from "../server/api"
import { iAdditionals, iProducts } from "../types/types"

// export async function calculateTotalOrderPrice({ products, restaurantId }: { products: any, restaurantId: number | undefined, }) {
//     if (!restaurantId) return
//     const { data: additionalData } = await api.get(`api/additionals/${restaurantId}`)
//     const { data: productsData } = await api.get(`api/products/${restaurantId}`)

//     const additionals = additionalData as iAdditionals["data"]
//     const orderPice: number = products.state.reduce((acc: number, item: any) => {

//         const productFound = (productsData as iProducts["data"]).find(p => p.id === item.id)
//         if (!productFound) return

//         const totalAddicionalPrice: number = item.additionals.reduce((accAdd: number, itemAdd: any) => {
//             const additionalFoundById = additionals.find((a) => a.id === itemAdd.additional_id)
//             if (!additionalFoundById) return

//             return acc + (additionalFoundById.price * itemAdd.quantity)
//         }, 0);

//         console.log(item.additionals)

//         const totalOrderProductPrice = productFound?.price * item.quantity
//         console.log(totalOrderProductPrice)
//         console.log(totalAddicionalPrice)
//         const totalOrderProductPriceWithAdditionals = totalOrderProductPrice + totalAddicionalPrice // adicionar o preço total dos adicionais ao preço total do produto

//         return acc + totalOrderProductPriceWithAdditionals
//     }, 0)

//     return orderPice
// }

export async function calculateTotalOrderPrice({ products, restaurantId }: { products: any, restaurantId: number | undefined, }) {
    if (!restaurantId) return 0;
    const { data: additionalData } = await api.get(`api/additionals/${restaurantId}`)
    const { data: productsData } = await api.get(`api/products/${restaurantId}`)

    const additionals = additionalData as iAdditionals["data"]
    const orderPrice: number = await products.state.reduce(async (acc: Promise<number>, item: any) => {
        const productFound = (productsData as iProducts["data"]).find(p => p.id === item.id)
        if (!productFound) return await acc

        const totalAdditionalPrice = await item.additionals.reduce(async (accAdd: Promise<number>, itemAdd: any) => {
            const additionalFoundById = additionals.find((a) => a.id === itemAdd.additional_id)
            if (!additionalFoundById) return await accAdd

            const accAddValue = await accAdd
            return accAddValue + (additionalFoundById.price * itemAdd.quantity)
        }, Promise.resolve(0))

        const totalOrderProductPrice = productFound?.price * item.quantity
        const totalOrderProductPriceWithAdditionals = totalOrderProductPrice + (await totalAdditionalPrice)

        const accValue = await acc
        return accValue + totalOrderProductPriceWithAdditionals
    }, Promise.resolve(0))

    return orderPrice
}
