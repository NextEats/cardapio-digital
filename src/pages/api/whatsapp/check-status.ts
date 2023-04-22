import { whatsappRestApi } from '@/src/server/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function tables(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const slug = query.slug;

  switch (method) {
    case 'POST':
      try {
        const { data } = await whatsappRestApi.post('/check-status', {
          id: slug,
        });

        res.status(200).json(data);
      } catch (error) {
        console.error(error);
      }
      break;
    default:
      res.status(404).end();
  }
  res.status(404).end();
}
