import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@/src/fetch/whatsapp/createClient";

const twentySecondsInMilliseconds = 20000;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { restaurant_slug } = req.query;

    if (typeof restaurant_slug !== "string") {
      res.status(400).send("Restaurant slug should be a string");
      return;
    }

    const client = createClient(restaurant_slug);

    if (client.info) {
      res.status(200).send("Client is authenticated");
    } else {
      client.on("qr", (qr: any) => {
        res.status(200).send(qr);
      });

      client.on("authenticated", () => {
        console.log("Client authenticated successfully");
      });

      client.initialize();

      setTimeout(() => {
        res.status(500).send("Timeout occurred while waiting for QR code");
      }, twentySecondsInMilliseconds);
    }
  } catch (error) {
    res.status(500).send(`An error occurred: ${error}`);
  }
}
