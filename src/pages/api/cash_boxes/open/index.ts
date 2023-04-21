import { NextApiRequest, NextApiResponse } from 'next';
import { postOpenCashBoxFetch } from 'src/fetch/cashBoxes/postOpenCashBox';

export default async function cashBoxes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;
  const { restaurant_id, initial_value } = body;

  switch (method) {
    case 'POST':
      try {
        const openCashBox = await postOpenCashBoxFetch({
          restaurant_id: Number(restaurant_id),
          initial_value: Number(initial_value),
        });
        res.status(200).send(openCashBox);
      } catch {
        res.status(404).end();
      }
      break;
    default:
      res.status(404).end();
  }
  return [];
}
