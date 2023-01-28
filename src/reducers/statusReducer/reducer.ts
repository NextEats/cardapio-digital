import { iInsertOrders, iInsertOrdersProducts, iInsertOrderStatuss } from "../../types/types"
import { statusReducerAction } from "./action"

export interface iStatusReducer {
    orders: iInsertOrders["data"],
    orderStatuss: iInsertOrderStatuss["data"],
    ordersProducts: iInsertOrdersProducts["data"],

    emAnaliseOrders: iInsertOrders["data"],
    emProduçãoOrders: iInsertOrders["data"],
    aCaminhoOrders: iInsertOrders["data"],
    entregueOrders: iInsertOrders["data"],

    isOpenOrderModal: boolean,
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
            // const newEmAnaliseState = state.emProduçãoOrders = state.emAnaliseOrders.filter(order => order.id !== action.payload.orderId)
            return { ...state, acaminhoOrders: [...state.aCaminhoOrders, orderFoundW!] }
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

        default:
            return state
    }
}
