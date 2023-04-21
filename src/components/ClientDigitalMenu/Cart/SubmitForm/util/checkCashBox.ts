import { supabase } from '@/src/server/api';
import { iCashBox, iRestaurantWithFKData } from '@/src/types/types';

import { toast } from 'react-toastify';

export async function checkCashBox(restaurant: iRestaurantWithFKData) {
  const { data: currentCashBoxData } = await supabase
    .from('cash_boxes')
    .select('*')
    .match({ restaurant_id: restaurant!.id, is_open: true });

  const currentCashBox = currentCashBoxData![0] as unknown as iCashBox['data'];

  if (!currentCashBox) {
    toast.error('O Pedido só pode ser feito se o caixa estiver aberto.', {
      theme: 'light',
    });
    return false;
  }
  return currentCashBox;
}
