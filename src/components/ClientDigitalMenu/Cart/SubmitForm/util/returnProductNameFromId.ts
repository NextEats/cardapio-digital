import { supabase } from '@/src/server/api';

export default async function returnProductNameFromId(product_id: number) {
  const { data } = await supabase
    .from('products')
    .select('name')
    .eq('id', product_id);

  if (data) {
    console.log('data[0].name', data[0].name);
    return data[0].name;
  } else {
    return '';
  }
}
