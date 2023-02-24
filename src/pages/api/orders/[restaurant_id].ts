import { postOrderFetch } from "@/src/fetch/orders/postOrder";
import { NextApiRequest, NextApiResponse } from "next";
import { getOrdersByRestaurantIdFetch } from "../../../fetch/orders/getOrdersByRestaurantId";

export default async function orders(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const { restaurant_id } = query
    const {
        order_type_id,
        cash_box_id,
        client_id,
        order_status_id,
        payment_method_id,
    } = body

    switch (method) {
        case 'GET':
            try {
                const orders = await getOrdersByRestaurantIdFetch(Number(restaurant_id))
                res.status(200).send(orders)
            } catch {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const order = await postOrderFetch(
                    Number(restaurant_id),
                    Number(order_type_id),
                    Number(cash_box_id),
                    Number(client_id),
                    Number(order_status_id),
                    Number(payment_method_id),
                )
                res.status(200).send(order)
            } catch (err) {
                console.log(err)
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
