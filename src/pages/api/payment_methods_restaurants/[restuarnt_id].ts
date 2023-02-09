import { NextApiRequest, NextApiResponse } from "next";
import { getPaymentMethodsFetch } from "src/fetch/paymentMethod/getPaymentMethods";
import { getPaymentMethodsRestaurantsByRestaurantIdFetch } from "src/fetch/paymentMethodsRestaurants/getPaymentMethodsRestaurantsByRestaurantId";

export default async function paymentMethodsRestaurants(req: NextApiRequest, res: NextApiResponse) {
    const { method, query } = req
    const restaurant_id = Number(query.restaurant_id)

    switch (method) {
        case 'GET':
            try {
                const paymentMethods = await getPaymentMethodsRestaurantsByRestaurantIdFetch(restaurant_id)
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
