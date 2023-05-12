import { iAdditionals } from '@/src/types/iAdditional';
import { supabase } from '../../server/api';

interface iGetAdditionalsByIdsProps {
  ids: number[];
}

export async function getAdditionalsByIdsFetch({
  ids,
}: iGetAdditionalsByIdsProps): Promise<iAdditionals['data']> {
  const { data } = await supabase.from('additionals').select().in('id', ids);

  return data!;
}
