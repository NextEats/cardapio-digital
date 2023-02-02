import AdminWrapper from "../../../../components/admin/AdminWrapper";
import { GlobalValuesCard } from "../../../../components/admin/relatorios/GlobalValuesCard";

import { LineChart } from "../../../../components/admin/relatorios/Charts/LineChart";
import { GetServerSideProps } from "next";
import { supabase } from "../../../../server/api";
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

export const getServerSideProps: GetServerSideProps = async () => {
  const productCategories = await supabase.from("product_categories").select();
  const products = await supabase.from("products").select();
  const orders = await supabase.from("orders").select();
  const ordersProducts = await supabase.from("orders_products").select();
  const ordersStatus = await supabase.from("order_status").select();
  // const loacal =  window.localStorage.setItem("product_categories", JSON.stringify(productCategories.data))

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

interface iReportsProps {
  orders: iOrders;
  products: iProducts;
  productCategories: iProductCategories;
  ordersProducts: iOrdersProducts;
  ordersStatus: iOrdersStatus;
}

export default function Reports({
  orders,
  productCategories,
  products,
  ordersProducts,
  ordersStatus,
}: iReportsProps) {
  const globalValuesData = {
    orders: orders.data,
    productCategories: productCategories.data,
    products: products.data,
    ordersProducts: ordersProducts.data,
    ordersStatus: ordersStatus.data,
  };

  return (
    <AdminWrapper>
      <div>
        <GlobalValuesCard globalValuesData={globalValuesData} />

        <div className="xl:grid  xl:grid-cols-xlcharts xl:max-w-full gap-5 xl: mb-8">
          <LineChart globalValuesData={globalValuesData} />
          <DoughnutChart globalValuesData={globalValuesData} />
          <BarChart globalValuesData={globalValuesData} />
        </div>
        <HorizontalGraphics globalValuesData={globalValuesData} />
      </div>
    </AdminWrapper>
  );
}
