import { iPaymentMethodsRestaurantsWithFKData } from '@/src/types/iPaymentMethod';
import { supabase } from '../../server/api';

export async function getPaymentMethodsRestaurantsByRestaurantIdFetch(
  restaurant_id: number | undefined
): Promise<iPaymentMethodsRestaurantsWithFKData[]> {
  // const { data } = await supabase.from("payment_methods_restaurants").select().eq("restaurant_id", restaurant_id)
  const { data } = await supabase
    .from('payment_methods_restaurants')
    .select('*, payment_methods ( * )')
    .match({ restaurant_id, enabled: true });

  return data! as iPaymentMethodsRestaurantsWithFKData[];
}
