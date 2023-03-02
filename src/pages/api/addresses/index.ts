import { postAddressFetch } from '@/src/fetch/addresses/postAddress';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function addresses(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query, body } = req;
    const restaurant_id = Number(query.restaurant_id);
    const { cep, number, complement, google_maps_link, reference_point } = body;

    switch (method) {
        case 'GET':
            try {
                // const additionals = await
                res.status(200).send('additionals');
            } catch {
                res.status(404).end();
            }
            break;
        case 'POST':
            try {
                const addresses = await postAddressFetch(
                    cep,
                    number,
                    complement,
                    google_maps_link,
                    reference_point
                );
                res.status(200).send(addresses);
            } catch {
                res.status(404).end();
            }
            break;
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
