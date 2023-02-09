import { NextApiRequest, NextApiResponse } from "next";
import { getOrdersByRestaurantIdFetch } from "../../../fetch/orders/getOrdersByRestaurantId";

export default async function orders(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const { restaurant_id } = query

    switch (method) {
        case 'GET':
            try {
                const orders = await getOrdersByRestaurantIdFetch(Number(restaurant_id))
                res.status(200).send(orders)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
