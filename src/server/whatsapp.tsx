import QRCode from "react-qr-code";

const { Client } = require("whatsapp-web.js");
const client = new Client();

export function GetQRCodeImage() {
  client.on("qr", async (qr: string) => {
    return <QRCode value={qr} />;
  });
  return <div>void</div>;
}

client.on("ready", () => {
  console.log("Client is ready!");
});
