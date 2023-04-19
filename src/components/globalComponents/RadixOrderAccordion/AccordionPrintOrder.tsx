import {
  iOrdersProductsWithFKDataToDelivery,
  iOrdersProductsWithFKProducdData,
} from '@/src/types/types';
import { RefObject } from 'react';

type iAccordionPrintOrderProps = {
  orders_products:
    | iOrdersProductsWithFKProducdData[]
    | iOrdersProductsWithFKDataToDelivery[];
  printOrderComponent: RefObject<HTMLDivElement>;
};

export default function AccordionPrintOrder({
  orders_products,
  printOrderComponent,
}: iAccordionPrintOrderProps) {
  // const handleDeleteOrderProdcut = async () => {
  //   const { data } = await supabase
  //     .from('orders_products')
  //     .delete()
  //     .eq('id', order_prodcut_id);
  //   window.location.reload();
  // };

  return (
    <div className="hidden">
      <div
        ref={printOrderComponent}
        className="z-[-2000] fixed bg-white ml-auto shadow-bd w-[298px] text-[12px] shadow-md p-4 hideShadowToPrint centerCompontetToPrint pb-8"
      >
        <h2 className="text-center uppercase text-black font-semibold">
          COMANDA -
        </h2>

        <div className="flex flex-col gap-2 uppercase">
          {orders_products.map((order_product, pIndex) => {
            return (
              <div key={pIndex} className="flex flex-col">
                <strong className="mb-1 flex items-center justify-between">
                  <span>
                    {' '}
                    {order_product.quantity}X - {order_product.products.name}
                  </span>
                  <span>R$ {order_product.total_price}</span>
                </strong>
                {order_product.selectsWithOptions.length > 0 ? (
                  <div className="flex">
                    <div>
                      |&nbsp;
                      <span>
                        {order_product.selectsWithOptions.map(
                          (productSelects, psIndex) => {
                            return productSelects.options.map(
                              (option, index) => option.name + ' | '
                            );
                          }
                        )}
                      </span>
                    </div>
                  </div>
                ) : null}

                {order_product.additionals.map((additional, aIndex) => {
                  return (
                    <span key={aIndex}>
                      {additional.quantity} - {additional.additional.name} -
                      <span className="font-semibold ml-auto">
                        R$ {additional.additional.price * additional.quantity}
                      </span>
                    </span>
                  );
                })}

                {order_product.observation ? (
                  <p>
                    <strong>Obs.:</strong> {order_product.observation}
                  </p>
                ) : null}

                <hr className="my-2 h-[2px] bg-black" />
              </div>
            );
          })}
        </div>

        {/* <div>
          <p className="grid grid-cols-2 items-center gap-10">
            <span className={`${textStyles}`}>Total a pagar: </span>
            <span className={`${textStyles} w-`}>
              <strong>R$ {totalOrderPrice}</strong>
            </span>
          </p>
        </div> */}
      </div>
    </div>
  );
}
