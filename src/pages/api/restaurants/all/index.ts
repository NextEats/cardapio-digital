import { NextApiRequest, NextApiResponse } from "next";
import { getRestaurantsFetch } from "src/fetch/restaurant/getRestuarants";

export default async function restaurants(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    switch (method) {
        case 'GET':
            try {
                const restaurants = await getRestaurantsFetch()
                res.status(200).send(restaurants)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
