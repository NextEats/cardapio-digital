

export enum statusReducerAction {
    SWITCH_TO_PRODUCTION = "SWITCH_TO_PRODUCTION",
    SWITCH_TO_THE_WAY = "SWITCH_TO_THE_WAY",
    SWITCH_TO_DELIVERED = "SWITCH_TO_DELIVERED",
    IS_OPEN_ORDER_MODAL = "IS_OPEN_ORDER_MODAL",
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