import { AdminContext } from '@/src/contexts/adminContext';
import { useWhatsAppStatus } from '@/src/hooks/useWhatsAppStatus';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';
import CurrentStatus from './components/CurrentStatus';

export type tVenomStatus =
  | undefined
  | 'isLogged'
  | 'notLogged'
  | 'browserClose'
  | 'qrReadSuccess'
  | 'qrReadFail'
  | 'autocloseCalled'
  | 'desconnectedMobile'
  | 'deleteToken'
  | 'chatsAvailable'
  | 'deviceNotConnected'
  | 'serverWssNotConnected'
  | 'noOpenBrowser'
  | 'initBrowser'
  | 'openBrowser'
  | 'connectBrowserWs'
  | 'initWhatsapp'
  | 'erroPageWhatsapp'
  | 'successPageWhatsapp'
  | 'waitForLogin'
  | 'waitChat'
  | 'successChat';

const Whatsapp: React.FC = () => {
  const { restaurant } = useContext(AdminContext);

  const [whatsappStatus, setWhatsappStatus] = useWhatsAppStatus(
    restaurant?.slug
  );

  const [socket, setSocket] = useState<Socket | null>(null);
  const [qrCode, setQrCode] = useState<string>('');

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    // if (!socket) {
    //   const newSocket = io(whatsappRestApiServerUrl!);
    //   setSocket(newSocket);

    //   newSocket.on(
    //     'qrCode',
    //     ({ id, qrCode }: { id: string; qrCode: string }) => {
    //       if (id === restaurant.slug) {
    //         setQrCode(qrCode);
    //       }
    //     }
    //   );

    //   newSocket.on(
    //     'status',
    //     ({ id, status }: { id: string; status: string }) => {
    //       if (id === restaurant.slug) {
    //         setWhatsappStatus(status as tVenomStatus);
    //       }
    //     }
    //   );
    // }

    const startSocketReq = async () => {
      try {
        const options = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            slug: restaurant.slug,
          }),
        };

        const response = await fetch(
          'https://www.nexteats.com.br/api/whatsapp/create',
          options
        );

        console.log(
          'https://www.nexteats.com.br/api/whatsapp/create',
          response
        );
      } catch (err) {
        console.error(err);
      }
    };

    startSocketReq();
  }, [socket, restaurant, setWhatsappStatus]);

  return (
    <div className="p-4">
      <h4 className="text-3xl p-4">Conexão WhatsApp</h4>
      <div className="p-4 bg-white rounded-md">
        {qrCode ? (
          <Image
            id="qrCode"
            src={qrCode}
            alt="QR Code"
            width={300}
            height={300}
          />
        ) : (
          <CurrentStatus status={whatsappStatus} />
        )}
      </div>
    </div>
  );
};

export default Whatsapp;
