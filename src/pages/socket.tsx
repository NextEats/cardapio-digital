import { useEffect, useState } from "react";
import io from "socket.io-client";
let socket;

export default function Socket() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function socketInitializer() {
      await fetch("/api/socket");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("message", (msg) => {
        setMessage(msg);
      });
    }
    socketInitializer();
  }, []);

  return <>{message}</>;
}
