import { Server } from "socket.io";
const { Client, RemoteAuth } = require("whatsapp-web.js");

const { MongoStore } = require("wwebjs-mongo");
const mongoose = require("mongoose");

export default async function handler(req, res) {
  if (res.socket.server.io) {
    res.socket.server.io.close();
    console.log("Socket is disconnected");
  } else {
    console.log("Socket is initializing");

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", () => {
      io.emit("message", "Socket.io conectado com sucesso!!!");

      mongoose
        .connect(
          "mongodb+srv://nexteats:NextEats%4001.03.2023@cluster0.tymgvan.mongodb.net/?retryWrites=true&w=majority"
        )
        .then(() => {
          io.emit("message", "MongoDB conectado");

          const store = new MongoStore({ mongoose: mongoose });
          const client = new Client({
            authStrategy: new RemoteAuth({
              store: store,
              backupSyncIntervalMs: 300000,
              clientId: "",
            }),
          });

          client.getState().then((res) => {
            console.log(res);
          });

          client.on("message", (whatsAppMessage) => {
            io.emit("message", whatsAppMessage.author);
          });

          client.on("ready", () => {
            io.emit("message", "ready");
          });

          client.initialize();
        });
    });
  }
  res.end();
}
