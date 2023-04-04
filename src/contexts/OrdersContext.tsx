import {
    iStatusReducer,
    statusReducer,
} from '@/src/reducers/statusReducer/reducer';
import { createContext, ReactNode, useReducer } from 'react';

interface iOrdersContext {
    ordersState: iStatusReducer;
    ordersDispatch: React.Dispatch<any>;
}

const initialState: iStatusReducer = {
    orders: [],
    isOpenOrderModal: false,
    orderId: 0,
};

export const OrdersContext = createContext<iOrdersContext>({
    ordersState: initialState,
    ordersDispatch: () => null,
});

interface iOrdersProviderProps {
    children: ReactNode;
}

export const OrdersProvider = ({ children }: iOrdersProviderProps) => {
    const [ordersState, ordersDispatch] = useReducer(
        statusReducer,
        initialState
    );

    return (
        <OrdersContext.Provider value={{ ordersState, ordersDispatch }}>
            {children}
        </OrdersContext.Provider>
    );
};
