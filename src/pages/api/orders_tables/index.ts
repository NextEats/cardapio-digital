import { postClientFetch } from "@/src/fetch/clients/postClient";
import { getOrdersTablesFetch } from "@/src/fetch/ordersTables/getOrdersTables";
import { NextApiRequest, NextApiResponse } from "next";

export default async function ordersTables(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const {
        address_id,
        name,
        contact_id,
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
                // const ordersTable = await postClientFetch(
                //     address_id,
                //     name,
                //     contact_id,
                // )
                res.status(200).send("ordersTable")
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
