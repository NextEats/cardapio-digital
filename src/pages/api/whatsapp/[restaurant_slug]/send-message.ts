import { NextApiRequest, NextApiResponse } from "next";
const { Client, LocalAuth } = require("whatsapp-web.js");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { restaurant_slug } = req.query;

  if (typeof restaurant_slug !== "string") {
    res.send("Restaurant slug should be a string");
    return;
  }

  function createClient(name: string) {
    return new Client({
      authStrategy: new LocalAuth({ clientId: name }),
    });
  }

  const client = createClient(restaurant_slug);

  if (client.info) {
    console.log("client_info:", client.info);
  } else {
    console.log("Cliente não encontrado, será criado no banco de dados.");
  }

  client.on("qr", (qr: any) => {
    console.log(qr);
  });

  client.on("ready", () => {
    console.log("Pronto para enviar mensagem");
  });

  client.initialize();

  res.status(200).end();
}
