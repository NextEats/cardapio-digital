import { NextApiRequest, NextApiResponse } from "next";
import { getProductsCategoriesByRestaurantIdFetch } from "src/fetch/productsCategories/getProductsCategoriesByRestaurantId";

export async function getProductCategories(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const { retaurant_id } = query

    switch (method) {
        case 'GET':
            try {
                const productCategories = await getProductsCategoriesByRestaurantIdFetch(Number(retaurant_id))
                res.status(200).send(productCategories)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
