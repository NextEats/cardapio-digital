import AdminWrapper from "../../../../components/admin/AdminWrapper";
import { GlobalValuesCard } from "../../../../components/admin/relatorios/GlobalValuesCard";

import { LineChart } from "../../../../components/admin/relatorios/Charts/LineChart";
import { GetServerSideProps } from "next";
import {
  iOrders,
  iOrdersProducts,
  iOrdersStatus,
  iProductCategories,
  iProducts,
} from "../../../../types/types";
import { DoughnutChart } from "../../../../components/admin/relatorios/Charts/DoughnutChart";
import { HorizontalGraphics } from "../../../../components/admin/relatorios/Charts/HorizontalGraphics";
import { BarChart } from "../../../../components/admin/relatorios/Charts/BarChart";
import { useCallback, useEffect, useMemo, useState } from "react";
import { CardapioDigitalButton } from "../../../../components/admin/cardapio-digital/CardapioDigitalButton";
import { format } from "date-fns";
import { getOrdersByRestaurantIdFetch } from "src/fetch/orders/getOrdersByRestaurantId";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";
import { getOrderStatusFetch } from "src/fetch/orderStatus/getOrdersStatus";
import { getProductsByRestaurantIdFetch } from "src/fetch/products/getProductsByRestaurantId";
import { getRestaurantBySlugFetch } from "src/fetch/restaurant/getRestaurantBySlug";
import { getProductsCategoriesByRestaurantIdFetch } from "src/fetch/productsCategories/getProductsCategoriesByRestaurantId";
import { ptBR } from 'date-fns/locale';

interface DailyRevenue {
  date: Date;
  revenue: number;
}

interface iReportsProps {
  orders: iOrders["data"];
  products: iProducts["data"];
  productCategories: iProductCategories["data"];
  ordersProducts: iOrdersProducts["data"];
  ordersStatus: iOrdersStatus["data"];
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const restaurant: any = await getRestaurantBySlugFetch(context.query.slug);
  const productCategories = await getProductsCategoriesByRestaurantIdFetch(
    restaurant.id
  );
  const orders = await getOrdersByRestaurantIdFetch(restaurant.id);
  const products = await getProductsByRestaurantIdFetch(restaurant.id);
  const ordersStatus = await getOrderStatusFetch();
  const ordersProducts = await getOrdersProductsFetch();

  return {
    props: {
      orders,
      products,
      ordersProducts,
      productCategories,
      ordersStatus,
    },
  };
};

export default function Reports({
  orders,
  productCategories,
  products,
  ordersProducts,
  ordersStatus,
}: iReportsProps) {
  const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);

  const [ordersDate, setOrdersDate] = useState<iOrders["data"]>([]);
  // const [statusDate, setStatusDate] = useState<iOrdersStatus["data"]>([]);
  // // const [ordersProductsDate, setOrdersProductsDate] = useState<iOrdersProducts["data"]>([]);
  // const [productsDate, setProductsDate] = useState<iProducts["data"]>([]);
  // const [productCategoriesDate, setProductCategoriesDate] = useState<iProductCategories["data"]>([]);

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

  const handleFilterClick = () => {
    // Filter orders by date
    const filteredOrders = orders.filter((order) => {
      if (!order.created_at) return false;
      const orderDate = new Date(order.created_at);
      return orderDate >= startDate! && orderDate <= endDate!;
    });

    // Filter order details by order id
    const filteredOrdersProducts = ordersProducts.filter((detail) =>
      filteredOrders.some((order) => order.id === detail.order_id)
    );

    // Filter products by product id
    const filteredProducts = products.filter((product) =>
      filteredOrdersProducts.some((detail) => detail.product_id === product.id)
    );

    const dailyRevenue = filteredOrdersProducts.reduce(
      (acc: { [date: string]: number }, detail) => {
        const date = new Date(detail.created_at!).toDateString();
        if (acc[date]) {
          acc[date] +=
            filteredProducts.find((product) => product.id === detail.product_id)
              ?.price || 0;
        } else {
          acc[date] =
            filteredProducts.find((product) => product.id === detail.product_id)
              ?.price || 0;
        }
        return acc;
      },
      {}
    );

    if (startDate === null) {
      return;
    }

    setOrdersDate(
      orders.filter(
        (o) =>
          new Date(o.created_at!) >= new Date(startDate) &&
          new Date(o.created_at!) <= new Date(endDate!)
      )
    );
    // setStatusDate(ordersStatus.filter(os => new Date(os.created_at!) >= new Date(startDate) && new Date(os.created_at!) <= new Date(endDate!)))
    // setOrdersProductsDate(ordersProducts.filter(op => new Date(op.created_at!) >= new Date(startDate) && new Date(op.created_at!) <= new Date(endDate!)))
    // setProductsDate(products.filter(p => new Date(p.created_at!) >= new Date(startDate) && new Date(p.created_at!) <= new Date(endDate!)))
    // setProductCategoriesDate(productCategories.filter(pc => new Date(pc.created_at!) >= new Date(startDate) && new Date(pc.created_at!) <= new Date(endDate!)))

    setDailyRevenue(
      Object.entries(dailyRevenue).map(([date, revenue]) => ({
        date: new Date(date),
        revenue,
      }))
    );
  };
  // }, [startDate, endDate, productCategories, products, ordersProducts, ordersStatus, orders]);
  const moment = new Date();

  useMemo(() => {
    function filter() {
      handleFilterClick();
    }
    filter();
  }, []);

  const globalValuesData = {
    orders: ordersDate,
    productCategories: productCategories,
    products: products,
    ordersProducts: ordersProducts,
    ordersStatus: ordersStatus,
  };

  return (
    <AdminWrapper>
      <div>
        <p className="text-base font-medium mb-4 text-right">
          {" "}
          {format(moment, "HH")} {":"} {format(moment, "mm")} {"-"}{" "}
          {format(moment, "P", { locale: ptBR })}{" "}
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
        <GlobalValuesCard globalValuesData={globalValuesData} />

        <div className="xl:grid  xl:grid-cols-xlcharts xl:max-w-full gap-5 xl: mb-8">
          <LineChart
            globalValuesData={globalValuesData}
            dailyRevenue={dailyRevenue}
          />
          <DoughnutChart globalValuesData={globalValuesData} />
          <BarChart globalValuesData={globalValuesData} />
        </div>
        <HorizontalGraphics globalValuesData={globalValuesData} />
      </div>
    </AdminWrapper>
  );
}
