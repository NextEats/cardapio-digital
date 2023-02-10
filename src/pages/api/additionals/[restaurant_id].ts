import { NextApiRequest, NextApiResponse } from "next";
import { deleteAdditionalFetch } from "src/fetch/additionals/deleteAdditional";
import { getAdditionalsByRestaurantIdFetch } from "src/fetch/additionals/getAdditionals";
import { postAdditionalFetch } from "src/fetch/additionals/postAdditionals";
import { updateAdditionalsFetch } from "src/fetch/additionals/updateAdditionals";

export default async function getAdditionalsByRestaurantId(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const { name, price, picture_url, id } = body

    switch (method) {
        case 'GET':
            try {
                const additionals = await getAdditionalsByRestaurantIdFetch(restaurant_id)
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const additionals = await postAdditionalFetch({
                    name, price, picture_url, restaurant_id
                })
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        case 'UPDATE':
            try {
                const additional = await updateAdditionalsFetch({
                    name, price, picture_url, id
                })
                res.status(200).send(additional)
            } catch {
                res.status(404).end();
            }
            break
        case 'DELETE':
            try {
                const additionals = await deleteAdditionalFetch(id)
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
