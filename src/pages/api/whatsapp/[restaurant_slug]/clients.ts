import { Whatsapp } from "venom-bot";
const Sender = require("@/src/fetch/whatsapp/Sender").Sender;

var clientsMap = new Map<string, any>();

function addClient(id: string) {
  const sender = new Sender(id);

  clientsMap.set(id, sender);
}

module.exports = {
  clientsMap,
  addClient,
};
