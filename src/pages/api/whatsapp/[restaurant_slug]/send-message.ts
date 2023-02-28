import { NextApiRequest, NextApiResponse } from "next";
import { Sender } from "@/src/fetch/whatsapp/Sender";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { restaurant_slug } = req.query;

  if (typeof restaurant_slug === "string") {
    const sender = new Sender(restaurant_slug);

    res.send({ sender });
  }
}
