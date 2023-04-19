/* eslint-disable react-hooks/rules-of-hooks */
import {
  iOrdersProductsWithFKData,
  iTablePaymentWithPaymentFKData,
} from '@/src/types/types';
import FormOfPayment from './FormOfPayment';
import OrderStatusRevenue from './OrderStatusRevenue';

interface iCashBoxProps {
  ordersProducts: iOrdersProductsWithFKData[];
  tables_payments: iTablePaymentWithPaymentFKData[];
}

export function CashBox({ ordersProducts, tables_payments }: iCashBoxProps) {
  return (
    <>
      <div className="grid grid-cols-4 gap-4 text-black w-full">
        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <FormOfPayment
            tables_payments={tables_payments}
            ordersProducts={ordersProducts}
          />
        </div>

        <div className="flex flex-col col-span-4 md:col-span-2 p-4 mt-4 shadow shadow-gray-400">
          <OrderStatusRevenue ordersProducts={ordersProducts} />
        </div>
      </div>
    </>
  );
}
