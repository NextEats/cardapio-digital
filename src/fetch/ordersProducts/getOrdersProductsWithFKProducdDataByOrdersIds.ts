import { Json } from '@/src/types/supabase';
import { supabase } from '../../server/api';
import {
  iAdditional,
  iOrdersProductsWithFKProducdData,
  iProduct,
  iProductOptions,
} from '../../types/types';
import { getAdditionalsByIdsFetch } from '../additionals/getAdditionalsByIds';

interface iGetOrdersProductsWithFKProductDataByOrdersIdsFetchProps {
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

interface iOrderProductData {
  additionals_data: Json;
  created_at: string | null;
  id: number;
  observation: string | null;
  order_id: number;
  product_id: number;
  selects_data: Json;
  products: {} | {}[] | null;
}

export async function getOrdersProductsWithFKProducdDataByOrdersIdsFetch({
  ordersIds,
}: iGetOrdersProductsWithFKProductDataByOrdersIdsFetchProps): Promise<
  iOrdersProductsWithFKProducdData[]
> {
  const { data } = await supabase
    .from('orders_products')
    .select('*, products (*) ')
    .in('order_id', ordersIds);

  if (data === null) {
    return [];
  }

  const orderProductFormated: iOrdersProductsWithFKProducdData[] = [];

  for (const item of data) {
    const products = item.products as iProduct['data'];
    const additionals = await formatAdditionalsData(item.additionals_data);
    const selects = formatSelectData(item.selects_data);

    const newItem: iOrdersProductsWithFKProducdData = {
      ...item,
      products,
      selectsWithOptions: selects,
      additionals: additionals,
    };

    orderProductFormated.push(newItem);
  }

  return orderProductFormated;
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
