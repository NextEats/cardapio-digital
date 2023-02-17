import {
  iInsertAddresses,
  iInsertClients,
  iInsertContacts,
  iInsertOrders,
  iInsertOrdersProducts,
  iInsertOrderStatuss,
  iInsertProducts,
  iOrdersWithFKData,
} from "../../types/types";
import { statusReducerAction } from "./action";

export interface iStatusReducer {
  orders: iOrdersWithFKData[];

  isOpenOrderModal: boolean;
  orderId: number;
}

export function statusReducer(state: iStatusReducer, action: any) {
  switch (action.type) {
    case statusReducerAction.IS_OPEN_ORDER_MODAL:
      if (state.isOpenOrderModal === true) state.isOpenOrderModal = false;
      else state.isOpenOrderModal = true;
      return { ...state };

    case statusReducerAction.GET_MODAL_DATA:
      return { ...state, orderId: action.payload.orderId };

    default:
      return state;
  }
}
