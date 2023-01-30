import { iInsertAddress, iInsertAddresses, iInsertClients, iInsertContact, iInsertContacts, iInsertOrders, iInsertOrdersProducts, iInsertOrderStatuss, iInsertProduct, iInsertProducts, iInsertRestaurant } from "../../types/types"
import { statusReducerAction } from "./action"

export interface iStatusReducer {
    orders: iInsertOrders["data"],
    orderStatuss: iInsertOrderStatuss["data"],
    ordersProducts: iInsertOrdersProducts["data"],
    addresses: iInsertAddresses["data"],
    products: iInsertProducts["data"],
    contacts: iInsertContacts["data"],
    clients: iInsertClients["data"],

    emAnaliseOrders: iInsertOrders["data"],
    emProduçãoOrders: iInsertOrders["data"],
    aCaminhoOrders: iInsertOrders["data"],
    entregueOrders: iInsertOrders["data"],

    isOpenOrderModal: boolean,
    orderId: number,
    // modalData: {
    //     restaurant: iInsertRestaurant["data"]
    //     address: iInsertAddress["data"],
    //     products: iInsertProducts["data"],
    //     contact: iInsertContact["data"],
    // },
    // orderStatuss: iInsertOrderStatuss["data"],
    // ordersProducts: iInsertOrdersProducts["data"]
}

export function statusReducer(state: iStatusReducer, action: any) {
    switch (action.type) {
        case statusReducerAction.SWITCH_TO_PRODUCTION:
            const orderFoundP = state.emAnaliseOrders.find(order => order.id === action.payload.orderId)
            const orderiIndexP = state.emAnaliseOrders.findIndex(order => order.id == action.payload.orderId)
            state.emAnaliseOrders.splice(orderiIndexP, 1)
            // const newEmAnaliseState = state.emProduçãoOrders = state.emAnaliseOrders.filter(order => order.id !== action.payload.orderId)
            return { ...state, emProduçãoOrders: [...state.emProduçãoOrders, orderFoundP!] }
            break
        case statusReducerAction.SWITCH_TO_THE_WAY:
            const orderFoundW = state.emProduçãoOrders.find(order => order.id === action.payload.orderId)
            const orderiIndexW = state.emProduçãoOrders.findIndex(order => order.id == action.payload.orderId)
            state.emProduçãoOrders.splice(orderiIndexW, 1)
            console.log(action.payload.orderId)
            console.log(orderFoundW)
            // const newEmAnaliseState = state.emProduçãoOrders = state.emAnaliseOrders.filter(order => order.id !== action.payload.orderId)
            return { ...state, aCaminhoOrders: [...state.aCaminhoOrders, orderFoundW!] }
            break
        case statusReducerAction.SWITCH_TO_DELIVERED:
            const orderFoundD = state.aCaminhoOrders.find(order => order.id === action.payload.orderId)
            const orderiIndexD = state.aCaminhoOrders.findIndex(order => order.id == action.payload.orderId)
            state.aCaminhoOrders.splice(orderiIndexD, 1)
            // const newEmAnaliseState = state.emProduçãoOrders = state.emAnaliseOrders.filter(order => order.id !== action.payload.orderId)
            return { ...state, entregueOrders: [...state.entregueOrders, orderFoundD!] }
            break
        case statusReducerAction.IS_OPEN_ORDER_MODAL:
            if (state.isOpenOrderModal === true) state.isOpenOrderModal = false
            else state.isOpenOrderModal = true
            return { ...state }
            break
        case statusReducerAction.GET_MODAL_DATA:
            // const newSatateModalData = { ...state }
            // // get products
            // const orderProductFiltered = state.ordersProducts.filter(op => op.order_id === action.payload.orderId)
            // const productsFiltered = orderProductFiltered.map(op => {
            //     return state.products.find(p => {

            //         return p.id === op?.product_id
            //     })
            // })            // console.log(productsFiltered)
            // // newSatateModalData.modalData.products.splice(0, newSatateModalData.modalData.products.length)
            // // newSatateModalData.modalData.products =  [ ...productsFiltered ]

            // // get client data
            // const orderFound = state.orders.find(order => order.id === action.payload.orderId);
            // const clientFuound = state.clients.find(client => client.id === orderFound?.client_id)
            // console.log(clientFuound)
            return { ...state, orderId: action.payload.orderId }
            break

        default:
            return state
    }
}
