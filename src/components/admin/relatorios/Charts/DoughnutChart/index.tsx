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
import { iOrders, iProducts, iProductCategories, iOrdersProducts, iOrdersStatus } from '../../../../../types/types';
  
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
  
  
  
  interface iDoughnuCgart {
    globalValuesData: {
      orders: iOrders["data"],
      products: iProducts["data"],
      productCategories: iProductCategories["data"],
      ordersProducts: iOrdersProducts["data"],
      ordersStatus: iOrdersStatus["data"],
    }
  }

  export function DoughnutChart({ globalValuesData }: iDoughnuCgart ) {

    const { orders, products, ordersProducts, ordersStatus } = globalValuesData

    let numberOfOrdersByStatus: { [key: string]: {statusName: string, numberOfOrders: number, ordersId: number[]} }  = {}
    
    for(let i = 0; i < orders.length; i++) {

      for(let j = 0; j < ordersStatus.length; j++) {
        const orderProduct = ordersProducts.find(orderProduct => {
          // orders[1].id === ordersStatus[ordersStatus.findIndex(status => status.id === orderProduct.order_status_id)].id
          return orders[i].id === orderProduct.order_id
        } )

        if ( numberOfOrdersByStatus[ordersStatus[j].status_name!] === undefined) {
          numberOfOrdersByStatus[ordersStatus[j].status_name!] = { statusName: ordersStatus[j].status_name!, numberOfOrders: 0, ordersId: []}
        } 
        //  if( numberOfOrdersByStatus[ordersStatus[j].status_name!].ordersId.some( orderId => orderId !== orderProduct?.order_id) ) {
          if ( orderProduct?.order_status_id === ordersStatus.find( orderstatus => orderstatus.status_name === ordersStatus[j].status_name)?.id) {
            numberOfOrdersByStatus[ordersStatus[j].status_name!].numberOfOrders++
            numberOfOrdersByStatus[ordersStatus[j].status_name!].ordersId = [...numberOfOrdersByStatus[ordersStatus[j].status_name!].ordersId, orders[i].id]
          }
        }
      }
      const numberOfOrdersByStatusArray = Object.values(numberOfOrdersByStatus)

      const dataFormattedForChart = numberOfOrdersByStatusArray.reduce((acc: { labels: string[], data: number[]}, status) => {
        return { labels: [...acc.labels, status.statusName], data: [ ...acc.data, status.numberOfOrders ] }
      }, { labels: [], data: []})

      const data = {
        labels: dataFormattedForChart.labels,
        datasets: [
          {
            data: dataFormattedForChart.data,
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
        
        return ( 
        <div className="flex flex-1 h-[350px] xl:h-auto">
          <Doughnut className='w-full' options={options} data={data} />
        </div>
    )
  }
  


  
  