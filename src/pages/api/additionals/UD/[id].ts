import { NextApiRequest, NextApiResponse } from "next";
import { deleteAdditionalFetch } from "src/fetch/additionals/deleteAdditional";
import { updateAdditionalsFetch } from "src/fetch/additionals/updateAdditionals";

export default async function additionalsById(req: NextApiRequest, res: NextApiResponse) {
    const { method, query, body } = req
    const id = Number(query.id)
    const { name, price, picture_url } = body

    switch (method) {
        case 'GET':
            try {
                const additionals = await updateAdditionalsFetch({
                    name, price, picture_url, id
                })
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        case 'DELETE':
            try {
                const additionals = await deleteAdditionalFetch(id)
                res.status(200).send(additionals)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    res.status(404).end();
}
