import { NextApiRequest, NextApiResponse } from "next";
import { getOrderStatusFetch } from "../../../fetch/orderStatus/getOrdersStatus";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";

export async function getOrdersStatus(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    switch (method) {
        case 'GET':
            try {
                const orderStatus = await getOrderStatusFetch()
                console.log(orderStatus)
                res.status(200).send(orderStatus)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
