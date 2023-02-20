import { getTablesByRestaurantIdFetch } from "@/src/fetch/tables/getTablesByRestaurantId";
import { postTableFetch } from "@/src/fetch/tables/postTable";
import { NextApiRequest, NextApiResponse } from "next";

import { deleteProductFetch } from "src/fetch/products/deleteProduct";
import { postProductFetch } from "src/fetch/products/postProduct";
import { updateProductFetch } from "src/fetch/products/updateProduct";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";

export default async function tables(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const chair_ammount = 3

    switch (method) {
        case 'GET':
            try {
                const orders = await getTablesByRestaurantIdFetch(restaurant_id)
                res.send(orders)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const orders = await postTableFetch({ chair_ammount, restaurant_id })
                res.send(orders)
            } catch (err) {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}