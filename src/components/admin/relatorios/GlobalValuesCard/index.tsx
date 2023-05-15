import { Card } from '../../Card';

import { getOrdersProductsData } from '@/src/helpers/getOrdersProductsData';
import { iAdditionals } from '@/src/types/iAdditional';
import {
  iOrders,
  iOrdersProducts,
  iOrdersStatus,
  iOrdersWithFKData,
} from '@/src/types/iOrders';
import { iProductCategories, iProducts } from '@/src/types/iProducts';
import { iSelects } from '@/src/types/iSelect';
import { useEffect, useState } from 'react';

interface iGlobalValuesCardProps {
  additionals: iAdditionals['data'];
  selects: iSelects['data'];
  globalValuesData: {
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] };
    orders: iOrders['data'];
    products: iProducts['data'];
    productCategories: iProductCategories['data'];
    ordersProducts: iOrdersProducts['data'];
    ordersStatus: iOrdersStatus['data'];
  };
}

export function GlobalValuesCard({
  globalValuesData,
  additionals,
  selects,
}: iGlobalValuesCardProps) {
  const [billingsVisibility, setBillingsVisibility] = useState(true);

  useEffect(() => {
    let localstorageVisibility = JSON.parse(
      localStorage.getItem('billingsVisibility') as string
    );
    setBillingsVisibility(!localstorageVisibility);
  }, []);

  const handleBillingsVisibility = () => {
    setBillingsVisibility(!billingsVisibility);
    localStorage.setItem(
      'billingsVisibility',
      JSON.stringify(billingsVisibility)
    );
  };

  const {
    orders,
    products,
    ordersProducts,
    ordersStatus,
    ordersGroupedByOrderStatus,
  } = globalValuesData;

  function billing() {
    let ordersProductFiltered;
    if (ordersGroupedByOrderStatus['entregue']) {
      ordersProductFiltered = ordersProducts.filter(op =>
        ordersGroupedByOrderStatus['entregue'].some(o => o.id === op.order_id)
      );

      const productIds = ordersProductFiltered.map(
        ordersProduct => ordersProduct.product_id
      );
      const selectedProduct = productIds.map(
        productId =>
          products[products.findIndex(product => productId === product.id)]
      );

      const totalPriceOfDeliveryFee = ordersGroupedByOrderStatus[
        'entregue'
      ].reduce((acc, item) => {
        if (!item.delivery_fees) return acc;
        return acc + item.delivery_fees.fee;
      }, 0);
      const totalAdditionalPrice = getOrdersProductsData({
        ordersProducts: ordersProductFiltered,
        additionals,
        products,
        selects,
      }).reduce(
        (acc: any, item: any) => acc + item.totalAdditionalsPriceByProduct,
        0
      );
      return (
        selectedProduct.reduce((acc, product) => acc + product?.price!, 0) +
        totalPriceOfDeliveryFee +
        totalAdditionalPrice
      );
    } else {
      return 0;
    }
  }

  return (
    <>
      <div className="grid 2xs:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
        <Card
          billingsVisibility={billingsVisibility}
          setBillingsVisibility={setBillingsVisibility}
          handleBillingsVisibility={handleBillingsVisibility}
          color="red"
          name="Faturamento"
          value={`${billing()}`}
        />
        <Card
          color="green"
          name="Pedidos"
          value={`${
            ordersGroupedByOrderStatus['entregue']
              ? ordersGroupedByOrderStatus['entregue'].length
              : 0
          }`}
        />
        <Card
          color="yellow"
          name="Produtos no Cardápio"
          value={`${products.length}`}
        />
        <Card color="blue" name="Ingredientes em Falta" value={'0'} />
      </div>
    </>
  );
}
