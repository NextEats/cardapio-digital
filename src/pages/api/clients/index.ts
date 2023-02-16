import { postAddressFetch } from "@/src/fetch/addresses/postAddress";
import { postClientFetch } from "@/src/fetch/clients/postClient";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteAdditionalFetch } from "src/fetch/additionals/deleteAdditional";
import { getAdditionalsByRestaurantIdFetch } from "src/fetch/additionals/getAdditionals";
import { postAdditionalFetch } from "src/fetch/additionals/postAdditionals";
import { updateAdditionalsFetch } from "src/fetch/additionals/updateAdditionals";

export default async function addresses(req: NextApiRequest, res: NextApiResponse) {
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
                // const additionals = await 
                res.status(200).send("additionals")
            } catch {
                res.status(404).end();
            }
            break
        case 'POST':
            try {
                const addresses = await postClientFetch(
                    address_id,
                    name,
                    contact_id,
                )
                res.status(200).send(addresses)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
