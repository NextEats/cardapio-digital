import { NextApiRequest, NextApiResponse } from "next";
import { getSelectsByRestaurantIdFetch } from "src/fetch/selects/getSelectsByRestaurantId";

export async function getSelectsByRestaurantId(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const { restaurant_id } = query

    switch (method) {
        case 'GET':
            try {
                const selects = await getSelectsByRestaurantIdFetch(Number(restaurant_id))
                res.status(200).send(selects)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
