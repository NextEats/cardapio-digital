import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { iOrders, iProducts, iProductCategories, iOrdersProducts, iOrdersStatus, iOrdersWithFKData } from '../../../../../types/types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

interface iDoughnuCgart {
  globalValuesData: {
    orders: iOrdersWithFKData[],
    ordersStatus: iOrdersStatus["data"],
    ordersGroupedByOrderStatus: { [key: string]: iOrdersWithFKData[] },
  }
}

export function DoughnutChart({ globalValuesData }: iDoughnuCgart) {

  const { orders, ordersStatus, ordersGroupedByOrderStatus } = globalValuesData
  // const dataFormattedForChart = ordersStatus.reduce((acc: { labels: string[], data: number[] }, status) => {
  //   const ordersFilteredByStatus = orders.filter(o => o.order_status_id === status.id)
  //   return { labels: [...acc.labels, status.status_name!], data: [...acc.data, ordersFilteredByStatus.length] }
  // }, { labels: [], data: [] })

  const dataFormattedForChart = {
    labels: ['Em análise', 'Em produção', 'A caminho', 'Emtregue', 'Cancelado'],
    data: [
      ordersGroupedByOrderStatus["em análise"] ? ordersGroupedByOrderStatus["em análise"].length : 0,
      ordersGroupedByOrderStatus["em produção"] ? ordersGroupedByOrderStatus["em produção"].length : 0,
      ordersGroupedByOrderStatus["a caminho"] ? ordersGroupedByOrderStatus["a caminho"].length : 0,
      ordersGroupedByOrderStatus["entregue"] ? ordersGroupedByOrderStatus["entregue"].length : 0,
      ordersGroupedByOrderStatus["cancelado"] ? ordersGroupedByOrderStatus["cancelado"].length : 0,
    ]
  }

  const data = {
    labels: dataFormattedForChart.labels,
    datasets: [
      {
        data: dataFormattedForChart.data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 159, 64, 0.7)',
          'rgba(255, 99, 132, 0.7)',
          'rgba(153, 102, 255, 0.7)',
        ],
      },
      // {
      //   label: '',
      //   data: [],
      //   backgroundColor: ['rgba(255, 99, 132, 0.0)'],
      // },
    ],
  };

  return (
    <div className="flex flex-1 h-[350px] xl:h-auto">
      <Doughnut className='w-full' options={options} data={data} />
    </div>
  )
}
