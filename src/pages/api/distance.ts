// pages/api/distance.ts

import { distanceFeeApi } from '@/src/server/api';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { start, end } = req.body;

    try {
      const { data } = await distanceFeeApi.post('/calcular-distancia', {
        start,
        end,
      });

      res.status(200).json({ distanceInKm: data.distance / 1000 });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error calculating distance' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
