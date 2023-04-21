import { supabase } from '@/src/server/api';

interface iGetOrderPositionProps {
  restaurantId: number;
  currentCashBoxId: number;
}

export async function getOrderPosition({
  currentCashBoxId,
  restaurantId,
}: iGetOrderPositionProps): Promise<number> {
  const { data: orders } = await supabase
    .from('orders')
    .select('number')
    .match({
      restaurant_id: restaurantId,
      cash_box_id: currentCashBoxId,
    });
  // Mapeie a matriz de objetos para uma matriz de números de pedidos
  const orderNumbers = orders ? orders.map(order => order.number) : [0];

  // Encontre o maior número de pedido
  const maxOrderNumber =
    orderNumbers.length > 0 ? Math.max(...orderNumbers) : 0;
  const nextOrderNumber = maxOrderNumber + 1;

  return nextOrderNumber;
}
