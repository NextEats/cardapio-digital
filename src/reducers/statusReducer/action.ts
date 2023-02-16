import { iInsertOrder } from "src/types/types"


export enum statusReducerAction {
    ADD_NEW_UNDER_REVIEW = "ADD_NEW_UNDER_REVIEW",
    SWITCH_TO_PRODUCTION = "SWITCH_TO_PRODUCTION",
    SWITCH_TO_THE_WAY = "SWITCH_TO_THE_WAY",
    SWITCH_TO_DELIVERED = "SWITCH_TO_DELIVERED",
    IS_OPEN_ORDER_MODAL = "IS_OPEN_ORDER_MODAL",
    GET_MODAL_DATA = "GET_MODAL_DATA",
    ORDER = "ORDER",

    REALTIME_ORDER = "REALTIME_ORDER"
}

export function switchToProductioAction(orderId: number) {
    return {
        type: statusReducerAction.SWITCH_TO_PRODUCTION,
        payload: { orderId }
    }
}
export function switchToTheWayAction(orderId: number) {
    return {
        type: statusReducerAction.SWITCH_TO_THE_WAY,
        payload: { orderId }
    }
}
export function switchToDeliveredAction(orderId: number) {
    return {
        type: statusReducerAction.SWITCH_TO_DELIVERED,
        payload: { orderId }
    }
}
export function showModalAction() {
    return {
        type: statusReducerAction.IS_OPEN_ORDER_MODAL,
    }
}
export function getModalDataAction(orderId: number) {
    return {
        type: statusReducerAction.GET_MODAL_DATA,
        payload: { orderId },
    }
}
export function addNewUnderReviewAtion(order: iInsertOrder["data"]) {
    return {
        type: statusReducerAction.ADD_NEW_UNDER_REVIEW,
        payload: { order },
    }
}