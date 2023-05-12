import AdminWrapper from '../../../../components/admin/AdminWrapper';
import { GlobalValuesCard } from '../../../../components/admin/relatorios/GlobalValuesCard';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { GetServerSideProps } from 'next';
import { useCallback, useMemo, useState } from 'react';
import { getOrderStatusFetch } from 'src/fetch/orderStatus/getOrdersStatus';
import { getOrdersByRestaurantIdFetch } from 'src/fetch/orders/getOrdersByRestaurantId';
import { getOrdersProductsFetch } from 'src/fetch/ordersProducts/getOrdersProducts';
import { getProductsByRestaurantIdFetch } from 'src/fetch/products/getProductsByRestaurantId';
import { getProductsCategoriesByRestaurantIdFetch } from 'src/fetch/productsCategories/getProductsCategoriesByRestaurantId';
import { getRestaurantBySlugFetch } from 'src/fetch/restaurant/getRestaurantBySlug';
import { CardapioDigitalButton } from '../../../../components/admin/cardapio-digital/CardapioDigitalButton';
import { BarChart } from '../../../../components/admin/relatorios/Charts/BarChart';
import { DoughnutChart } from '../../../../components/admin/relatorios/Charts/DoughnutChart';
import { HorizontalGraphics } from '../../../../components/admin/relatorios/Charts/HorizontalGraphics';

import { getAdditionalsByRestaurantIdFetch } from '@/src/fetch/additionals/getAdditionals';
import { getSelectsByRestaurantIdFetch } from '@/src/fetch/selects/getSelectsByRestaurantId';
import { iAdditionals } from '@/src/types/iAdditional';
import {
  iOrdersProducts,
  iOrdersStatus,
  iOrdersWithFKData,
} from '@/src/types/iOrders';
import { iProductCategories, iProducts } from '@/src/types/iProducts';
import { iSelects } from '@/src/types/iSelect';

interface DailyRevenue {
  date: Date;
  revenue: number;
}

interface iReportsProps {
  orders: iOrdersWithFKData[];
  products: iProducts['data'];
  productCategories: iProductCategories['data'];
  ordersProducts: iOrdersProducts['data'];
  ordersStatus: iOrdersStatus['data'];
  additionals: iAdditionals['data'];
  selects: iSelects['data'];
}

export const getServerSideProps: GetServerSideProps = async context => {
  const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);
  const productCategories = await getProductsCategoriesByRestaurantIdFetch(
    restaurant.id
  );
  const orders = await getOrdersByRestaurantIdFetch(restaurant.id);
  const products = await getProductsByRestaurantIdFetch(restaurant.id);
  const ordersStatus = await getOrderStatusFetch();
  const ordersProducts = await getOrdersProductsFetch();
  const additionals = await getAdditionalsByRestaurantIdFetch(restaurant.id);
  const selects = await getSelectsByRestaurantIdFetch(restaurant.id);

  return {
    props: {
      orders,
      products,
      ordersProducts,
      productCategories,
      ordersStatus,
      additionals,
      selects,
    },
  };
};

export default function Reports({
  orders,
  productCategories,
  products,
  ordersProducts,
  ordersStatus,
  additionals,
  selects,
}: iReportsProps) {
  const ordersGroupedByOrderStatus = orders.reduce(
    (acc: { [key: string]: iOrdersWithFKData[] }, obj) => {
      const status_name = obj.order_status.status_name;
      if (!acc[status_name]) {
        acc[status_name] = [];
      }
      acc[status_name].push(obj);
      return acc;
    },
    {}
  );

  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);

  const [ordersFilteredByDate, setOrdersFilteredByDate] = useState<
    iOrdersWithFKData[]
  >([]);

  const [startDate, setStartDate] = useState<Date | null>(
    new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(new Date(event.target.value));
  };

  const handleFilterClick = useCallback(() => {
    // Filter orders by date
    const filteredOrders = orders.filter(order => {
      if (!order.created_at) return false;
      const orderDate = new Date(order.created_at);
      return orderDate >= startDate! && orderDate <= endDate!;
    });

    // Filter order details by order id
    const filteredOrdersProducts = ordersProducts.filter(detail =>
      filteredOrders.some(order => order.id === detail.order_id)
    );

    // Filter products by product id
    const filteredProducts = products.filter(product =>
      filteredOrdersProducts.some(detail => detail.product_id === product.id)
    );

    const dailyRevenue = filteredOrdersProducts.reduce(
      (acc: { [date: string]: number }, detail) => {
        const date = new Date(detail.created_at!).toDateString();
        if (acc[date]) {
          acc[date] +=
            filteredProducts.find(product => product.id === detail.product_id)
              ?.price || 0;
        } else {
          acc[date] =
            filteredProducts.find(product => product.id === detail.product_id)
              ?.price || 0;
        }
        return acc;
      },
      {}
    );

    if (startDate === null) {
      return;
    }

    setOrdersFilteredByDate(
      orders.filter(
        o =>
          new Date(o.created_at!) >= new Date(startDate) &&
          new Date(o.created_at!) <= new Date(endDate!)
      )
    );

    setDailyRevenue(
      Object.entries(dailyRevenue).map(([date, revenue]) => ({
        date: new Date(date),
        revenue,
      }))
    );
  }, [endDate, orders, ordersProducts, products, startDate]);

  useMemo(() => {
    function filter() {
      handleFilterClick();
    }
    filter();
  }, [handleFilterClick]);

  const moment = new Date();

  const globalValuesData = {
    ordersGroupedByOrderStatus,
    orders: ordersFilteredByDate,
    productCategories: productCategories,
    products: products,
    ordersProducts: ordersProducts,
    ordersStatus: ordersStatus,
  };

  return (
    <AdminWrapper>
      <div>
        <p className="text-base font-medium mb-4 text-right">
          {format(moment, 'HH')} {':'} {format(moment, 'mm')} {'-'}{' '}
          {format(moment, 'P', { locale: ptBR })}{' '}
        </p>

        <div className="flex items-center gap-3 mb-3">
          <label className="text-gray-700 font-semibold">Start Date:</label>
          <input
            className="rounded shadow-sm text-base font-medium text-gray-700 cursor-pointer py-1 px-2"
            type="date"
            onChange={handleStartDateChange}
          />
          <label className="text-gray-700 font-semibold">End Date:</label>
          <input
            className="rounded shadow-sm text-base font-medium text-gray-700 cursor-pointer py-1 px-2"
            type="date"
            onChange={handleEndDateChange}
          />
          <CardapioDigitalButton
            onClick={() => handleFilterClick()}
            name="Filtrar"
            h="h-8"
            w="w-24"
          />
          {/* <button onClick={handleFilterClick}>Filter</button> */}
        </div>
        <GlobalValuesCard
          additionals={additionals}
          selects={selects}
          globalValuesData={globalValuesData}
        />

        <div className="xl:grid  xl:grid-cols-xlcharts xl:max-w-full gap-5 xl: mb-8">
          {/* <LineChart
            globalValuesData={globalValuesData}
            dailyRevenue={dailyRevenue}
          /> */}
          <DoughnutChart globalValuesData={globalValuesData} />
          <BarChart globalValuesData={globalValuesData} />
        </div>
        <HorizontalGraphics globalValuesData={globalValuesData} />
      </div>
    </AdminWrapper>
  );
}
