import { Client, LocalAuth } from "whatsapp-web.js";

export function createClient(name: string) {
  return new Client({
    authStrategy: new LocalAuth({ clientId: name }),
  });
}
