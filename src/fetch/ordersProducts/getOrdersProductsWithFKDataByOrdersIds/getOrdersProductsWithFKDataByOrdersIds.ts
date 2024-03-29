import { Json } from '@/src/types/supabase';
import { supabase } from '../../../server/api';

import { iAdditional } from '@/src/types/iAdditional';
import {
  iOrderProduct,
  iOrdersProductsWithFKDataToDelivery,
} from '@/src/types/iOrders';
import { iProduct, iProductOptions } from '@/src/types/iProducts';
import { getAdditionalsByIdsFetch } from '../../additionals/getAdditionalsByIds';

interface iGetOrdersProductsWithFKDataByOrdersIdsFetchProps {
  ordersIds: number[];
}
interface iNewAdditionalsData {
  additional: iAdditional['data'];
  quantity: number;
}
interface iAdditionalsData {
  quantity: number;
  additional_id: number;
}

interface iSelectData {
  id: number;
  options: iProductOptions['data'];
}

type iOrdersProductsData = iOrderProduct['data'] & {
  orders: iOrdersProductsWithFKDataToDelivery['orders'];
  products: iProduct['data'];
};

export async function getOrdersProductsWithFKDataByOrdersIdsFetch({
  ordersIds,
}: iGetOrdersProductsWithFKDataByOrdersIdsFetchProps): Promise<
  iOrdersProductsWithFKDataToDelivery[]
> {
  const MAX_PER_PAGE = 1000;
  let currentPage = 0;
  let allOrdersProducts: iOrdersProductsData[] = [];

  while (true) {
    const { data: orders, error } = await supabase
      .from('orders_products')
      .select(
        `
            *,
            products (*),
            orders (
                *,
                clients (
                  *,
                  contacts (*),
                  addresses (*)
                  ),
                order_status (*),
                payment_methods (*),
                delivery_fees (*)
            )
            `
      )
      .in('order_id', ordersIds)
      .returns<Array<iOrdersProductsData>>()
      .range(currentPage * MAX_PER_PAGE, (currentPage + 1) * MAX_PER_PAGE - 1);

    if (error) {
      console.error('Error fetching orders:', error);
      break;
    }

    if (orders.length === 0) {
      break;
    }

    allOrdersProducts = allOrdersProducts.concat(orders!);
    currentPage++;
  }

  if (allOrdersProducts === null) {
    return [];
  }

  // const orderProductFormated = allOrdersProducts.reduce(
  //   (acc: iOrdersProductsWithFKDataToDelivery[], item: iOrdersProductsData) => {
  //     const products = item.products as iProduct['data'];
  //     let additionals: iNewAdditionalsData[] = [];

  //     const getAdditionalsFormatter = async (): Promise<iNewAdditionalsData[]> => {
  //       const [additionalsData] = await Promise.all([
  //         formatAdditionalsData(item.additionals_data),
  //       ]);
  //       additionals = additionalsData;
  //       return additionalsData;
  //     };
  //     getAdditionalsFormatter()

  //     const selects = formatSelectData(item.selects_data);

  //     const newItem = {
  //       ...item,
  //       products,
  //       selectsWithOptions: selects,
  //       additionals: additionals,
  //     };

  //     return [...acc, newItem];
  //   },
  //   []
  // );
  async function formatOrderProductItem(
    item: iOrdersProductsData
  ): Promise<iOrdersProductsWithFKDataToDelivery> {
    const products = item.products as iProduct['data'];

    const [additionalsData] = await Promise.all([
      formatAdditionalsData(item.additionals_data),
    ]);

    const selects = formatSelectData(item.selects_data);

    const newItem = {
      ...item,
      products,
      selectsWithOptions: selects,
      additionals: additionalsData,
    };

    return newItem;
  }

  const orderProductFormated = await Promise.all(
    allOrdersProducts.map(item => formatOrderProductItem(item))
  );

  return orderProductFormated as iOrdersProductsWithFKDataToDelivery[];
}

async function formatAdditionalsData(additionalsData: Json) {
  const formattedAdditionalsData =
    additionalsData as unknown as iAdditionalsData[];
  const additionalsIds = formattedAdditionalsData.map(a => a.additional_id);
  const [additionals] = await Promise.all([
    getAdditionalsByIdsFetch({ ids: additionalsIds }),
  ]);

  const newAdditionalFormatted = additionals.reduce(
    (acc: iNewAdditionalsData[], item: iAdditional['data']) => {
      const additionalCompatible = formattedAdditionalsData.find(
        add => add.additional_id === item.id
      );

      return [
        ...acc,
        {
          additional: item,
          quantity: additionalCompatible?.quantity || 0,
        },
      ];
    },
    []
  );

  return newAdditionalFormatted;
}

function formatSelectData(selects_data: Json) {
  const formattedSelectData = selects_data as unknown as iSelectData[];
  return formattedSelectData;
}
