import { TableContext } from '@/src/contexts/TableControlContext';
import { iOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import { removeProductAction } from '@/src/reducers/tableReducer/action';
import { iTableSelectingProductData } from '@/src/reducers/tableReducer/reducer';
import { iProduct } from '@/src/types/types';
import { useContext } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { FiTrash2 } from 'react-icons/fi';

interface iCustomerAtTheTableProps {
    orderProductData: iOrdersProductsData | iTableSelectingProductData;
    isInProduction: boolean;
}

export default function CustomerAtTheTable({
    orderProductData,
    isInProduction,
}: iCustomerAtTheTableProps) {
    const { tableDispatch, tableData } = useContext(TableContext);

    // const totalProductPrice = 

    return (
        <div className="flex items-center justify-between pl-8">
            <div className="flex items-center gap-2 ">
                {/* <Checkbox.Root className="bg-red-400 flex items-center justify-center border-gray-400">
                    <Checkbox.Indicator >
                        <BsCheck />
                    </Checkbox.Indicator>
                </Checkbox.Root> */}
                <span
                    className={`text-base font-semibold w-28 sm:w-60 truncate ${isInProduction ? 'text-blue-500' : 'text-red-500'
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
                {isInProduction ? (
                    <BsCheckCircle
                        size={24}
                        className="text-blue-500 cursor-pointer"
                    // onClick={() =>
                    //     tableDispatch(removeProductAction(product.id))
                    // }
                    />
                ) : (
                    <FiTrash2
                        size={24}
                        className="text-red-400 cursor-pointer"
                        onClick={() =>
                            tableDispatch(removeProductAction(
                                orderProductData.product ? orderProductData.product.id : 0))
                        }
                    />
                )}
            </div>
        </div>
    );
}
