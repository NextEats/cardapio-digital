import { NextApiRequest, NextApiResponse } from 'next';
import { getProductsCategoriesByRestaurantIdFetch } from 'src/fetch/productsCategories/getProductsCategoriesByRestaurantId';

export default async function productCategories(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { method, query } = req;
    const { restaurant_id } = query;

    switch (method) {
        case 'GET':
            try {
                const productCategories =
                    await getProductsCategoriesByRestaurantIdFetch(
                        Number(restaurant_id)
                    );
                res.status(200).send(productCategories);
            } catch {
                res.status(404).end();
            }
            break;
        default:
            res.status(404).end();
    }
    return [];
}
