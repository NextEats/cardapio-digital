import { NextApiRequest, NextApiResponse } from "next";

import { getRestauratTypeFetch } from "src/fetch/restaurantTypes/getRestauratType";

export default async function restaurantTypes(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const id = Number(query.id)

    switch (method) {
        case 'GET':
            try {
                const restauratType = await getRestauratTypeFetch(id)
                res.send(restauratType)
            } catch (err) {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
