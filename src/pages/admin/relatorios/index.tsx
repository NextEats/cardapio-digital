import AdminWrapper from "../../../components/admin/AdminWrapper";
import { GlobalValuesCard } from "../../../components/admin/relatorios/GlobalValuesCard";

import { LineChart } from "../../../components/admin/relatorios/Charts/LineChart";
import { BarChart } from "../../../components/admin/relatorios/Charts/BarChart";
import { GetServerSideProps } from "next";
import { supabase } from "../../../server/api";
import { iOrders, iOrdersProducts, iProductCategories, iProducts } from "../../../types/types";


export const getServerSideProps: GetServerSideProps = async () => {

  const productCategories = await supabase.from("product_categories").select()
  const products = await supabase.from("products").select()
  const orders = await supabase.from("orders").select()
  const ordersProducts = await supabase.from("orders_products").select()
  // const loacal =  window.localStorage.setItem("product_categories", JSON.stringify(productCategories.data))

  return {
    props: {
      orders,
      products,
      ordersProducts
    }
  }
}

interface iReportsProps {
    orders: iOrders,
    products: iProducts,
    productCategories: iProductCategories["data"],
    ordersProducts: iOrdersProducts,
}

export default function Reports({ orders, productCategories, products, ordersProducts }: iReportsProps ) {
  // console.log(orders, productCategories, products);

  const globalValuesData = { orders: orders.data, productCategories, products: products.data, ordersProducts: ordersProducts.data }

  return (
    <AdminWrapper>
      <div>
        <GlobalValuesCard globalValuesData={globalValuesData} />

        <div className="xl:grid  xl:grid-cols-xlcharts xl:max-w-full gap-5">
          <LineChart globalValuesData={globalValuesData} />
          {/* <LineChart  /> */}
          <BarChart />
        </div>
      </div>
    </AdminWrapper>
  );
}
