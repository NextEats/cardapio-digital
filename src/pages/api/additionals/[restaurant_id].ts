import { NextApiRequest, NextApiResponse } from "next";
import { getAdditionalsByRestaurantIdFetch } from "src/fetch/additionals/getAdditionals";

export async function getAdditionalsByRestaurantId(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const { restaurant_id } = query

    switch (method) {
        case 'GET':
            try {
                const additionals = await getAdditionalsByRestaurantIdFetch(Number(restaurant_id))
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
