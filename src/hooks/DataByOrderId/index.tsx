import { iStatusReducer } from "../../reducers/statusReducer/reducer";

export function dataByOrderId(state: iStatusReducer, orderId: number) {
    const order = state.orders.find(o => o.id === orderId)

    const ordersProductsFiltered = state.ordersProducts.filter(op => op.order_id === order?.id!)
    const productsFiltered = ordersProductsFiltered.map(op => {
        return state.products[state.products.findIndex(p => op.product_id === p.id)]
    })
    const totalProductsPrice = productsFiltered.reduce((acc, p) => acc + p.price, 0)
    const client = state.clients.find(cl => cl.id === order?.client_id)
    const contact = state.contacts.find(co => co.id === client?.contact_id)
    const phone = contact?.phone?.toString()

    const address = state.addresses.find(ad => ad.id === client?.address_id)

    return { totalProductsPrice, phone, client, address, productsFiltered };
}
