import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Doughnut } from 'react-chartjs-2';
  
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
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [333, 333, 444, 555, 666, 777, 888],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
      },
      {
        label: '',
        data: [],
        backgroundColor: [ 'rgba(255, 99, 132, 0.0)' ],
      },
    ],
  };
  
  export function BarChart() {
    return ( 
        <div className="flex flex-1 h-[350px] xl:h-auto">
          <Doughnut className='w-full' options={options} data={data} />
        </div>
    )
  }




  