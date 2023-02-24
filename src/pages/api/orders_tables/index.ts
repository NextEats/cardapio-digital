import { postClientFetch } from "@/src/fetch/clients/postClient";
import { getOrdersTablesFetch } from "@/src/fetch/ordersTables/getOrdersTables";
import { postOrderTableFetch } from "@/src/fetch/ordersTables/postOrderTable";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ordersTables(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const {
        order_id,
        table_id,
    } = body

    switch (method) {
        case 'GET':
            try {
                const ordersTables = await getOrdersTablesFetch()
                res.status(200).send(ordersTables)
            } catch {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const ordersTable = await postOrderTableFetch({
                    order_id: Number(order_id),
                    table_id: Number(table_id),
                })
                res.status(200).send(ordersTable)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
