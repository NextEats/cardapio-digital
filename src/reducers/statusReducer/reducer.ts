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
  // orders: iInsertOrders["data"];
  // ordersProducts: iInsertOrdersProducts["data"];
  // addresses: iInsertAddresses["data"];
  // products: iInsertProducts["data"];
  // contacts: iInsertContacts["data"];
  // clients: iInsertClients["data"];

  // emAnaliseOrders: iInsertOrders["data"];
  // emProduçãoOrders: iInsertOrders["data"];
  // aCaminhoOrders: iInsertOrders["data"];
  // entregueOrders: iInsertOrders["data"];
  orders: iOrdersWithFKData[];

  isOpenOrderModal: boolean;
  orderId: number;
}

export function statusReducer(state: iStatusReducer, action: any) {
  switch (action.type) {
    // case statusReducerAction.SWITCH_TO_PRODUCTION:
    //   const orderFoundP = state.emAnaliseOrders.find(
    //     (order) => order.id === action.payload.orderId
    //   );
    //   const orderiIndexP = state.emAnaliseOrders.findIndex(
    //     (order) => order.id == action.payload.orderId
    //   );
    //   state.emAnaliseOrders.splice(orderiIndexP, 1);
    //   return {
    //     ...state,
    //     emProduçãoOrders: [...state.emProduçãoOrders, orderFoundP!],
    //   };

    // case statusReducerAction.SWITCH_TO_THE_WAY:
    //   const orderFoundW = state.emProduçãoOrders.find(
    //     (order) => order.id === action.payload.orderId
    //   );
    //   const orderiIndexW = state.emProduçãoOrders.findIndex(
    //     (order) => order.id == action.payload.orderId
    //   );
    //   state.emProduçãoOrders.splice(orderiIndexW, 1);

    //   return {
    //     ...state,
    //     aCaminhoOrders: [...state.aCaminhoOrders, orderFoundW!],
    //   };

    // case statusReducerAction.SWITCH_TO_DELIVERED:
    //   const orderFoundD = state.aCaminhoOrders.find(
    //     (order) => order.id === action.payload.orderId
    //   );
    //   const orderiIndexD = state.aCaminhoOrders.findIndex(
    //     (order) => order.id == action.payload.orderId
    //   );
    //   state.aCaminhoOrders.splice(orderiIndexD, 1);
    //   return {
    //     ...state,
    //     entregueOrders: [...state.entregueOrders, orderFoundD!],
    //   };

    case statusReducerAction.IS_OPEN_ORDER_MODAL:
      if (state.isOpenOrderModal === true) state.isOpenOrderModal = false;
      else state.isOpenOrderModal = true;
      return { ...state };

    case statusReducerAction.GET_MODAL_DATA:
      return { ...state, orderId: action.payload.orderId };

    // case statusReducerAction.ADD_NEW_UNDER_REVIEW:
    //   console.log(action.payload.order);
    //   return {
    //     ...state,
    //     emAnaliseOrders: [...state.emAnaliseOrders, action.payload.order],
    //   };

    default:
      return state;
  }
}
