import { NextApiRequest, NextApiResponse } from "next";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";

export default async function restaurantBySlug(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const slug = query.slug

  switch (method) {
    case 'GET':
      try {
        const restaurant = await getRestaurantBySlugFetch(slug)
        res.status(200).send(restaurant)
      } catch {
        res.status(404).end();
      }
      break
    default:
      res.status(404).end();
  }
  return []
}
