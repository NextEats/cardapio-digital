import cepPromise from 'cep-promise';
import { NextApiRequest, NextApiResponse } from 'next';

async function getAddressFromCep(cep: string) {
  try {
    const { street, neighborhood, city, state } = await cepPromise(cep);
    return `${street}, ${neighborhood}, ${city} - ${state}, ${cep}`;
  } catch (error) {
    console.error('Error fetching address from CEP:', error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { cep } = req.query;

  if (!cep) {
    res.status(400).json({ error: 'Missing CEP parameter' });
    return;
  }

  const address = await getAddressFromCep(cep as string);

  if (address) {
    res.status(200).json({ address });
  } else {
    res.status(500).json({ error: 'Failed to fetch address' });
  }
}
