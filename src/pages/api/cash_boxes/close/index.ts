import { NextApiRequest, NextApiResponse } from "next";
import { postCloseCashBoxFetch } from "src/fetch/cashBoxes/postCloseCashBox";

export default async function cashBoxes(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req
    const { restaurant_id } = body

    switch (method) {
        case 'POST':
            try {
                const closeCashBox = await postCloseCashBoxFetch(Number(restaurant_id))
                res.status(200).send(closeCashBox)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}