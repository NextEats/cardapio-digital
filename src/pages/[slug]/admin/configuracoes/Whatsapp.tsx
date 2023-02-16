import { useState, useEffect, useContext } from "react";
import { AdminContext } from "@/src/contexts/adminContext";

import io from "socket.io-client";
import QRCode from "react-qr-code";
import { serverURL, supabase } from "@/src/server/api";

export default function Whatsapp() {
  const [successMessage, setSuccessMessage] = useState("");
  const [qrCode, setQrCode] = useState("");

  const { restaurant } = useContext(AdminContext);

  useEffect(() => {
    if (restaurant?.whatsapp_qrcode) {
      setQrCode(restaurant?.whatsapp_qrcode);
    }

    async function fetchSocketIo() {
      await fetch(`${serverURL}/api/whatsapp/${restaurant?.slug}/socket-qrcode`);

      var socket = io({ transports: ["websocket"], forceNew: true });

      socket.on("success", (newMessage: any) => {
        setSuccessMessage(newMessage);
      });

      socket.on("qr", async (qr: any) => {
        await supabase
          .from("restaurants")
          .update({ whatsapp_qrcode: qr })
          .eq("id", restaurant?.id);

        setQrCode(qr);
      });
    }
    fetchSocketIo();
  }, [restaurant]);

  function QRCodeImageOrLoadingText() {
    if (!qrCode || qrCode === "") {
      return <span>QR Code carregando...</span>;
    } else {
      return (
        <>
          <QRCode value={qrCode} />
        </>
      );
    }
  }

  return (
    <>
      <div>
        <QRCodeImageOrLoadingText />
      </div>
      {successMessage && <div>QR code autenticado com sucesso.</div>}
    </>
  );
}
