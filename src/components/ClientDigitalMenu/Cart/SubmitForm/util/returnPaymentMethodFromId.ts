import { supabase } from '@/src/server/api';

export default async function returnPaymentMethodFromId(
  payment_method_id: number
) {
  const { data } = await supabase
    .from('payment_methods')
    .select('name')
    .eq('id', payment_method_id);

  if (data) {
    return data[0].name;
  } else {
    return '';
  }
}
