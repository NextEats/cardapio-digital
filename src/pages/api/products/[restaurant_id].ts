import { NextApiRequest, NextApiResponse } from "next";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";

export async function getProductsByRestaurantId(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const restaurant_id = query.restaurant_id

    switch (method) {
        case 'GET':
            try {
                // const restaurants = await getRestaurantBySlugFetch(slug)
                const orders = await getProductsByRestaurantIdFetch(Number(restaurant_id))
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
