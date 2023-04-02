import { iOrdersWithFKData } from '@/src/types/types';

export const groupOrdersByStatus = (
    ordersData: iOrdersWithFKData[]
): { [key: string]: iOrdersWithFKData[] } => {
    return ordersData.reduce((acc: any, obj) => {
        const status_name = obj.order_status.status_name;
        if (!acc[status_name]) {
            acc[status_name] = [];
        }
        acc[status_name].push(obj);
        return acc;
    }, {});
};
