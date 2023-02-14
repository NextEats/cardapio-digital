import { NextApiRequest, NextApiResponse } from "next";
import { getCashBoxesByRestaurantIdFetch } from "../../../fetch/cashBoxes/getCashBoxesByRestaurantId";

export default async function cashBoxes(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const { restaurant_id } = query

    switch (method) {
        case 'GET':
            try {
                const cashBoxes = await getCashBoxesByRestaurantIdFetch(Number(restaurant_id))
                res.status(200).send(cashBoxes)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
