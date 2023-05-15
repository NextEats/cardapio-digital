import { iAdditional, iAdditionals } from '@/src/types/iAdditional';
import { iInsertOrdersProducts } from '@/src/types/iOrders';
import { iProducts } from '@/src/types/iProducts';
import { iSelects } from '@/src/types/iSelect';

export interface iProductsDetailsProps {
  additionals: iAdditionals['data'];
  productsFiltered: iProducts['data'];
  selects: iSelects['data'];
  orderProductFiltered: iInsertOrdersProducts['data'];
  result: {
    id: number | undefined;
    name: string;
    count: number;
    price: number;
  }[];
}

export default function ProductsDetails({
  additionals,
  orderProductFiltered,
  result,
  productsFiltered,
}: iProductsDetailsProps) {
  console.log('additionals', additionals);
  console.log('orderProductFiltered', orderProductFiltered);
  console.log('productsFiltered', productsFiltered);

  const totalPrice = productsFiltered;

  const textStyles =
    'text-[12px] leading-[14px] font-semibold text-black text-left leading-6';
  let ordersProductsId: number[] = [];
  if (!productsFiltered) return null;
  return (
    <div className="mb-2 w-full uppercase">
      <div>
        {productsFiltered!.map((product: any, index) => {
          console.log(product);

          const orderProductByProductId = orderProductFiltered.find(
            op =>
              op.product_id === product.id &&
              !ordersProductsId.some(opId => opId === op.id)
          );

          console.log('orderProductByProductId', orderProductByProductId);

          if (!orderProductByProductId) return;
          ordersProductsId = [...ordersProductsId, orderProductByProductId.id!];

          const selectsData = orderProductByProductId.selects_data as
            | {
                id: number;
                max_selected_options: number;
                name: string;
                options: {
                  id: number;
                  is_default_value: boolean;
                  name: string;
                  picture_url: string;
                  select_id: number;
                  selected: boolean;
                }[];
              }[]
            | undefined
            | null;

          const additionalsData = orderProductByProductId.additionals_data as {
            quantity: number;
            additional_id: number;
          }[];

          const additionalsDataFiltered =
            additionalsData !== null
              ? additionalsData.reduce(
                  (
                    acc: {
                      additional: iAdditional['data'];
                      quantity: number;
                    }[],
                    item
                  ) => {
                    if (additionals.some(a => a.id === item.additional_id)) {
                      return [
                        ...acc,
                        {
                          additional:
                            additionals[
                              additionals.findIndex(
                                a => a.id === item.additional_id
                              )
                            ],
                          quantity: item.quantity,
                        },
                      ];
                    }
                    return [...acc];
                  },
                  []
                )
              : [];

          const totalAdditionalsPrice = additionalsDataFiltered.reduce(
            (acc, current) => {
              return acc + current.additional.price * current.quantity;
            },
            0
          );

          const totalProductPriceWithAdditionals =
            totalAdditionalsPrice + product.price;

          if (product === undefined) {
            return;
          }
          return (
            <div key={index} className="w-full">
              <div
                className={`w-full flex items-center justify-between ${textStyles} mt-1`}
              >
                <span>
                  {1} - <strong className="">{product.name}</strong>
                </span>
                <span className="font-bold">
                  {' '}
                  R$ {totalProductPriceWithAdditionals}
                </span>
              </div>

              <div className="flex">
                {
                  <>
                    {selectsData!.map(s => {
                      return (
                        <div key={s.id} className="flex flex-row">
                          {s.options.map(o => {
                            return (
                              <span
                                key={o.id}
                                className={`text- font-normal ml-2 ${textStyles} `}
                              >
                                {o.name}
                                {','}
                              </span>
                            );
                          })}
                        </div>
                      );
                    })}
                  </>
                }
              </div>
              <div className="ml-2">
                {additionalsDataFiltered.map(additional => {
                  return (
                    <div
                      key={additional.additional.id}
                      className="flex items-center justify-between pr-2 text-[10px] font-normal"
                    >
                      <span>
                        {additional.quantity} - {additional.additional.name}{' '}
                      </span>
                    </div>
                  );
                })}
              </div>
              <span className="text-sm mt-4">
                <span className="font-semibold">Obs:</span>{' '}
                {orderProductByProductId.observation}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
