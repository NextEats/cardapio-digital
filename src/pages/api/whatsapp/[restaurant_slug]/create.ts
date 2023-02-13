import { NextApiRequest, NextApiResponse } from "next";

const client = require("./clients");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { restaurant_slug } = req.query;

  client.addClient("test");

  res.send(client);
}
