import { NextApiRequest, NextApiResponse } from "next";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";

export default async function ordersProduct(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req

    switch (method) {
        case 'GET':
            try {
                const ordersProducts = await getOrdersProductsFetch()
                res.status(200).send(ordersProducts)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
