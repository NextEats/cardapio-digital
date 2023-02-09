import { NextApiRequest, NextApiResponse } from "next";
import { getProductSelectsFetch } from "src/fetch/productSelects/getProductSelects";

export default async function productSelects(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    switch (method) {
        case 'GET':
            try {
                const productSelects = await getProductSelectsFetch()
                res.status(200).send(productSelects)
            } catch (error) {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
