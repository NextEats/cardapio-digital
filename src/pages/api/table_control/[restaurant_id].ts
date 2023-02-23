import { deleteTableFetch } from "@/src/fetch/tables/deleteTable";
import { getTablesByRestaurantIdFetch } from "@/src/fetch/tables/getTablesByRestaurantId";
import { postTableFetch } from "@/src/fetch/tables/postTable";
import { updateTableFetch } from "@/src/fetch/tables/updateOrderTable";
import { NextApiRequest, NextApiResponse } from "next";

export default async function tables(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const restaurant_id = Number(query.restaurant_id)
    const { chair_ammount, name, is_active, is_occupied, table_id } = body
    console.log("dat")

    switch (method) {
        case 'GET':
            try {
                const tables = await getTablesByRestaurantIdFetch(restaurant_id)
                res.send(tables)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const tables = await postTableFetch({ chair_ammount, restaurant_id, name })
                res.send(tables)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'PUT':
            try {
                console.log(is_active, is_occupied, table_id)
                const tables = await updateTableFetch({ is_active, is_occupied, table_id })
                res.send(tables)
            } catch (err) {
                res.status(404).end();
            }
            break
        case 'DELETE':
            try {
                console.log(is_active, is_occupied, table_id)
                const tables = await deleteTableFetch({ table_id })
                res.send(tables)
            } catch (err) {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}