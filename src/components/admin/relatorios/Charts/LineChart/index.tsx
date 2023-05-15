import { Line } from 'react-chartjs-2';

import { iOrders, iOrdersProducts } from '@/src/types/iOrders';
import { iProductCategories, iProducts } from '@/src/types/iProducts';
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';

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
    orders: iOrders['data'];
    products: iProducts['data'];
    productCategories: iProductCategories['data'];
    ordersProducts: iOrdersProducts['data'];
  };
  dailyRevenue: DailyRevenue[];
}

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Faturamento',
    },
    style: {
      width: '100%',
    },
  },
};

export function LineChart({ dailyRevenue }: iLineChartsProps) {
  return (
    <div>
      <Line
        options={options}
        data={{
          labels: dailyRevenue.map(r => r.date.toDateString()),
          datasets: [
            {
              label: 'Revenue',
              data: dailyRevenue.map(r => r.revenue),
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        }}
      />
    </div>
  );
}
