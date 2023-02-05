// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
// import { eachDayOfInterval, endOfDay, startOfDay, format } from 'date-fns';
// import { Line } from 'react-chartjs-2';
// import { iOrders, iProducts, iProductCategories, iOrdersProducts, iOrder, iProduct } from '../../../../../types/types';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const orders = [
//   { date: '2022-04-01', price: 100 },
//   { date: '2022-05-02', price: 200 },
//   { date: '2022-01-03', price: 150 },
//   { date: '2022-01-03', price: 150 },
//   { date: '2022-10-03', price: 150 },
//   { date: '2022-12-03', price: 150 },
//   { date: '2022-06-03', price: 150 },
// ];
// interface iLineChartsProps {
//   globalValuesData: {
//     orders: iOrders["data"],
//     products: iProducts["data"],
//     productCategories: iProductCategories["data"],
//     ordersProducts: iOrdersProducts["data"],
//   }
// }

// export function LineChart({ globalValuesData }: iLineChartsProps) {
//   const { orders, products, ordersProducts } = globalValuesData

//   const startDate = new Date('2022-12-22')
//   const endDate = new Date('2022-12-27')

//     // Função para gerar um array com cada data dentro do período selecionado
//     const generateDatesArray = () => {
//       const start = startOfDay(startDate);
//       const end = endOfDay(endDate);
//       return eachDayOfInterval({start, end});
//     }

//   const ordersFilteredByPeriod = orders.filter(order => {
//     const dateFormated = `${order.created_at?.slice(0, 19)}`
//     return new Date(dateFormated) > startDate && new Date(dateFormated) < new Date()
//   })

//   const orderProductsFilterdByOrderId = ordersProducts.filter((orderProduct) => {
//     return ordersFilteredByPeriod.map(orderByPeriod => {
//       return orderByPeriod.id === orderProduct.order_id
//     })
//   })

//   const calculateTotalPriceByDay = (filteredOrders: iOrdersProducts["data"]) => {

//     generateDatesArray().forEach(date => {
//       const result = {}
//       result[format(date, 'yyyy-MM-dd')] = filteredOrders.map(( order) => {

//          products.map((product) => {
//           ordersFilteredByPeriod.map((orderByPeriod) => {
//             const orderDateFormated = `${orderByPeriod.created_at?.slice(0, 19)}`
//             if(product.id === order.product_id && format(new Date(orderDateFormated), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))

//             return
//           })

//         })
//         return []
//       })
//     })

//   }

//   const productsFilterdByOrderId = orderProductsFilterdByOrderId.map(orderProduct => {
//     return products[products.findIndex(product => product.id === orderProduct.product_id)]
//   })

//   const chartsData = productsFilterdByOrderId.map(product => product.price)

//   const data = {
//     labels: generateDatesArray().map(date => String(date).slice(0, 15) ),
//     datasets: [
//       {
//         label: 'Dataset 1',
//         data: chartsData,
//         borderColor: 'rgb(255, 99, 132)',
//       },
//     ],
//   };

//   return (

//     <div className="w-full xl:h-auto xl:w-auto">
//       <Line options={options} data={data} />
//     </div>
//   )
// }

//  =============================================================================================================  //

import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  iOrders,
  iProducts,
  iProductCategories,
  iOrdersProducts,
} from "../../../../../types/types";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DailyRevenue {
  date: Date;
  revenue: number;
}

interface iLineChartsProps {
  globalValuesData: {
    orders: iOrders["data"];
    products: iProducts["data"];
    productCategories: iProductCategories["data"];
    ordersProducts: iOrdersProducts["data"];
  },
  dailyRevenue: DailyRevenue[]
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Faturamento",
    },
    style: {
      width: "100%",
    },
  },
};

export function LineChart({ dailyRevenue }: iLineChartsProps) {
  // const { orders, products, ordersProducts } = globalValuesData;

  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);

  // const [dailyRevenue, setDailyRevenue] = useState<DailyRevenue[]>([]);

  // const handleStartDateChange = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setStartDate(new Date(event.target.value));
  // };

  // const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setEndDate(new Date(event.target.value));
  // };

  // const handleFilterClick = () => {
  //   // Filter orders by date
  //   const filteredOrders = orders.filter((order) => {
  //     if (!order.created_at) return false;
  //     const orderDate = new Date(order.created_at);
  //     return orderDate >= startDate! && orderDate <= endDate!;
  //   });

  //   // Filter order details by order id
  //   const filteredOrdersProducts = ordersProducts.filter((detail) =>
  //     filteredOrders.some((order) => order.id === detail.order_id)
  //   );

  //   // Filter products by product id
  //   const filteredProducts = products.filter((product) =>
  //     filteredOrdersProducts.some((detail) => detail.product_id === product.id)
  //   );

  //   const dailyRevenue = filteredOrdersProducts.reduce(
  //     (acc: { [date: string]: number }, detail) => {
  //       const date = new Date(detail.created_at!).toDateString();
  //       if (acc[date]) {
  //         acc[date] +=
  //           filteredProducts.find((product) => product.id === detail.product_id)
  //             ?.price || 0;
  //       } else {
  //         acc[date] =
  //           filteredProducts.find((product) => product.id === detail.product_id)
  //             ?.price || 0;
  //       }
  //       return acc;
  //     },
  //     {}
  //   );

  //   setDailyRevenue(
  //     Object.entries(dailyRevenue).map(([date, revenue]) => ({
  //       date: new Date(date),
  //       revenue,
  //     }))
  //   );
  // };

  return (
    <div>
      {/* <label>
        Start Date:
        <input type="date" onChange={handleStartDateChange} />
      </label>
      <label>
        End Date:
        <input type="date" onChange={handleEndDateChange} />
      </label>
      <button onClick={handleFilterClick}>Filter</button> */}
      <Line
        options={options}
        data={{
          labels: dailyRevenue.map((r) => r.date.toDateString()),
          datasets: [
            {
              label: "Revenue",
              data: dailyRevenue.map((r) => r.revenue),
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
            },
          ],
        }}
      />
    </div>
  );
}
