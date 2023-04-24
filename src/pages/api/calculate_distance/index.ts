import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function addresses(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method, body } = req;

  const { startAddress, destinationAddress } = body;

  if (!startAddress || !destinationAddress) {
    res.status(404).end();
    return;
  }

  switch (method) {
    case 'POST':
      try {
        const response = await axios.post(
          'https://calculate-distance-api.herokuapp.com/calculate-distance',
          {
            startAddress,
            destinationAddress,
          }
        );

        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({
          message: 'An error occurred while processing the request',
          error,
        });
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).json({ message: `Method ${method} not allowed` });
      return;
  }
}
