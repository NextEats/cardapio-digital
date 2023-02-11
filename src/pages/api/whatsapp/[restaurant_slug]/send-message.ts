import { createClient } from "@/src/fetch/whatsapp/createClient";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurant_slug } = req.query;

  if (typeof restaurant_slug !== "string") {
    res.send("Restaurant slug should be a string");
    return;
  }

  const client = createClient(restaurant_slug);

  if (client.info) {
    console.log("client_info:", client.info);
  } else {
    console.log("Cliente não encontrado, será criado no banco de dados.");
  }

  client.on("ready", async () => {
    console.log("Pronto para enviar mensagem");

    const numberId = await client.getNumberId("5511941996397");

    if (numberId) {
      client.sendMessage(numberId._serialized, "Pedido finalizado");
    }
  });

  client.initialize();

  res.status(200).end();
}
