import { NextApiRequest, NextApiResponse } from "next";
import { getOrdersByRestaurantIdFetch } from "../../../fetch/orders/getOrdersByRestaurantId";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";

export async function gerOrdersByRestaurantId(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const slug = query.slug

    switch (method) {
        case 'GET':
            try {
                const restaurants = await getRestaurantBySlugFetch(slug)
                const orders = await getOrdersByRestaurantIdFetch(restaurants[0].id)
                res.status(200).send(orders)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
