/* eslint-disable react-hooks/rules-of-hooks */
import { iOrdersProductsWithFKData } from '@/src/types/types';
import FormOfPayment from './FormOfPayment';
import OrderStatusRevenue from './OrderStatusRevenue';

interface iCashBoxProps {
  ordersProducts: iOrdersProductsWithFKData[];
}

export function CashBox({ ordersProducts }: iCashBoxProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-black w-full">
        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <FormOfPayment ordersProducts={ordersProducts} />
        </div>

        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <OrderStatusRevenue ordersProducts={ordersProducts} />
        </div>
      </div>
    </>
  );
}
