import { iPaymentMethods } from '@/src/types/iPaymentMethod';
import { supabase } from '../../server/api';

export async function getPaymentMethodsFetch(): Promise<
  iPaymentMethods['data']
> {
  const { data } = await supabase.from('payment_methods').select();

  return data!;
}
