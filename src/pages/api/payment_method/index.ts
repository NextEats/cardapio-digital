import { NextApiRequest, NextApiResponse } from "next";
import { getPaymentMethodsFetch } from "src/fetch/paymentMethod/getPaymentMethods";

export default async function paymentMethods(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req

    switch (method) {
        case 'GET':
            try {
                const paymentMethods = await getPaymentMethodsFetch()
                res.status(200).send(paymentMethods)
            } catch {
                res.status(404).end();
            }
            break
        default:
            res.status(404).end();
    }
    return []
}
