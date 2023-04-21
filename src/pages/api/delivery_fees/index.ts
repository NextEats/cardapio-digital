import { supabase } from '@/src/server/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function clients(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { restaurantId } = body;

  switch (method) {
    case 'POST':
      try {
        const { data: delivery_fees_data, error } = await supabase
          .from('delivery_fees')
          .select('*')
          .eq('restaurant_id', restaurantId as number);

        if (error) console.error(error);

        res.status(200).json(delivery_fees_data);
      } catch (error) {
        console.error(error);
        res.status(404).send(error);
      }
      break;
  }
  res.status(404).end();
}
