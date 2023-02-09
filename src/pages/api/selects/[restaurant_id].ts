import { NextApiRequest, NextApiResponse } from "next";
import { getSelectsByRestaurantIdFetch } from "src/fetch/selects/getSelectsByRestaurantId";
import { updateSelectFetch } from "src/fetch/selects/updateSelect";

export default async function selects(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const { id, name } = body

    switch (method) {
        case 'GET':
            try {
                const selects = await getSelectsByRestaurantIdFetch(restaurant_id)
                res.status(200).send(selects)
            } catch {
                res.status(404).end();
            }
            break
        case 'UPDATE':
            try {
                const selectUpdated = await updateSelectFetch({ name, restaurant_id, id })
                res.status(200).send(selectUpdated)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
