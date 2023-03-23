import { TableContext } from '@/src/contexts/TableControlContext';
import { iOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import ordersStatus from '@/src/pages/api/order_status';
import { removeProductAction } from '@/src/reducers/tableReducer/action';
import { iTableSelectingProductData } from '@/src/reducers/tableReducer/reducer';
import { supabase } from '@/src/server/api';
import { useContext } from 'react';
import { FiTrash2 } from 'react-icons/fi';

interface iCustomerAtTheTableProps {
    orderProductData: iOrdersProductsData | iTableSelectingProductData;
    orderStatus: 'em análise' | 'em produção' | 'entregue';
}

export default function CustomerAtTheTable({
    orderProductData,
    orderStatus,
}: iCustomerAtTheTableProps) {
    const { tableDispatch, openedTableModal } = useContext(TableContext);

    async function handleDeleteProduct() {
        const ordersProductsId = (orderProductData as iOrdersProductsData).id
        const ordersProductsOrderId = (orderProductData as iOrdersProductsData).orderId
        switch (orderStatus) {
            case "em análise":
                tableDispatch(removeProductAction(
                    orderProductData.product ? orderProductData.product.id : 0))
                break
            case "em produção":
                const getOrdersProduct = await supabase.from("orders_products").select().eq("order_id", ordersProductsOrderId);
                if (getOrdersProduct.data && getOrdersProduct.data.length <= 1) {
                    console.log("ordersProductsId", ordersProductsId)
                    console.log("getOrdersProduct.data", getOrdersProduct.data)
                    console.log("ordersProductsOrderId", ordersProductsOrderId)
                    await supabase.from("orders_products").delete().eq("id", ordersProductsId);
                    await supabase.from("orders_tables").delete().match({ table_id: openedTableModal?.id, order_id: getOrdersProduct.data[0].order_id });
                    await supabase.from("orders").delete().eq("id", getOrdersProduct.data[0].order_id);
                } else {
                    await supabase.from("orders_products").delete().eq("id", ordersProductsId);
                }
                window.location.reload()
                break
            default:
                break
        }
    }

    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 ">

                <span
                    className={`text-base font-semibold w-28 sm:w-60 truncate ${orderStatus === 'em produção' ? 'text-blue-500' : orderStatus === 'em análise' ? 'text-red-500' : 'text-green-500'
                        }`}
                >
                    {orderProductData.product ? orderProductData.product.name : null}
                </span>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-base font-medium text-green-300 w-24">
                    R$
                    {orderProductData.totalPrice.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </span>
                {orderStatus !== "entregue" ?
                    <FiTrash2
                        size={24}
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleDeleteProduct()}
                    />
                    : null}
            </div>
        </div>
    );
}
