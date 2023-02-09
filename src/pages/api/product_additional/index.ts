import { NextApiRequest, NextApiResponse } from "next";
import { getProductAdditionalsFetch } from "src/fetch/productAdditionals/getProductAdditionals";

export default async function getProductAdditionals(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    switch (method) {
        case 'GET':
            try {
                const productAdditionals = await getProductAdditionalsFetch()
                res.status(200).send(productAdditionals)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
