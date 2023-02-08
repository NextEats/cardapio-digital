import { NextApiRequest, NextApiResponse } from "next";
import { getOrderStatusFetch } from "../../../fetch/orderStatus/getOrdersStatus";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";

export async function getOrdersStatus(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const restaurant_id = query.restaurant_id

    switch (method) {
        case 'GET':
            try {
                // const restaurants = await getRestaurantBySlugFetch(slug)
                const orders = await getOrderStatusFetch()
                console.log(orders)
                // res.status(200).json(orders)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
