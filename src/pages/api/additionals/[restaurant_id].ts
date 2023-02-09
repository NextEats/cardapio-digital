import { NextApiRequest, NextApiResponse } from "next";
import { getAdditionalsByRestaurantIdFetch } from "src/fetch/additionals/getAdditionals";
import { postAdditionalFetch } from "src/fetch/additionals/postAdditionals";

export default async function getAdditionalsByRestaurantId(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const { restaurant_id } = query
    const { name, price, picture_url } = body

    switch (method) {
        case 'GET':
            try {
                const additionals = await getAdditionalsByRestaurantIdFetch(Number(restaurant_id))
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const additionals = await postAdditionalFetch({
                    name, price, picture_url, restaurant_id: Number(restaurant_id)
                })
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
