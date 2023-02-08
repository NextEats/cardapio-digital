import { NextApiRequest, NextApiResponse } from "next";
import { getRestaurantBySlugFetch } from "../../../fetch/restaurant/getRestaurantBySlug";

export async function getRestaurantBySlug(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req
  const slug = query.slug

  switch (method) {
    case 'GET':
      try {
        const restaurants = await getRestaurantBySlugFetch(slug)
        res.status(200).send(restaurants)
      } catch {
        res.status(404).end();
      }
      break
    default:
      res.status(404).end();
  }
  return []
}
