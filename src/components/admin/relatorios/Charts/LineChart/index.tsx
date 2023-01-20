import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
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
      style: {
        width: '100%',
      }
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [333, 333, 444, 555, 666, 777, 888],
        borderColor: 'rgb(255, 99, 132)',
      },
      {
        label: 'Dataset 2',
        data: [322, 344, 644, 455, 966, 277, 858],
        borderColor: 'rgba(53, 162, 235, 0.5)',
  
      },
      {
        label: 'Dataset 2',
        data: [522, 944, 644, 455, 966, 277, 858],
        borderColor: 'rgba(53, 162, 235, 0.5)',
  
      },
    ],
  };
  

  export function LineChart() {
    return (
        
        <div className="w-full xl:h-auto xl:w-auto">
          <Line options={options} data={data} />
        </div>
    )
  }