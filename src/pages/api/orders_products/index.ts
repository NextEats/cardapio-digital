import { postOrderProductFetch } from "@/src/fetch/ordersProducts/postOrderProduct";
import { NextApiRequest, NextApiResponse } from "next";
import { getOrdersProductsFetch } from "src/fetch/ordersProducts/getOrdersProducts";

export default async function ordersProduct(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const {
        product_id,
        order_id,
        observation,
    } = body

    switch (method) {
        case 'GET':
            try {
                const ordersProducts = await getOrdersProductsFetch()
                res.status(200).send(ordersProducts)
            } catch {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const ordersProducts = await postOrderProductFetch(
                    product_id,
                    order_id,
                    observation,
                )
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
