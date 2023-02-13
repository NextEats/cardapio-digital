import { Whatsapp } from "venom-bot";
import Sender from "./Sender";

class SenderManager {
  public clients = new Map<string, any>();

  addNewClient(client: any) {
    this.clients.set("name", client);
  }
}

const MySenderManager = new SenderManager();

export default MySenderManager;
