import { NextApiRequest, NextApiResponse } from "next";
import { getProductOptionsFetch } from "src/fetch/productOptions/getProductOptions";

export default async function productOptions(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    switch (method) {
        case 'GET':
            try {
                const productOptions = await getProductOptionsFetch()
                res.status(200).send(productOptions)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
