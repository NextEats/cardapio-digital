import { DeliveryPageContext } from '@/src/contexts/DeliveryContextProvider';
import { useContext } from 'react';

// const MockedAccordionData = {
//     orders: {
//         cash_box_id:1,
//         change_value: 1,
//         client_id: 1,
//         created_at: 1,
//         delivery_fee_id: 1,
//         id: 1,
//         number: 1,
//         order_status_id: 1,
//         order_type_id: 1,
//         payment_method_id: 1,
//         restaurant_id: 1
//       },
//     orders_products: {
//         products: iProduct['data'];
//   additionals: {
//     additional: iAdditional['data'];
//     quantity: number;
//   }[];
//   selectsWithOptions: {
//     id: number;
//     options: iProductOptions['data'];
//   }[];
//     };
//   }

export default function Delivery() {
  const { order, orders_products, restaurant } =
    useContext(DeliveryPageContext);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <OrderAccordionStatus />
      <OrderAccordionStatus />
      <OrderAccordionStatus />
      <OrderAccordionStatus />
    </div>
  );
}

function OrderAccordionStatus() {
  return <div>1</div>;
}
