import { whatsappRestApi } from '@/src/server/api';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function checkStatus(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, query, body } = req;
  const slug = body.slug;

  switch (method) {
    case 'POST':
      try {
        const { data } = await whatsappRestApi.post('/check-status', {
          id: slug,
        });

        res.status(200).json(data);
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json({ error: 'An error occurred while checking status' });
      }
      break;
  }
  res.status(404).end();
}
