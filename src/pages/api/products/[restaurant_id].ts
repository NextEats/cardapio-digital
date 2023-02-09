import { NextApiRequest, NextApiResponse } from "next";

import { deleteProductFetch } from "src/fetch/products/deleteProduct";
import { postProductFetch } from "src/fetch/products/postProduct";
import { updateProductFetch } from "src/fetch/products/updateProduct";
import { getProductsByRestaurantIdFetch } from "../../../fetch/products/getProductsByRestaurantId";

export default async function products(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const { name, picture_url, price, description, category_id, id } = body

    switch (method) {
        case 'GET':
            try {
                const orders = await getProductsByRestaurantIdFetch(restaurant_id)
                res.send(orders)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const orders = await postProductFetch({
                    name, picture_url, price, description, restaurant_id, category_id
                })
                res.send(orders)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'UPDATE':
            try {
                const order = await updateProductFetch({
                    name, picture_url, price, description, restaurant_id, category_id
                })
                res.send(order)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'DELETE':
            try {
                const status = await deleteProductFetch(id)
                res.send(status)
            } catch (err) {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
