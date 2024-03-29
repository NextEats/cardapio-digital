import { iOrdersWithFKData } from '@/src/types/iOrders';
import { statusReducerAction } from './action';

export interface iStatusReducer {
  orders: iOrdersWithFKData[];

  isOpenOrderModal: boolean;
  orderId: number;
}

export function statusReducer(state: iStatusReducer, action: any) {
  switch (action.type) {
    case statusReducerAction.IS_OPEN_ORDER_MODAL:
      console.log('IS_OPEN_ORDER_MODAL', state.isOpenOrderModal);
      if (state.isOpenOrderModal === true) state.isOpenOrderModal = false;
      else state.isOpenOrderModal = true;
      return { ...state };

    case statusReducerAction.GET_MODAL_DATA:
      return { ...state, orderId: action.payload.orderId };
    case statusReducerAction.ADD_NEW_UNDER_REVIEW:
      return {
        ...state,
        orders: [...state.orders, action.payload.order],
      };

    default:
      return state;
  }
}
